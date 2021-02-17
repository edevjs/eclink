const {response} = require('express');
const jwt = require('jsonwebtoken');
const Link = require('../models/link');


getAllLinks = async(req, res) => {

    const token = req.header('x-token');
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const links = await Link.find({'user': uid});

    res.json({
        ok: true,
        links
    });
    
};

newLink =  async(req, res) => {

    try {
        console.log('newLink')
        const token = req.header('x-token');
        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);

        console.log(uid);

        req.body.user = uid;

        const link = new Link(req.body);
        await link.save();
        // respuesta
        const links = await Link.find({'user': uid});

        res.json({
            ok: true,
            links
        });
    
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