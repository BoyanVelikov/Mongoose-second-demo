const express = require('express');
const mongoose = require('mongoose');
const cars = require('./model.js');
const app = express();
const router = express.Router();
const port = 3000;
const uri = 'mongodb://0.0.0.0:27017/test';

const data = [{
        manifacturer: 'Opel',
        model: 'Vectra',
        carType: 'sedan'
    },
    {
        manifacturer: 'BMW',
        model: '3-series',
        carType: 'coupe'
    },
    {
        manifacturer: 'Buggati',
        model: 'Veyron',
        carType: 'hypercar'
    }
];

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection has been established.');
});

app.use('/', router);

router.route('/addData').post((req, res) => {
    cars.insertMany(data, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

router.route('/getData').get((req, res) => {
    cars.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});