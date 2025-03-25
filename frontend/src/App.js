import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import TasksList from "./components/TasksList";

function App() {
  return (
    
    <Router>
      <div>
          {/*This portion represents navbar */}
          <div className="navbar">
              <Link to="/">
                  <h1>TaskApp</h1>
              </Link>
              <div className='navbar-routes'>
                  <Link to="/">
                    Add Task
                  </Link>
                  <Link to="/tasks">
                    View Tasks
                  </Link>
              </div>
          </div>
          <div>
              <Routes>
                  {/*Routes :
                    / - Home page for adding task
                    /tasks - To view all the tasks */}
                  <Route path="/" element={<TaskForm />} />
                  <Route path="/tasks" element={<TasksList />} />
              </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
