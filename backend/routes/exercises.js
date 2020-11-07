const router = require('express').Router();
let Exercise = require('../models/exercise.model');
const { route } = require('./users');

router.route('/').get((req,res)=> {
    Exercise.find().then(exercises => res.json(exercises))
    .catch(err => res.json(400).json('Error: '+ err));
})


router.route('/add').post((req,res)=> {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save().then(()=> res.json('Exercise Added'))
    .catch(err => res.status(400).json('Error: '+ err))
});

router.route('/:id').get((req,res)=>{
    Exercise.findById(req.params.id)
    .then(excercise => res.json(excercise))
    .catch(err => res.status(400).json('Error: '+ err));
})

router.route('/:id').delete((req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise Deleted'))
    .catch(err => res.status(400).json('Error: '+ err));
})

router.route('/update/:id').post((req,res)=>{
    Exercise.findById(req.params.id)
    .then(excercise => {
        excercise.username = req.body.username;
        excercise.description = req.body.description;
        excercise.duration = Number(req.body.duration);
        excercise.date = Date.parse(req.body.date);
        excercise.save()
        .then(()=> res.json('Exercise Updated'))
        .catch(()=> res.status(400).json('Error'+ err))
    })
    .catch(err => res.status(400).json('Error: '+ err));
})

module.exports = router