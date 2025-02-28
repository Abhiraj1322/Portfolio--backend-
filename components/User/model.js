const mongoose = require("mongoose");
const { scryptSync } = require("crypto"); //crypto is built-in to Node.js so you don't have to install

const db = require("../../db"); //shared db stuff

const UserSchema = new mongoose.Schema({
  user: String,
  password: String
});
const User = mongoose.model("User", UserSchema);

async function authenticateUser(username, pw) {
  await db.connect();
  let key = scryptSync(pw, process.env.SALT, 64);
  //check for existing user with matching user and hashed password
  let result = await User.findOne({
    user: username,
    password: key.toString("base64")
  });
  if (result) {
    return true;
  } else {
    return false;
  }
}

async function getUser(username) {
  await db.connect();
  //just check if username exists already
  let result = await User.findOne({ user: username });
  return (result) ? result : false;
}

async function addUser(username, pw) {
  await db.connect();
  //add user if username doesn't exist
  let user = await getUser(username);
  console.log("User found: " + user);
  if (!user) {
    let key = scryptSync(pw, process.env.SALT, 64);
    let newUser = new User({
      user: username,
      password: key.toString("base64")
    });
    let result = await newUser.save();
    // .save() will return the new user document, so to check for success, compare the result with the created newUser
    if (result === newUser) {
      return true;
    } else {
      return false;
    }
  } else {
    return false; //if user exists, return false
  }
}


module.exports = {
  authenticateUser,
  getUser,
  addUser,
 
}