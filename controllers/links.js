const jwt = require('jsonwebtoken');
const Link = require('../models/link');

const puppeteer = require('puppeteer');


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


newLink =  async(req, res) => {

    try {
        const body = req.body;

        if( body && body.uid ){
            let link = Link.findById(body.uid);
            if ( !link ) {
                return res.status(404).json({
                    ok: true,
                    msg: 'Not foud link',
                });
            }
  
            const buffer = await takeScreenshot(req.body);

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