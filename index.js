const express = require("express");
const app = express();

var users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

// middleware
app.use(express.json());

app.get("/", (req, res) => {
  const johnKidneys = users[0].kidneys;
  const numberOfKidneys = johnKidneys.length;
  let numberOfHealthyKidneys = 0;

  for (let i = 0; i < johnKidneys.length; i++) {
    if (johnKidneys[i].healthy) {
      numberOfHealthyKidneys++;
    }
  }

  const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys,
  });
});

// query

// app.get("/check", (req, res) => {
//     const name = req.query.name;
//     res.send(String(name));
// });

app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });

  res.json({
    msg: "Done!",
  });
});

app.put("/", (req, res) => {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    // reset everything to healthy
    users[0].kidneys[i].healthy = true;
  }

  res.json({});
});

app.delete("/", (req, res) => {
  if (ifThereAtleastOneUnhealthyKidney()) {
    users[0].kidneys = users[0].kidneys.filter(
      (kidney) => kidney.healthy === true
    );
    res.json({msg : "done"});
  }
  else{
    res.status(411).json({
        msg : "You have no bad kidneys"
    });
  }
});

function ifThereAtleastOneUnhealthyKidney() {
  let flag = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      flag = true;
    }
  }

  return flag;
}

app.listen(3000);
