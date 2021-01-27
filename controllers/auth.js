const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateTOKEN } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email })

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o password incorrectos' 
            });
        }
        
        const validPassword = bcrypt.compareSync( password, userDB.password );

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o password incorrectos' 
            });
        }

        // Generar TOKEN
        const token = await generateTOKEN( userDB._id );


        res.status(200).json({
            ok: true,
            msg: 'login',
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error ' + error
        });
    }

};


module.exports = {
    login
}