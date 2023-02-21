const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    return response.status(400).json({
      error: "username or password missing",
    });
  }

  if (username.length < 3) {
    return response.status(400).json({
      error: "username is shorter than the minimum allowed length (3)",
    });
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: "password is shorter than the minimum allowed length (3)",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = userRouter;
