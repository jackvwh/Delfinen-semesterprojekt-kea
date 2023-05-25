
import { loginDialog} from "./login.js";
import { createCompsDialog, createPracticeDialog, createMemberDialog, updateDialog } from "./dialogs.js";
export { addEventListeners}

function addEventListeners(){
    //disciplin checkbox hide listners
    ;
    ;

    // login dialog 
    document.querySelector("#login-btn").addEventListener("click", loginDialog);
    // log out btn
    document.querySelector("#logOut-btn").addEventListener("click", ()=>window.location.reload());

    // coach result dialogs
    document.querySelector("#insert-practice-result-btn").addEventListener("click", createPracticeDialog);
    document.querySelector("#insert-comp-result-btn").addEventListener("click", createCompsDialog);

    // create member dialog
    document.querySelector("#admin-create-member-btn").addEventListener("click", createMemberDialog);

    // update member personal info dialog
    document.querySelector("#regular-member-update-btn").addEventListener("click", ()=>updateDialog("-NW2R8JVFfH1dMD0qRLe"));
    document
    .querySelector("#comp-member-update-btn")
    .addEventListener("click", () => updateDialog("-NW3R8JVFfH1dMD0qRLe"));

    // add eventlisteners to member competition select to hide disciplins
    document.querySelector(".comp-select-true").addEventListener("click", ()=>{document.querySelector(".disciplin-checkbox").classList.remove("hidden")})

    document.querySelector(".comp-select-false").addEventListener("click", ()=>{document.querySelector(".disciplin-checkbox").classList.add("hidden")})
}