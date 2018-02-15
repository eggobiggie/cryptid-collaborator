var cryptidData = require("../data/friends");

module.exports = function(app) {

    app.get("/api/cryptids", function(req, res) {
        res.json(cryptidData);
    });

    app.post("/api/cryptids", function(req, res) {
        friends.push(req.body);
        res.json(true);
    });

}

