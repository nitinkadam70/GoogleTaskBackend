const { Router } = require('express');
const TaskModel = require('../appModels/Taskapp');

const taskRouter = Router();

taskRouter.get('/:userId/task', async (req, res) => {
  let userId = req.params;
  let task = await TaskModel.find(userId);
  return res.send(task);
});

taskRouter.post('/:userId/task', async (req, res) => {
  const userId = req.params.userId; //here we get userId from params
  let payload = {
    ...req.body,
    userId,
  };
  let task = await new TaskModel(payload);
  task.save((err, success) => {
    if (err) {
      return res
        .status(500)
        .send({ message: 'something went wrong' });
    }
    return res.status(201).send(success); //success is whole payload that we have with userId
  });
});

taskRouter.delete('/:userId/task/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const task = await TaskModel.deleteOne({ _id: id }, {});
    return res.status(201).send({ message: 'Deleted Sucessfully' });
  } catch {
    return res.status(500).send({ message: 'Error while Deleting' });
  }
});

taskRouter.patch('/:userId/task/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const updateTask = await TaskModel.findByIdAndUpdate(
      _id,
      req.body
    );
    return res.send(updateTask);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = taskRouter;
