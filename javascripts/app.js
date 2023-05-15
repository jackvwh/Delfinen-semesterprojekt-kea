"use strict"

import { loginDialog } from "./login.js";

window.addEventListener("load", initApp);

function initApp(){
    console.log("JS starting");

    addEventListeners();
}

function addEventListeners(){
    // coach result dialogs
    // document.querySelector("#create-practice-btn").addEventListener("click", createPracticeDialog);
    // document.querySelector("#update-practice-btn").addEventListener("click", updatePracticeDialog);
    // document.querySelector("#create-comp-btn").addEventListener("click", createCompDialog);
    // document.querySelector("#update-comp-btn").addEventListener("click", updateCompDialog);

    // login dialog 
    document.querySelector("#login-btn").addEventListener("click", loginDialog);

    // create member dialog
    // document.querySelector("#create-member-btn").addEventListener("click", createMemberDialog);
}
