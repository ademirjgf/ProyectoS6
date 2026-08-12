import readline from "readline/promises";
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });
 //?? No eliminar las líneas de arriba ??//

// ?? Escribe tu código aquí ??
let systemName: string = "nombre del sistema";
let version: number = 1.1;
let userName: string = "Ademir";

console.log("=============================");
console.log(" " + systemName + " v" + version);
console.log(" Bienvenido, " + userName + "!");
console.log(" Proximo version: v" + (version + 0.1));
console.log("=============================");
// ?? No eliminar las líneas de abajo ??

let tareas: string[] = [];
let salir = false;
while (!salir) {
    console.log("\n======Menu de tareas======");
    console.log("1. Agregar tarea");
    console.log("2. Eliminar ultima tarea");
    console.log("3. listar tareas");
    console.log("4. Salir");

    const opcion = await rl.question("Seleccione una opción: ");
    switch (opcion) {
        case "1":
            const titulo = await rl.question("Escribe el titulo de la tarea: ");
            tareas.push(titulo);
            console.log(`Tarea "${titulo}" agregada correctamente.`);
            break;
            case "2":
                const tareaEliminada = tareas.pop();
                if (tareaEliminada) {
                    console.log(`Tarea "${tareaEliminada}" eliminada correctamente.`);  
                } else {
                        console.log("No hay tareas para eliminar.");
                    }
            break;
            case "3":
            console.log("\n====Lista de tareas====");
            if (tareas.length === 0) {
                console.log("No hay tareas registradas.");
            }else {
                    for (let i = 0; i < tareas.length; i++) {
                        console.log(`${i + 1}. ${tareas[i]}`);
                    }

    }
    break;
case "4":
    salir = true;
    console.log("Hasta luego");
    break;
default:
    console.log("Opción inválida.");
    }
}
rl.close();