"use strict"
import { addEventListeners } from "./listeners.js";

window.addEventListener("load", initApp);
// CLEAN :D
function initApp(){
    console.log("JS starting");
    addEventListeners();
}
