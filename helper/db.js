const mongoose = require('mongoose');

module.exports = ()=>{
    mongoose.connect('mongodb://msaiducar64:Ucar1907@ds031681.mlab.com:31681/heroku_zzkmvhg2');
    mongoose.connection.on('open',()=>{
        //console.log('Moogose bağlantı sağlandı')
    });
    mongoose.connection.on('error',(err)=>{
        console.log('Hata',err)
    });
    mongoose.Promise = global.Promise;

}