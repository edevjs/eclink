const jwt = require('jsonwebtoken');


const generateTOKEN = ( uid ) => {

    return new Promise ( (resolve, reject) => {

        const payload = {
            uid
        };
    
        jwt.sign( payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '12h'
        }, ( err, token ) =>{
            if (err) {
               console.log(err);
               reject('No se pudo generear JWT')
            } else {
                resolve(token);
            }
    
    
        });


    });

}


module.exports = {
    generateTOKEN,
}