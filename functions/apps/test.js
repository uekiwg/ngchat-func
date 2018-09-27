

exports.timestamp = function(req, res) {
    //console.log("req", req);
    console.log("req.query=", req.query);
    console.log("req.body=", req.body);
    //console.log("res", res);
    res.send(`${Date.now()}`);
}
