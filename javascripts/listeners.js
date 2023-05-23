
import {loginDialog} from "./login.js";
import {createData } from "./rest-fnc.js";
export{ addEventListeners}

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