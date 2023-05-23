"use strict"
import { addEventListeners } from "./listeners.js";

window.addEventListener("load", initApp);

function initApp(){
    console.log("JS starting");
    addEventListeners();
}
