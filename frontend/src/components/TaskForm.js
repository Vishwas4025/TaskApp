import React, { useState } from "react";
import axios from "axios";

const TaskForm = () => {
    const [task, setTask] = useState({
        title: "",
        description: "",
        completed: false
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ 
            ...task, 
            [name]: value 
        });
    }

    {/*Adds task to the database */}
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/task", task);
            setTask({ 
                title: "", 
                description: "", 
                completed: false 
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Failed to add task");
        }
    };

    return (
        <div className="task-form">
            <h3>Add Task</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        type="text"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Task</button> {/*Button for submitting task*/}
            </form>
            {message && <p style={{ color: message.includes("failed") ? "red" : "green" }}>{message}</p>}
        </div>
    );
};

export default TaskForm;
