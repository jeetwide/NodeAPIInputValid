const express = require('express');
const router = express.Router();
const Joi = require('joi');





router.use(express.urlencoded({ extended: true }));

const courses = [
    {id:1, name : 'course1'},
    {id:2, name : 'course2'},
    {id:3, name : 'course3'},
];


//get all courses
router.get('/', (req, res) => {
    res.send(courses);

});
//fetch a single course
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found with given ID");
    res.send(course);
   });


   //Add a course
router.post('/',(req,res) => {
    const { error } = validateCourse(req.body);
    //validate if invalid then return 400 - Bad Request.
    
    if(error){
        //400 Bad Request
        res.status(400).send(error.details[0].message);
        return;
    }
   
    const course = {
        id:courses.length + 1,
        name : req.body.name
    };

    courses.push(course);
    res.send(course);

});

//Update course
router.put('/:id', (req, res) => {
    //look up for course if not exist then return 404.
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found with given ID");
    
    const { error } = validateCourse(req.body);

    //validate if invalid then return 400 - Bad Request.
    
    if(error){
        //400 Bad Request
        return res.status(400).send(error.details[0].message);
        
    }

    //if all well then update course & return updated course in response
    course.name=req.body.name;
    res.send(course);
});


router.delete('/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found with given ID");
    
    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);

});
function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return  Joi.validate(course,schema);
};

module.exports= router;