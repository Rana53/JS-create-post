const express = require('express');

const app = express();
let count = 0;
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Header",
        "Origin, X-Request-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
})
app.use("/api/posts", (req, res, next) => {
    const posts = [{
            id: "5whefdjhjadslfj",
            title: "First server-side post",
            content: "This is comming from server"
        },
        {
            id: "764wgkdajgfdwg",
            title: "Second server-side post",
            content: 'This is also comming from server'
        }
    ];
    res.status(200).json({
        message: 'Post fatched successfully',
        posts: posts
    });
});


module.exports = app;