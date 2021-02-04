const mongoose = require('mongoose');

const LinkSchema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    sections:{
        type: [String],
    },
    icon:{
        type: String,
    }
    ,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
});


LinkSchema.method('toJSON', function () {
    const { __v, _id, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = mongoose.model( 'Link', LinkSchema );