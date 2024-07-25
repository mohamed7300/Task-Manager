const Task = require('../models/task')
const asyncWrapper = require('../middleware/async');

const getAllTasks = asyncWrapper(async (req, res) => {
    const allTasks = await Task.find({});
    res.json({ tasks: allTasks });
});


const createTask = asyncWrapper(async (req, res) => {
    // res.send('create task');

    const task = await Task.create(req.body)
    res.json({ task });


})

const getTask = asyncWrapper(async (req, res, next) => {
    const theTask = await Task.findOne({ _id: req.params.id });
    if (!theTask) {
        const error = new Error('Not Found');
        error.status = 404;
        return next(error);
        // return res.json({ msg: `No task with this Id` });
    }
    res.json(theTask);

    // res.send('get single task');
})
const deleteTask = asyncWrapper(async (req, res, next) => {

    const deletedTask = await Task.findByIdAndDelete({ _id: req.params.id });
    if (!deletedTask) {
        const error = new Error('Not Found');
        error.status = 404;
        return next(error);
        // return res.json({ msg: `No task with this Id` });
    }
    res.json(`task ${deletedTask._id} has been deleted`);


})

const updateTask = asyncWrapper(async (req, res, next) => {
    // const theTask = await Task.findOne({ _id: req.params.id });
    // // console.log(theTask, req.body.name, req.body.completed);
    // if (!theTask) {
    //     return res.json({ _id: req.params.id });

    // }

    // let taskToUpdate = {
    //     name: req.body.name || theTask.name,
    //     completed: req.body.completed || theTask.completed
    // };
    // console.log(taskToUpdate);
    const updatedTask = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
        runValidators: true,
        new: true
    });
    if (!updatedTask) {
        const error = new Error('Not Found');
        error.status = 404;
        return next(error);
    }
    res.json(updatedTask);

})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}