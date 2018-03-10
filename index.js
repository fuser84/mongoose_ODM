const mongoose = require('mongoose');

//use third-party library for Promises
mongoose.Promise = require('bluebird');

const Dishes  = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

//const connect = mongoose.connect(url, {
   //useMongoClient: true //is no longer necessary in mongoose 5.x
//});
const connect = mongoose.connect(url);

connect.then(() => {
    let db = mongoose.connection;

   console.log(`Connected correctly to server`);

   let newDish = Dishes({
      name: 'Uthappizza',
      description: 'test'
   });

   newDish.save()
       .then((dish) => {
           console.log(dish);
           return Dishes.find({}).exec();
       })
       .then((dishes) => {
            console.log(dishes);

            return db.collection('dishes').drop();
       })
       .then(() => {
           return db.close();
       })
       .catch((err) => {
           console.log(err);
       })
});

