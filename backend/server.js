const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const Todo = require('./todo.model');
const PORT = 4000;
app.use(cors());
app.use(bodyparser.json());
mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongodb database establish sucessfully')
})
todoRoutes.route('/').get(function (req, res) {
    Todo.find(function (err, todos) {
        if (err) {
            console.log(err)
        }
        else {
            res.json(todos)
        }
    })
})
todoRoutes.route('/:id').get(function (req, res) {
    const id = req.params.id;
    Todo.findById(id, function (err, todo) {
        res.json(todo);
    });
});
todoRoutes.route('/add').post(function (req, res) {
    const todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({ 'todo': 'todo added sucessfully' })
        }).catch(err => {
            res.status(400).send('adding new todo Failed')
        })
})
todoRoutes.route('/update/:id').post(function (req, res) {
    Todo.findById(req.params.id, function (err, todo) {
        if (!todo) {
            res.status(404).send('data is not found')
        }
        else
        todo.todo_description = req.body.todo_description;
        todo.todo_responsible = req.body.todo_responsible;
        todo.todo_priority = req.body.todo_priority;
        todo.todo_completed = req.body.todo_completed;
        todo.save().then(todo=>{
            res.json('Todo Updated')
        })
        .catch(err=>{
            res.status(400).send('Updated not possible')
        })
    })
}
)
app.use('/todos', todoRoutes);
app.listen(PORT, () => {
    console.log(`port starting on ${PORT}`)
})