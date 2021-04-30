var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tables = [
  {
    customerName: "Alfredo",
    customerEmail: "alfredo@email.com",
    customerId: 1,
    phoneNumber: "000-000-000"
  },
  {
    customerName: "Daniel",
    customerEmail: "daniel@email.com",
    customerId: 2,
    phoneNumber: "111-111-111"
  }
];

var waitlist = [
  {
    customerName: "Luis",
    customerEmail: "luis@email.com",
    customerId: 6,
    phoneNumber: "666-666-666"
  }
];

var recentlyBooked = 0;

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

app.post("/api/tables", function(req, res) {
  var newTable = req.body;
  console.log(newTable)
  newTable.routeName = newTable.customerName.replace(/\s+/g, "").toLowerCase();
  console.log(newTable);
  if (tables.length < 5) {
    tables.push(newTable);
    if (tables.length==5) {
      recentlyBooked = 1;
    }
    res.json(newTable);
  }
});

app.post("/api/waitlist", function(req, res) {
  var newTable = req.body;
  newTable.routeName = newTable.customerName.replace(/\s+/g, "").toLowerCase();
  console.log(newTable);
  if (tables.length == 5 && recentlyBooked != 1) {
    waitlist.push(newTable);
    res.json(newTable);
  }
  recentlyBooked=0;
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});
