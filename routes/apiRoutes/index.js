const router = require('express').Router();
const fs = require("fs")
//const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
let notes = require('../../db/db.json');

//find all notes
router.get('/notes', (req, res) => {
  notes  = JSON.parse(fs.readFileSync("./db/db.json"));
  res.json(notes);
});

//find note by id
router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

//add a new note
router.post('/notes', (req, res) => {
  let newNote = {
    id: Math.floor(Math.random()* 1000),
    title : req.body.title,
    text:req.body.text
  }
  notes.push(newNote)
  fs.writeFileSync("./db/db.json",JSON.stringify(notes),function(err){
    if(err) throw err;
  })
  res.json(notes);
});

module.exports = router;