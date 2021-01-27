const { validationResult } = require('express-validator');
const { response } = require('express');

const validateFields = (req, res = response, next) => {

    const validation = validationResult (req);
    if(!validation.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: validation.mapped()
        });
    }

    next();
};


module.exports = {
    validateFields,
}



