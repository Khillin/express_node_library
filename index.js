const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, title:'Data Structures'},
    {id: 2, title:'Learn Node JS'},
    {id: 3, title:'Lear React JS'}
]

//GET Request
app.get('/',(req,res) =>{
    res.send('Welcome to Home Page');
})

app.get('/api/courses',(req,res) =>{
    res.send(courses);
})

app.get('/api/courses/:id',(req,res) =>{
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if(!course) res.status(404).send(`Course with id ${req.params.id} not found`);
    res.send(course);
})

//POST Request
app.post('/api/courses',(req,res) =>{
    console.log("post request trigerred");

    const {error} = validateCourse(req.body);

    if(error){
        //400 Bad request
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length +1,
        title: req.body.title
    };
    courses.push(course);
    res.send(course);

})

//PUT request
app.put('/api/courses/:id',(req,res) =>{
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if(!course) res.status(404).send(`Course with id ${req.params.id} not found`);

    const {error} = validateCourse(req.body);

    if(error){
        //400 Bad request
        res.status(400).send(error.details[0].message);
        return;
    }

    course.title = req.body.title;
    res.send(course);

})

function validateCourse(course) {

    const schema = Joi.object({
        title: Joi.string().min(3).required()
    })
   return schema.validate(course);
}

app.delete('/api/courses/:id',(req,res) =>{
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if(!course) res.status(404).send(`Course with id ${req.params.id} not found`);

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);

})


const port = process.env.PORT || 3000;


app.listen(3000,() => console.log(`Listening on port ${port}...`));