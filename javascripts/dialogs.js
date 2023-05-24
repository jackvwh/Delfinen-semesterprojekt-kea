import {saveData, deleteData} from "./rest-fnc.js";
export{createCompsDialog, createMemberDialog,createPracticeDialog, updateDialog, deleteDialog}

function createPracticeDialog(){
    document.querySelector("#create-practice-result-dialog").showModal();

    document.querySelector("#practice-result-form").addEventListener("submit", saveData);
}
function createCompsDialog(){
    document.querySelector("#create-comp-result-dialog").showModal();

    document.querySelector("#comp-result-form").addEventListener("submit", saveData);
}
function createMemberDialog(){
    document.querySelector("#create-dialog").showModal();

    document.querySelector("#create-form").addEventListener("submit", saveData);
}
function updateDialog(){
    document.querySelector("#update-dialog").showModal();
    document.querySelector("#update-form").addEventListener("submit", saveData);
}
function deleteDialog(id, type){
    document.querySelector("#delete-form").setAttribute("data-type", type)
    document.querySelector("#delete-form").setAttribute("data-id", id)
    document.querySelector("#delete-form").addEventListener("submit", deleteData);  
    document.querySelector("#delete-dialog").showModal();
}