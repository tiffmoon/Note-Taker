const fs = require('fs');
const express = require('express');
const path = require('path');
const notes = require('./db/db.json');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
  console.info(`GET /notes`);
});

app.get('/api/notes', (req, res) => {
  console.info(`GET /api/notes`);

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const parsedNotes = JSON.parse(data);
    }
       // Add a new review
      //parsedReviews.push(newReview)
  })
});

app.post('/api/notes', (req,res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);

  

}
)
// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:3001 🚀`)
);