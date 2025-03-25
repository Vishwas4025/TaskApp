Introduction :
This API is designed to manage tasks with CRUD functionality. Users can create, update, delete, and mark tasks as completed. The API is built using Node.js, Express.js, and MongoDB.

Installation and Setup
    Prerequisites (Ensure you have the following installed) :
    1. Node.js (v14+ recommended)
    2. MongoDB (Local or Atlas Cloud Database)
    3. npm or yarn package manager

Steps to Run the API
    1. Clone the repository:
        git clone https://github.com/yourusername/your-repo.git
        cd your-repo
    2. Install dependencies (frontend and backend):
        npm install
    3. Set up environment variables:
        Create a .env file in the backend directory.
        Add the following variables:
        PORT=4000
        MONGO_URI=mongodb://localhost:27017/taskmanager 
    4. Start the server:
        npm start

API Endpoints
    1. Get All Tasks
        Endpoint: GET /alltasks
        Description: Retrieves all tasks.
    2. Create a Task
        Endpoint: POST /task
        Request Body:
        {
            "title": "Revise a subject",
            "description": "Review the last few class notes to summarize key points."
        }
    3. Update a Task
        Endpoint: PUT /task/:id
        Request Body:
        {
            "title": "Revise a subject - Updated",
            "description": "Focus on key formulas and concepts."
        }
    4. Delete a Task
        Endpoint: DELETE /task/:id
        Description: deletes specific task
    5. Mark Task as Completed
        Endpoint: PUT /task/:id
        Request Body:
        {
            "completed": true
        }

Testing the API
    Using Postman
    1. Open Postman.
    2. Import API collection or manually create requests.
    3. Use the above endpoints for testing.

    Using cURL
    1. Get all tasks: 
        curl -X GET http://localhost:4000/alltasks
    2. Create a task: 
        curl -X POST http://localhost:4000/task -H "Content-Type: application/json" -d '{"title":"Work on project","description":"Implement new features."}'
    3. Update a task: 
        curl -X PUT http://localhost:4000/task/60c72b2f9af1a8b5d3e6c9a5 -H "Content-Type: application/json" -d '{"title":"Updated Title"}'
    4. Delete a task: 
        curl -X DELETE http://localhost:4000/task/60c72b2f9af1a8b5d3e6c9a5
    5. Mark task as completed:
        curl -X PATCH http://localhost:4000/task/60c72b2f9af1a8b5d3e6c9a5 -H "Content-Type: application/json" -d '{"completed": true}'


