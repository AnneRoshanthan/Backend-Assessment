const Tasks = require('../models/task')

const userController = {
    ceateTask: async (req, res) => {
        try {
            console.log('AUTH', req.user.id);
            const { userId, name, description, priority, status } = req.body;

            // User is required
            if (!userId)
                return res.status(400).json({ msg: "User is required" });

            // name field is required
            if (!name)
                return res.status(400).json({ msg: "Name is required" });

            // description field is required
            if (!description)
                return res.status(400).json({ msg: "Description is required" });

            // save the task
            const newTask = new Tasks({
                userId,
                name,
                description,
                priority,
                status
            });
            await newTask.save();
            res.status(200).json({ msg: 'Task saved successfully' });

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getTask: async (req, res) => {
        try {
            // getting the page number
            let page = req.params.pageNumber;

            // page is not then assign pagenumber to 1
            if (!page) {
                page = 1;
            }

            const itemPerPage = 5;
            const limit = parseInt(itemPerPage);
            const skip = (page - 1) * itemPerPage;

            // getting total tasks
            let totalTasks = await Tasks.countDocuments();

            const tasks = await Tasks.find()
                .limit(limit).skip(skip);

            if (!tasks)
                return res.status(400).json({ msg: "There is no tasks available" });

            return res.status(200).json({ tasks, totalTasks });

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    // updet all
    updateTask: async (req, res) => {
        try {
            const taskId = req.params.id;
            const { userId, name, description, priority, status } = req.body;

            // User is required
            if (!userId)
                return res.status(400).json({ msg: "User is required" });

            // name field is required
            if (!name)
                return res.status(400).json({ msg: "Name is required" });

            // description field is required
            if (!description)
                return res.status(400).json({ msg: "Description is required" });

            await Tasks.findByIdAndUpdate(
                {
                    _id: taskId
                }, {
                $set: {
                    userId,
                    name,
                    description,
                    priority,
                    status
                }
            }
            );
            return res.status(200).json({ msg: "Tasks updated" });
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    // Update the Priority of the task
    updatePriority: async (req, res) => {
        try {
            const taskId = req.params.id;
            const { priority } = req.body;

            await Tasks.findByIdAndUpdate(
                {
                    _id: taskId
                }, {
                $set: {
                    priority
                }
            }
            );
            return res.status(200).json({ msg: "Priority updated" });
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    // Update the status of the task
    updateStatus: async (req, res) => {
        try {
            const taskId = req.params.id;
            const { status } = req.body;

            await Tasks.findByIdAndUpdate(
                {
                    _id: taskId
                }, {
                $set: {
                    status
                }
            }
            );
            return res.status(200).json({ msg: "Status updated" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteTask: async (req, res) => {
        try {
            const taskId = req.params.id;
            await Tasks.findByIdAndDelete({
                _id: taskId
            });
            return res.status(200).json({ msg: "Tasks deleted" });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    listAllUserTask: async (req, res) => {
        try {
            // get userId from token via middleware
            const userId = req.user.id;

            const tasks = await Tasks.find({
                userId
            })
            return res.status(200).json({ tasks });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

   
}

module.exports = userController;