
const jwt = require('jsonwebtoken');
const validateJWT  = (req, res, next) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            errors: 'No está autorizado para realizar esta operación. No existe token'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(uid);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            errors: 'Token incorrecto ' + error
        });
    }

}

module.exports = {
    validateJWT,
}