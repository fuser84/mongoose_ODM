const mongoose = require('mongoose');

//use third-party library for Promises
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

//const connect = mongoose.connect(url, {
//useMongoClient: true //is no longer necessary in mongoose 5.x
//});
const connect = mongoose.connect(url);

connect.then(() => {
    let db = mongoose.connection;

    console.log(`Connected correctly to server`);

    //modern approach
    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
        .then((dish) => {
            console.log(dish);
            return Dishes.findByIdAndUpdate(dish._id, {
                $set: {description: "Updated test"},
            }, {
                new: true //return updated dish
            })
                .exec();
        })
        .then((dish) => {
            console.log(dish);

            dish.comments.push({
                rating: 5,
                comment: `I'm getting a sinking feeling!`,
                author: `Leonardo di Carpaccio`
            });
            return dish.save();
        })
        .then((dish) => {
            console.log(dish);
            return db.collection('dishes').drop();
        })
        .then(() => {
            return db.close();
        })
        .catch((err) => {
            console.log(err);
        })
});

