import axios from "axios";
import React, { useEffect, useState } from "react";

const TasksList = () => {
    const [tasks, setTasks] = useState([]);
    const [editRow, setEditRow] = useState(null);
    const [updatedTask, setUpdatedTask] = useState({});

    {/*calls the function to fetch the tasks */}
    useEffect(() => {
        fetchTasks();
    }, []);

    {/*fetches all tasks from database*/}
    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:4000/alltasks");
            setTasks(response.data);
        } catch (error) {
            console.log("Error fetching tasks:", error);
        }
    };

    {/*used to trigger only specific task that needs to be updated */}
    const handleUpdate = (_id, task) => {
        setEditRow(_id);
        setUpdatedTask(task);
    };

    {/*updates the fields to useState on changes in input field */}
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask({ 
            ...updatedTask, 
            [name]: value 
        });
    };

    {/*The useState which is saved above is submitted to backend to update the task */}
    const handleSubmit = async (_id) => {
        try {
            const response = await axios.put(`http://localhost:4000/task/${_id}`, updatedTask);
            setUpdatedTask({});
            setEditRow(null);
            alert(response.data.message);
            fetchTasks();
        } catch (error) {
            alert("Failed to update task");
        }
    };

    {/*used to cancel update, it then retrives the old task*/}
    const handleCancel = () => {
        setEditRow(null);
    };

    {/*used to delete the task */}
    const handleDelete = async (_id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/task/${_id}`);
            alert(response.data.message);
            fetchTasks();
        } catch (error) {
            alert("Failed to delete task");
        }
    };

    {/*used to mark and unmark task as completed  */}
    const handleCheckboxChange = async (_id, completed) => {
        try {
            await axios.put(`http://localhost:4000/task/${_id}`, { completed: !completed });
            fetchTasks();
        } catch (error) {
            alert("Failed to update task status");
        }
    };

    return (
        
        <div className="tasks-list">
            <h3>Tasks</h3>
            <div >
                {tasks.map((task) => (
                    <div key={task._id} className="task-card">
                        {/* Delete and Update Buttons for each task */}
                        <div className="top-right-buttons">
                            <button onClick={() => handleDelete(task._id)}>Delete</button>
                            <button onClick={() => handleUpdate(task._id, task)}>Edit</button>
                        </div>

                        {/* Input tags displayed when clicked on update */}
                        {editRow === task._id ? (
                            <div>
                                <input 
                                    type="text" 
                                    name="title" 
                                    value={updatedTask.title} 
                                    onChange={handleChange} 
                                    style={{ width: "60%", marginBottom: "10px" }} 
                                />
                                <textarea 
                                    name="description" 
                                    value={updatedTask.description} 
                                    onChange={handleChange} 
                                    style={{ width: "100%", marginBottom: "10px", height: "60px" }} 
                                />
                                <button onClick={() => handleSubmit(task._id)}>Save</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                {/* Title and Description displayed */}
                                <h4>{task.title}</h4>
                                <p>{task.description}</p>
                                {/* Checkbox for marking completed tasks */}
                                <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleCheckboxChange(task._id, task.completed)}
                                    />
                                    <label>Mark as Completed</label>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

            </div>
        </div>
    );
};

export default TasksList;

