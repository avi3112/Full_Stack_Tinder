const express = require("express");
// order of writing the route a matter a alot
const app = express();


// app.get("/user", (req, res) => {
//   console.log(req.query);

//   res.send({ firstname: "avinabh", lastname: "kumar" });
// });
// app.get("/user/:userID/:name/:password", (req, res) => {
//   // console.log(req.query);
//   console.log(req.params);

//   res.send({ firstname: "avinabh", lastname: "kumar" });
// });

app.use("/user",[(req,res,next)=>{
  console.log("handling the user route")
  next()
  //res.send("responce1")
},
(req,res)=>{
  console.log("handling the user route 2")
  res.send("responce2")
}]
)
app.listen(7777, () => {
  console.log("server running on 7777");
});
