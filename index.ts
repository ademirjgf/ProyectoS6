import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });

// Interface Task
interface Task {
    id: number;
    title: string;
    completed: boolean;
}

// Arreglo de tareas
let tasks: Task[] = [];

// Contador para los IDs
let nextId: number = 1;

// Agregar tarea
const addTask = (title: string) => {

    const task: Task = {
        id: nextId,
        title: title,
        completed: false
    };

    tasks.push(task);
    nextId++;

    console.log("Tarea agregada.");
};

// Listar tareas
const listTasks = () => {

    if (tasks.length === 0) {
        console.log("No hay tareas.");
        return;
    }

    for (let i = 0; i < tasks.length; i++) {

        const task = tasks[i];

        const status = task.completed ? "completed" : "pending";

        console.log(`[${task.id}] ${task.title} - ${status}`);
    }
};

// Eliminar última tarea
const removeTask = () => {

    const removedTask = tasks.pop();

    if (removedTask) {
        console.log(`Tarea eliminada: ${removedTask.title}`);
    } else {
        console.log("No hay tareas para eliminar.");
    }
};

// Menú
let option: string = "";

while (option !== "4") {

    console.log("\n=== MENÚ ===");
    console.log("1. Agregar tarea");
    console.log("2. Eliminar última tarea");
    console.log("3. Listar tareas");
    console.log("4. Salir");

    option = await rl.question("Elige una opción: ");

    if (option === "1") {

        const title = await rl.question("Ingrese el título de la tarea: ");

        addTask(title);

    } else if (option === "2") {

        removeTask();

    } else if (option === "3") {

        listTasks();

    } else if (option === "4") {

        console.log("Saliendo...");

    } else {

        console.log("Opción no válida.");
    }
}

rl.close();