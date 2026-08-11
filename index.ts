import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });
// ?? No eliminar las líneas de arriba ??

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
rl.close();