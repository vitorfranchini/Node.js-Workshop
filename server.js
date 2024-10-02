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


app.delete("/tasks/:id", (request, response) => {
    let idRequest = request.params.id;

    const taskFound = tasks.find((task) => task.id == idRequest);

    if(!taskFound){
        return response.status(404).json({message: "Task not found"});
    }

    const taskIndex = tasks.indexOf(taskFound);
    tasks.splice(taskIndex, 1);

    return response.status(200).json({message: `Task deleted: ${taskFound.id}`});
});


app.put("/tasks/:id", (request, response) => {                              //TODO  not working
    let idRequest = request.params.id;
    let bodyRequest = request.body;

    const taskFound = tasks.findIndex((task) => task.id == idRequest);      //possible problem

    if(taskFound === -1){
        return response.status(404).json({message: "Task not found"});
    }

    let task = tasks[taskFound];
    task = {
        id: currentID++,
        title: bodyRequest.titulo,
        description: bodyRequest.description,
        status: bodyRequest.status,
    };

    return response.status(200).json({message: `Task updated: `,taskFound});
});


app.get("/oi", (request, response) => {
    return response.status(200).json("Hello World");
});

app.listen(port, () => {
    console.log("Servidor opened at Port 3000");
});

