const mongoose = require("mongoose");


const dbConnect = () => {
    const DB_URI = process.env.DB_URI;
    mongoose.set("strictQuery", false);
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        if (!err) {
            console.log('****** CONEXIÓN  CORRECTA ******');
        }
        else {
            console.log('****** LA CONEXIÓN A FALLADO ******');
        }
    })
}

module.exports = dbConnect;