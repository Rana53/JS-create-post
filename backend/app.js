const express = require('express');

const app = express();
let count = 0;
app.use((req, res, next) => {
    count++
    console.log(count + 'First middleware');
    res.send('Hello from express via second middle ware');
    //  next();
});

// app.use((req, res, next) => {
//     count++;
//     console.log(count + 'Second middle ware call')
//     res.send('Hello from express via second middle ware');
// });

module.exports = app;