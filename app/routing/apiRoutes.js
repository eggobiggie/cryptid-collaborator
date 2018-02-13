var cryptidData = require("../data/friends");

module.exports = function(app) {

    app.get("/api/cryptids", function(req, res) {
        res.json(cryptidData);
    });

}

// app.post("/api/cryptids", function(req, res) {
    //if difference between user survey and cryptid is closest,
    //post data to module on survey page
// });