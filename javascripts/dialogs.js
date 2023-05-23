import {createData} from "./rest-fnc.js";
export{createCompsDialog, createMemberDialog,createPracticeDialog, updateDialog, deleteDialog}

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
function updateDialog(id, type){
    document.querySelector("#update-dialog").showModal();
    document.querySelector("#update-form").addEventListener("submit", updateData);
}
function deleteDialog(id, type){
    document.querySelector("#delete-dialog").showModal();
    document.querySelector("#delete-form").addEventListener("submit", ()=>deleteData(id, type));
}