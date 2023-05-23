"use strict"
import { addEventListeners } from "./listeners";

window.addEventListener("load", initApp);

function initApp(){
    console.log("JS starting");
    addEventListeners();
}
