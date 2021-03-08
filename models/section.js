const mongoose = require('mongoose');

const SectionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String
    },
    icon:{
        type: String
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
});


// SectionSchema.method('toJSON', function () {
//     const { __v, _id, ...object} = this.toObject();
//     object.uid = _id;
//     return object;
// })

module.exports = mongoose.model( 'Section', SectionSchema );