var express = require("express");
var fortune = require("./lib/fortune.js");
const app = express();
const axios = require("axios");

// set view engine
app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// set static file
app.use(express.static(__dirname + "/public"));

// setting testing
app.use(function (req, res, next) {
  res.locals.showTests =
    app.get("env") !== "production" && req.query.test === "1";
  next();
});

// routes
app.get("/", function (req, res) {
  res.render("index")
});

app.get("/result", function (req, res) {
  const uid = req.query.uid;
  const url = "https://erpresult.manit.ac.in/?data=Mj"+uid +"wyMDIzfDN8Nnw3NXwyMDIx&RegSession=2023&RegSemester_type_id_code=2&effective_from=2021&semsterNOIdCode=7&programMasterId=75&operation=show-result";
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
  axios.get(url).then((res1)=>{
    const data = {};
    res1.data.split("\n").map((line)=>{
      if(line.includes("Scholar")){
        let line1 = line.replace(` \r`,"").trim().split(" ").map((substring,index)=>{
          if(index === 8){
            data.scholar = substring;
          }
        });
      }
      if(line.includes("Candidate")){
        let line1 = line.replace(` \r`,"").trim().split(" ");
        let name = "";
        line1.map((substring,index)=>{
          if(index > 8 && index < line1.length-1){
            name += substring + " ";
          }
        })
        data.name = name;
      }
      
      if(line.includes("SGPA")){
        line.replace(" \r","").split(",").map((subLine,index)=>{
          if(index === 0){
            data.sgpa=subLine.split(":").pop();
          }
          else{
            data.cgpa=subLine.split(":").pop();
          }
        })
      }  
    })
    res.json({success:true,data:data});
  }).catch((err)=>{
    res.json({success : false})
  })
});

app.listen(3000);
