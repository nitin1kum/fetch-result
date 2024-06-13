var express = require("express");
const app = express();

// set view engine
app.engine("html", require("ejs").renderFile)
app.set("views",__dirname + "/views");
app.set("view engine" , "ejs");

// set static file
app.use(express.static(__dirname + "/public"))
 
app.get("/",function(req,res){
    res.render("index",{name : "nitin"});
})

app.listen(3000);