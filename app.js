var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect('mongodb://localhost/portfolioAPI', { useNewUrlParser: true });
// var db = mongoose.connection;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// SCHEMA SETUP
var investmentSchema = new mongoose.Schema({
    date: String,
    company: String,
    quantity: Number,
    cost: Number
});

var Investment = mongoose.model("Investment", investmentSchema);

var today = new Date();
today.setHours(today.getHours() - 14);
today = today.toISOString().split('T')[0];
    
app.get('/', (req, res) => {
    res.render("index");
});

// List Today's investment (plus the ability to list other date's investment
// if user include query ?date=YYYY-MM-DD
app.get('/investments', (req, res) => {

    if(req.query.date) {
        var param = req.query.date;
        
        Investment.find({"date": param}, function(err, investments) {
            if (err) {
                console.log(err);
            }
            else {
                var newArr = [];
    
                for(var i = 0; i < investments.length; i++) {
                    var singleObj = {
                        "company": investments[i].company,
                        "quantity": investments[i].quantity,
                        "cost": investments[i].cost
                    };
    
                    newArr.push(singleObj);
                }
                
                res.json(newArr);
            }
            
        });
    } else {
        
        Investment.find({"date": today}, function(err, investments) {
            if (err) {
                console.log(err);
            }
            else {
                var newArr = [];
    
                for(var i = 0; i < investments.length; i++) {
                    var singleObj = {
                        "company": investments[i].company,
                        "quantity": investments[i].quantity,
                        "cost": investments[i].cost
                    };
    
                    newArr.push(singleObj);
                }
                
                res.json(newArr);
            }

        }); 
    }
});

// List all investments
app.get('/investments/all', (req, res) => {
    // Get all investments from DB
    Investment.find({}, function(err, investments) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(investments);
        }
    });
});        


//NEW - show form to create new restaurant
app.get("/investments/new", function(req, res) {
    res.render("new");
});

//CREATE - add new restaurant to DB
app.post("/investments", function(req, res) {
    // get data from form and add to restaurants array
    var company     = req.body.company;
    var quantity    = req.body.quantity;
    var cost        = req.body.cost;
    var date;
    if (req.body.date) { 
        date = req.body.date;
    } else {
        date = today;
    }

    
    var newInvestment = { date: date, company: company, quantity: quantity, cost: cost };
    // Create a new campground and save to DB
    Investment.create(newInvestment, function(err, investment) {
        if (err) {
            console.log(err);
        }
        else {
            // redirect back to restaurants
            res.redirect("/portfolioAPI-Express/investments");
        }
    });

});

// Show edit form to edit an investment by user chosen date
app.get("/investments/edit", function(req, res) {
    // get data from form
    var date    = req.query.date;
    Investment.find({"date": date}, function(err, investments) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("edit", { investments: investments });
        }
    });
});

// Update the investments with user input
app.post("/investments/edit", function(req, res) {
    var company      = req.body.company;
    var objForUpdate = {};
    if (req.body.quantity) objForUpdate.quantity = req.body.quantity;
    if (req.body.cost) objForUpdate.cost = req.body.cost;
    objForUpdate = { $set: objForUpdate };

    Investment.update({"company" : company}, objForUpdate, function(err, investment) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/portfolioAPI-Express");
        }
    });
});



app.listen(3082, function() {
    console.log("The portfolioAPI Server Has Started!");
})