const notesRouter = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// function to read all the current notes
function getNotes() {
  return JSON.parse(fs.readFileSync(__dirname + "/../db/db.json", "utf-8"));
}

notesRouter.get("/", (req, res) => {
  // logs that a GET request was received
  console.info(`GET /api/notes`);
  const notes = getNotes();
  // always log a response
  res.json(notes);
});

notesRouter.post("/", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add note`);
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const activeNote = {
      title,
      text,
      id: uuidv4(),
    };
    // get all the existing notes
    const notes = getNotes();
    // add this new note to existing
    notes.push(activeNote);
    // stringify the notes
    const updatedNotes = JSON.stringify(notes);
    // resave to dbjson
    fs.writeFileSync(__dirname + "/../db/db.json", updatedNotes, "utf-8");
    // always log a response !
    res.json(activeNote);
  } else {
    res.status(422).json("Error in adding note");
  }
});

notesRouter.get("/:id", (req, res) => {
  // Log that a GET request was received
  console.info(`GET /api/notes`);
  // get all existing notes
  const notes = getNotes();
  // find the note with given id
  const note = notes.find((note) => note.id === req.params.id);
  // if found, send note back
  if (note) {
    res.json(note);
  } else { // if note send error
    res.status(400).json("Cannot find note");
  }
});

notesRouter.delete("/:id", (req, res) => {
  // Log that a DELETE request was received
  console.info(`DELETE /api/notes`);
  // get all exisitng notes
  const notes = getNotes();
  // filter out the irrelevant note
  const filteredNotes = notes.filter((note) => note.id !== req.params.id);
  // resave filtered to dbjson
  const updatedNotes = JSON.stringify(filteredNotes);
  // resave to dbjson
  fs.writeFileSync(__dirname + "/../db/db.json", updatedNotes, "utf-8");
  //always send abck a response :)
  res.json(filteredNotes);
});

module.exports = notesRouter;
