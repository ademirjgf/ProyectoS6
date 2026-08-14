import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const rl = readline.createInterface({ input, output });

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const tasks: Task[] = [];

let nextId = 1;

// ============================================
// SIMULAR GUARDADO EN BASE DE DATOS
// ============================================

const saveToDB = (task: Task): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Tarea "${task.title}" guardada en la base de datos.`);
      resolve();
    }, 2000);
  });
};

// ============================================
// AGREGAR TAREA (ASÍNCRONA)
// ============================================

const addTask = async (title: string) => {
  try {
    if (title.trim() === "") {
      throw new Error("El título de la tarea no puede estar vacío.");
    }

    const newTask: Task = {
      id: nextId,
      title: title,
      completed: false,
    };

    await saveToDB(newTask);

    tasks.push(newTask);
    nextId++;

    console.log("Tarea agregada correctamente.");
  } catch (error) {
    console.log((error as Error).message);
  }
};

// ============================================
// LISTAR TAREAS
// ============================================

const listTasks = () => {
  if (tasks.length === 0) {
    console.log("No hay tareas.");
    return;
  }

  const taskStrings = tasks.map((task) => {
    const { id, title, completed } = task;

    const status = completed ? "completed" : "pending";

    return `[${id}] ${title} - ${status}`;
  });

  taskStrings.forEach((taskString) => {
    console.log(taskString);
  });
};

// ============================================
// ELIMINAR ÚLTIMA TAREA
// ============================================

const removeTask = () => {
  const removedTask = tasks.pop();

  if (removedTask) {
    console.log(`Tarea eliminada: ${removedTask.title}`);
  } else {
    console.log("No hay tareas para eliminar.");
  }
};

// ============================================
// MARCAR COMO COMPLETADA
// ============================================

const markCompleted = (id: number) => {
  const task = tasks.find((task) => task.id === id);

  if (task) {
    task.completed = true;
    console.log(`Tarea "${task.title}" marcada como completada.`);
  } else {
    console.log("No se encontró una tarea con ese ID.");
  }
};

// ============================================
// FILTRAR PENDIENTES
// ============================================

const filterPending = () => {
  return tasks.filter((task) => task.completed === false);
};

// ============================================
// FILTRAR COMPLETADAS
// ============================================

const filterCompleted = () => {
  return tasks.filter((task) => task.completed === true);
};

// ============================================
// MENÚ
// ============================================

let option = "";

while (option !== "7") {
  console.log("\n===== GESTOR DE TAREAS =====");
  console.log("1. Agregar tarea");
  console.log("2. Eliminar última tarea");
  console.log("3. Listar tareas");
  console.log("4. Marcar tarea como completada");
  console.log("5. Ver tareas pendientes");
  console.log("6. Ver tareas completadas");
  console.log("7. Salir");

  option = await rl.question("Elige una opción: ");

  if (option === "1") {
    const title = await rl.question("Escribe el título de la tarea: ");

    await addTask(title);
  } else if (option === "2") {
    removeTask();
  } else if (option === "3") {
    listTasks();
  } else if (option === "4") {
    const id = Number(await rl.question("Escribe el ID de la tarea: "));

    markCompleted(id);
  } else if (option === "5") {
    const pendingTasks = filterPending();

    if (pendingTasks.length === 0) {
      console.log("No hay tareas pendientes.");
    } else {
      pendingTasks.forEach((task) => {
        console.log(`[${task.id}] ${task.title} - pending`);
      });
    }
  } else if (option === "6") {
    const completedTasks = filterCompleted();

    if (completedTasks.length === 0) {
      console.log("No hay tareas completadas.");
    } else {
      completedTasks.forEach((task) => {
        console.log(`[${task.id}] ${task.title} - completed`);
      });
    }
  } else if (option === "7") {
    console.log("¡Hasta luego!");
  } else {
    console.log("Opción no válida.");
  }
}

rl.close();
