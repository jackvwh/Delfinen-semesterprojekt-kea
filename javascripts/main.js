"use strict"

import {loginDialog} from "./login.js";
import {loadCompData, loadMemberData, loadPracticeData} from "./rest-fnc.js";
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
    // document.querySelector("#create-practice-btn").addEventListener("click", createPracticeDialog);
    // document.querySelector("#update-practice-btn").addEventListener("click", updatePracticeDialog);
    // document.querySelector("#create-comp-btn").addEventListener("click", createCompDialog);
    // document.querySelector("#update-comp-btn").addEventListener("click", updateCompDialog);

    // login dialog 
    document.querySelector("#login-btn").addEventListener("click", loginDialog);
    // log out btn
    document.querySelector("#logOut-btn").addEventListener("click", ()=>window.location.reload());

    // create member dialog
    // document.querySelector("#create-member-btn").addEventListener("click", createMemberDialog);
}
