var cryptidData = require("../data/friends");
var userData = require("../data/users")

module.exports = function(app) {

    app.get("/api/cryptids", function(req, res) {
        res.json(cryptidData);
    });

    app.get("/api/users", function(req, res) {
        res.json(userData);
    });

    app.post("/api/users", function(req, res) {
        newUser = req.body;
        userData.push(newUser);
        res.json(newUser);
    });

}

