const mongoose = require('mongoose');
require('dotenv').config();

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

const dbConnection = async() => {

    try {
        await mongoose.connect('mongodb://' + process.env.MONGO_URL + ':' + process.env.MONGO_PORT + '/' + process.env.MONGO_DB, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });

        console.log('Conexion con bbdd establecida')
    } catch (err){
        console.log("Error conectando con bbdd " + err);
        throw new Error('Error conectando con bbdd ' + err);
    }


}

module.exports = {
    dbConnection
}