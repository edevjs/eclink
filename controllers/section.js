const {response} = require('express');
const jwt = require('jsonwebtoken');
const Section = require('../models/section');


getAllSections = async(req, res) => {

    const token = req.header('x-token');
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const sections = await Section.find({'createdBy': uid});

    res.json({
        ok: true,
        sections
    });
    
};



newSection =  async(req, res) => {

    try {
        const body = req.body;
        if( body && body.uid ){
            let section = Section.findById(body.uid);
            if ( !section ) {
                return res.status(404).json({
                    ok: true,
                    msg: 'Not foud section',
                });
            }
            
            section = await Section.updateOne({ _id: body.uid }, { $set: { name: body.name, color: body.color } }, {new: true})
    
            res.json({
                ok: true,
                section
            });

        } else {
            const token = req.header('x-token');
            const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
            body.createdBy = uid;
    
            const section = new Section(body);
            await section.save();
    
            res.json({
                ok: true,
                section
            });
        }
    
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error ' + err
        });
    }

};

module.exports = {
    getAllSections,
    newSection
    
}