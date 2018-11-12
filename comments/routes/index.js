var express = require('express');
var router = express.Router();

/* Set up mongoose in order to connect to mongo database */
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB', { useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Comment: String
});

/*specify the data, collection */
//Makes an object from that schema as a model
var Comment = mongoose.model('Comment', commentSchema);
var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected to the databse
    console.log('Connected');
});

router.delete('/comment', function(req, res, next) {
    console.log("in the delete route");
    // Object.find().remove(function(){})
    Comment.find({}).remove(function(err, list) {
        // console.log("OK");
        if (err) return console.error(err); //If there's an error, print it out
        else {
           res.sendStatus(200);  //Otherwise console log the comments you found
        }


    })
});

/* GET home page. */
router.post('/comment', function(req, res, next) {
    console.log("im in the post route");
    console.log(req.body);

    /*Creating a new variable of common and save it*/
    var newcomment = new Comment(req.body);
    console.log(newcomment);
    newcomment.save(function(err, post) {
        if (err) return console.error(err);
        console.log(post);
        /* EVerything works out perfectly test line */
        res.sendStatus(200);
    });
});

/* GET comments from database */
router.get('/comment', function(req, res, next) {
    console.log("In the GET route");
    console.log(req.query);
    var name = req.query["q"];
    console.log("Name =" + name);

    // the default printing everyone comment unless they enter a Specific name
    var obj = {};
    if (name) {
        obj = { Name: name };
    }

    Comment.find(obj, function(err, list) {
        console.log(list);
        res.json(list); //Then send the comments
    });
})

module.exports = router;
