"use strict"

import {loginDialog} from "./login.js";
import {loadCompData, loadMemberData, loadPracticeData, createData} from "./rest-fnc.js";
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
    // console.log("Members: ", memberArray)
    // console.log("Practice: ", practiceResults)
    // console.log("Comps: ", compResults)

    iterateMembers(memberArray, "admin");
    iterateMembers(memberArray, "cashier");

    iterateComps(compResults);
    iteratePractice(practiceResults);

    sortByInput
    document.querySelector("#sort-payments").addEventListener("change", sortByInput)

    function sortByInput(event) {
        const selectedValue = event.target.value
        const members = memberArray
        if (selectedValue === "Paid") {
           const paidFirst = members.sort((a, b) => b.paymentStatus - a.paymentStatus)
            console.log("Paid First", paidFirst);
        } else if (selectedValue === "Unpaid") {
            const unpaidFirst = members.sort((a, b) => a.paymentStatus - b.paymentStatus)
            console.log("Unpaid First", unpaidFirst);
        }
    }

}

function addEventListeners(){
    //disciplin checkbox hide listners
    document.querySelector("#create-competition-btn").addEventListener("click", ()=>document.querySelector("#create-disciplin-checkbox").classList.toggle("hidden"));
    document.querySelector("#update-competition-btn").addEventListener("click", ()=>document.querySelector("#update-disciplin-checkbox").classList.toggle("hidden"));

    // login dialog 
    document.querySelector("#login-btn").addEventListener("click", loginDialog);
    // log out btn
    document.querySelector("#logOut-btn").addEventListener("click", ()=>window.location.reload());

    // coach result dialogs
    document.querySelector("#insert-practice-result-btn").addEventListener("click", createPracticeDialog);
    document.querySelector("#insert-comp-result-btn").addEventListener("click", createCompsDialog);

    // create member dialog
    document.querySelector("#admin-create-member-btn").addEventListener("click", createMemberDialog);

    // sort paid & unpaid
    // document.querySelector("#sort-payments").addEventListener("change", sortByInput)
}
function createPracticeDialog(){
    document.querySelector("#create-practice-result-dialog").showModal();

    document.querySelector("#practice-result-form").addEventListener("submit", createData);
}
function createCompsDialog(){
    document.querySelector("#create-comp-result-dialog").showModal();

    document.querySelector("#comp-result-form").addEventListener("submit", createData);
}

function createMemberDialog(){
    document.querySelector("#create-dialog").showModal();

    document.querySelector("#create-form").addEventListener("submit", createData);
}


