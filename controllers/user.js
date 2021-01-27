const {response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');


const getUsers = async(req, res) => {

    const users = await User.find();

    res.json({
        ok: true,
        users,
        uid: req.uid
    });
};




const newUser =  async(req, res = response) => {

    try {
        const findEmail = await User.findOne( { email: req.body.email });

        if( findEmail ) {
            res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email ' 
            });
        } 

        const user = new User(req.body);

        // encript password
        const salt = bcrypt.genSaltSync();
        user.password =  bcrypt.hashSync ( user.password, salt );

        // incluimos await para que espere a que termine la petición
        await user.save();

        // Generar TOKEN
        const token = await generateTOKEN( user._id );

        // respuesta
        res.json({
            ok: true,
            user,
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error ' + err
        });
    }

};


const updateUser = async(req, res = response) =>{

    const uid = req.params.id;

    try{
        const findUser = await User.findById( uid );

        if(!findUser ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario en la bbdd'
            });
        }

        const fields = req.body;
        // delete fields.google;
        const userUpdate = await User.findByIdAndUpdate( uid, fields, { new: true } );

        res.json({
            ok: true,
            user: userUpdate
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}






module.exports = {
    getUsers,
    newUser,
    updateUser
}
