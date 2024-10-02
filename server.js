const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let task = [];
let currentID = 1;

app.post("/task",(request, response) => {
    let body = request.body;
    let newTask = {
        id: currentID++,
        title: body.titulo,
        description: body.description,
        status: body.status,
    };

    task.push(newTask);

    response.status(200).json({message: "Task created successfully", newTask});


});


app.get("/oi", (request, response) => {
    return response.status(200).json("Hello World");
});







app.listen(port, () => {
    console.log("Servidor opened at Port 3000");
});

