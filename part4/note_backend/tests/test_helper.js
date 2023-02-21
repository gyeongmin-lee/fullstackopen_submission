const Note = require("../models/note");
const User = require("../models/user");

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

const nonExistingId = async () => {
  const note = new Note({ content: "willremovethissoon" });
  await note.save();
  await note.remove();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const getLoggedInToken = async (api) => {
  const newUser = {
    username: "mluukkai",
    name: "Matti Luukkainen",
    password: "salainen",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const loggedInUser = await api
    .post("/api/login")
    .send(newUser)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const token = loggedInUser.body.token;
  return token;
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
  getLoggedInToken,
};
