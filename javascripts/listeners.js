
import {loginDialog} from "./login.js";
import {createCompsDialog, createPracticeDialog, createMemberDialog } from "./dialogs.js";
export {addEventListeners}

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