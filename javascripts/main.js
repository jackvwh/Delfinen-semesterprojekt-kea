"use strict"

import {loginDialog} from "./login.js";
import {calcMemberPayment, calcTotalIncome} from "./payment.js";
import {loadCompData, loadMemberData, loadPracticeData} from "./rest-fnc.js";
import {showMemberRow} from "./displayFnc.js";

window.addEventListener("load", initApp);

function initApp(){
    console.log("JS starting");

    addEventListeners();

    const memberArray = loadMemberData();
    const practiceResults = loadPracticeData();
    const compResults = loadCompData();

    console.log("Members: ", memberArray)
    console.log("Practice: ", practiceArray)
    console.log("Comps: ", compArray)



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
