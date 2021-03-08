const {response} = require('express');
const webshot = require('webshot-node');
const fs      = require('fs');
const jwt = require('jsonwebtoken');
const Link = require('../models/link');

const app = require("node-server-screenshot");
const screenshot = require('screenshot-stream');

const { Storage } = require('@google-cloud/storage');
const puppeteer = require('puppeteer');

const GOOGLE_CLOUD_PROJECT_ID = "screenshotapi";
const BUCKET_NAME = "screenshot-api-net";


getAllLinks = async(req, res) => {

    const token = req.header('x-token');
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const links = await Link.find({'user': uid}).populate('user').populate({
        path: 'sections',
        model: 'Section'
    });

    res.json({
        ok: true,
        links
    });
    
};



uploadToGoogleCloud = async(buffer, filename) => {
    const storage = new Storage({
        projectId: GOOGLE_CLOUD_PROJECT_ID,
    });

    const bucket = storage.bucket(BUCKET_NAME);

    const file = bucket.file(filename);
    await uploadBuffer(file, buffer, filename);
  
    await file.makePublic();

  	return `https://${BUCKET_NAME}.storage.googleapis.com/${filename}`;
}

takeScreenshot = async (params) => {
	const browser = await puppeteer.launch({
		args: ['--no-sandbox']
	});
	const page = await browser.newPage();
	await page.goto(params.url, {waitUntil: 'networkidle2'});

	const buffer = await page.screenshot();

	await page.close();
	await browser.close();
  
  	return buffer;
}

uploadBuffer = async (file, buffer, filename) => {
    return new Promise((resolve) => {
        file.save(buffer, { destination: filename }, () => {
            resolve();
        });
    })
}

newLink =  async(req, res) => {

    try {
        const body = req.body;

        // webshot('google.com', 'google.png', function(err) {
        //     if(!err) {
        //         console.log('capture taken');
        //     } else {
        //         console.log(err);
        //     }
        // });


 
        

        if( body && body.uid ){
            let link = Link.findById(body.uid);
            if ( !link ) {
                return res.status(404).json({
                    ok: true,
                    msg: 'Not foud link',
                });
            }


             /* var browser_width = 1024;
            var browser_height = 768;
            var output_width = 512;
            var output_height = 384;

            var multiplier = browser_width / output_width;

            var options = {
                screenSize: {
                    width: (browser_width / multiplier ),
                    height: (browser_height / multiplier )
                },
                shotSize: {
                    width: output_width,
                    height: output_height
                },
                zoomFactor: multiplier,
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36',
                renderDelay: '10000'
            }

            var renderStream = webshot(body.url, options);
            var file = fs.createWriteStream('google.png', {encoding: 'binary'});
            let image;
            
          renderStream.on('data', async function(data) {
                file.write(data.toString('binary'), 'binary');
                // image = data.toString('base64');

                // console.log(image);
            
                link = await Link.updateOne({ _id: body.uid }, { $set: { title: body.title, url: body.url, sections: body.sections, image: file } }, {new: true})
        
                res.json({
                    ok: true,
                    link
                });

            });*/


        // Algunas constantes explicativas
        /*const NOMBRE_IMAGEN_SALIDA = "salida.png";

        // Opciones para tomar captura
        const OPCIONES = {
            customHeaders: {
                'Accept-Language': 'es_LA', // Lenguaje de la página
            },
            shotSize: {
                width: 'all',
                height: 760
            },
            screenSize: {
                width: 1024, // Anchura de pantalla
                height: 760, // Altura de pantalla
            },
            // Indicar que "somos" Chrome en Windows
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36'
        };

        // Función que se llama cuando la captura se ha tomado
        const cuandoSeTomeCaptura = err => {
            // Puede que haya un error
            if (err) {
                console.log("Lo siento, ocurrió un error: ", err);
            } else {
                console.log(`La página ${body.url} ha sido guardada en ${NOMBRE_IMAGEN_SALIDA}`);
            }
        };

        // Ahora sí, tomar captura o screenshot
        webshot(body.url, NOMBRE_IMAGEN_SALIDA, OPCIONES, cuandoSeTomeCaptura);*/

        /*const options = {
            clip: {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }
        }

        app.fromURL(body.url, "test.png", options, function(){
            //an image of google.com has been saved at ./test.png
        });*/


        /*
        const stream = screenshot('http://google.com', '1024x768', {crop: true});
        stream.pipe(fs.createWriteStream('google.com-1024x768.png'));

        */     
       
        res.setHeader("content-type", "application/json");
  
        const buffer = await takeScreenshot(req.body);
        //  console.log(buffer);

        //  fs.writeFile("prueba.png", buffer,  "binary", function(err) {
        //     if(err) {
        //         console.log(err);
        //     } else {
        //         console.log("The file was saved!");
        //     }
        // });
         
        // //  let screenshotUrl = await uploadToGoogleCloud(buffer, "screenshot.png");
        // //  console.log(screenshotUrl);

        link = await Link.updateOne({ _id: body.uid }, { $set: { title: body.title, url: body.url, sections: body.sections, image: buffer } }, {new: true})
         
         res.json({
            ok: true,
            link
         });
         
            

        } else {
            const token = req.header('x-token');
            const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);

            const buffer = await takeScreenshot(req.body);

            req.body.user = uid;
            req.body.image = buffer;

            const link = new Link(req.body);
            await link.save();
            const links = await Link.find({'user': uid});

            res.json({
                ok: true,
                links
            });
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error ' + err
        });
    }

};

module.exports = {
    getAllLinks,
    newLink
    
}