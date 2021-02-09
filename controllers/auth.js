const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateTOKEN } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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


const googleSignin = async( req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken)

        const userDB = await User.findOne({ email })
        let user;

        console.log(`user db ${userDB}`);

        if ( !userDB ) {
            user = new User({
                name,
                email,
                password: '###',
                img: picture,
                google: true,
            })
        } else {
            user = userDB;
            user.google = true;
            
            user.picture = picture;
        }

        console.log(`PRE SAVE user db ${userDB}`);

        await user.save();

        console.log(`SAVE user db`);

        // Generar TOKEN
        const token = await generateTOKEN( user.id );

        console.log(`GENERA TOKEN `);


        res.status(200).json({
            ok: true,
            token
        });

        console.log(`token ${token}`);

        
    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: 'Error',
            error
        });
        
    }


    

}

module.exports = {
    login,
    googleSignin
}