const { error } = require("console");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];
let currentID = 1;

app.post("/tasks",(request, response) => {
    let body = request.body;
    let newTask = {
        id: currentID++,
        title: body.titulo,
        description: body.description,
        status: body.status,
    };

    tasks.push(newTask);

    response.status(200).json({message: "Task created successfully", newTask});

});


app.get("/oi", (request, response) => {
    return response.status(200).json("Hello World");
});

app.get("/tasks", (request, response) => {
    return response.status(200).json(tasks);
});

app.get("/tasks/:id", (request, response) => {
    let idRequest = request.params.id;

    const taskFound = tasks.find((task) => task.id == idRequest);
    if(!taskFound){
        return response.status(404).json({message: "Task not found"});
    }

    return response.status(200).json(taskFound);
});



app.listen(port, () => {
    console.log("Servidor opened at Port 3000");
});

