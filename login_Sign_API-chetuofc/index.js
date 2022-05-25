const express = require("express"); //importing express framework
const errorHandler = require("./middleware/errorHandel");
const app = express(); //create an express instance
require("./connection/dbconnect"); //importing the database connection file and starting the server

// register json express app
app.use(express.json());

// configure the dotenv variables
require("dotenv").config();
const port = process.env.PORT; //declearing  the Port

const signupRoutes = require("./Routes/signupRoutes"); //Import the signup routes
const loginRoutes = require("./Routes/loginRoutes"); //Import the login routes
const deleteRoutes = require("./Routes/deleteRoutes"); //import the deleting Routes
const ShowUserRoutes = require("./Routes/showUserRoutes"); //Import the login routes
const updateRoutes = require("./Routes/updateRoutes"); //Import the update routes

// register json express app
app.use(express.json());

//using the exports Routes
app.use(signupRoutes);
app.use(loginRoutes);
app.use(deleteRoutes);
app.use(ShowUserRoutes);
app.use(updateRoutes);

app.use((req, res, next) => {
  return res.json({
    msg: "Page Not Found",
  });
});

app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`)); // Start the server
