const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    google:{
        type: Boolean,
        default: false
    }
});


UserSchema.method('toJSON', function () {
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = mongoose.model( 'User', UserSchema );