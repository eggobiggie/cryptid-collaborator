var path = require("path");
var express = require("express");

module.exports = function(app) {

    app.get("/home", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
        // res.sendFile(path.join(__dirname, "../public/assets/css/style.css"));
    });

    app.use(express.static(path.join(__dirname, "../public")));

    app.get("/survey.html", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    app.get("*", function(req, res){
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

};