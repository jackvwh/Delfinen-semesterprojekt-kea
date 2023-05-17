"use strict"

import {loginDialog} from "./login.js";
import {loadCompData, loadMemberData, loadPracticeData, deleteData} from "./rest-fnc.js";
import {iterateMembers, iterateComps, iteratePractice} from "./displayFnc.js";
import {calcMemberPayment, calcTotalIncome} from "./payment.js";


window.addEventListener("load", initApp);

async function initApp(){
    console.log("JS starting");

    addEventListeners();

    const memberArray = await loadMemberData();
    const practiceResults = await loadPracticeData();
    const compResults = await loadCompData();

    // for testing
    console.log("Members: ", memberArray)
    console.log("Practice: ", practiceResults)
    console.log("Comps: ", compResults)

    iterateMembers(memberArray, "admin");
    iterateMembers(memberArray, "cashier");

    iterateComps(compResults);
    iteratePractice(practiceResults);
}

function addEventListeners(){
    // coach result dialogs
    document.querySelector("#insert-practice-result-btn").addEventListener("click", createPracticeDialog);
    document.querySelector("#insert-comp-result-btn").addEventListener("click", createCompsDialog);

    // login dialog 
    document.querySelector("#login-btn").addEventListener("click", loginDialog);
    // log out btn
    document.querySelector("#logOut-btn").addEventListener("click", ()=>window.location.reload());

    // create member dialog
    // document.querySelector("#create-member-btn").addEventListener("click", createMemberDialog);
}
function createPracticeDialog(event){
    event.preventDefault();

    document.querySelector("#create-practice-result-dialog").showModal();

    document.querySelector("#practice-result-form").addEventListener("submit", createPracticeResult);
}
function createCompsDialog(event){
    event.preventDefault();

    document.querySelector("#create-comp-result-dialog").showModal();

    document.querySelector("#comp-result-form").addEventListener("submit", createCompResult);
}
