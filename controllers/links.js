const {response} = require('express');
const Link = require('../models/link');


getAllLinks = async(req, res) => {

    const links = await Link.find();

    res.json({
        ok: true,
        links
    });
    
};

const newLink =  async(req, res = response) => {

    try {
        
        const link = new Link(req.body);

        await link.save();

        // respuesta
        res.json({
            ok: true,
            link
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