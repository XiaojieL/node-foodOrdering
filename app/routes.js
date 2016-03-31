var Food = require('./models/food');
var tax_rate = 0.075;

function getFoods(res) {
    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(foods); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/food', function (req, res) {
        // use mongoose to get all todos in the database
        getFoods(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/food', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Food.create({
            name: req.body.name,
            price : req.body.price,
            orderedBy : req.body.orderedBy
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getFoods(res);
        });

    });

    // delete a todo
    app.delete('/api/food/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);

            getFoods(res);
        });
    });

        // delete a todo
    app.get('/api/food/serve/:food_id', function (req, res) {

        Food.update(
            { _id: req.params.food_id },
            {
                $set : {
                    done : true
                }
            }
        , function (err, food) {
            if (err)
                res.send(err);

            getFoods(res);
        });
    });

    // get total prices
    app.get('/api/total', function (req, res) {

        Food.aggregate([
            {
                $group: {
                    _id : null,
                    total: { $sum: "$price"}
                }
            }
        ], function (err, count) {
            if (err)
                res.send(err);

            if(count && count[0]){
                var total = count[0]["total"] * (1+tax_rate);
                res.json({"total" : total});
            }else res.json({"total" : 0});// if no item in db
            
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};