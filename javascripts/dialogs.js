import {saveMemberData, deleteData, createPracticeResults, createCompResults} from "./rest-fnc.js";
export{createCompsDialog, createMemberDialog,createPracticeDialog, updateDialog, deleteDialog}

function createPracticeDialog(){
    document.querySelector("#create-practice-result-dialog").showModal();

    document.querySelector("#practice-result-form").addEventListener("submit", createPracticeResults);
}
function createCompsDialog(){
    document.querySelector("#create-comp-result-dialog").showModal();

    document.querySelector("#comp-result-form").addEventListener("submit", createCompResults);
}
function createMemberDialog(){
    document.querySelector("#create-dialog").showModal();

    document.querySelector("#create-form").addEventListener("submit", saveMemberData);
}
function updateDialog(id){
    insertUpdateValues(id);
    document.querySelector("#update-form").setAttribute("data-id", id)
    document.querySelector("#update-form").addEventListener("submit", saveMemberData);
    document.querySelector("#update-dialog").showModal();
}
function deleteDialog(id, type){
    document.querySelector("#delete-form").setAttribute("data-type", type)
    document.querySelector("#delete-form").setAttribute("data-id", id)
    document.querySelector("#delete-form").addEventListener("submit", deleteData);  
    document.querySelector("#delete-dialog").showModal();
}
function insertUpdateValues(id){
    //current member values
    const memberInfo = document.querySelector(`#${id}`).children;
    const name = memberInfo[0].innerHTML;
    const address = memberInfo[4].innerHTML;
    const mail = memberInfo[3].innerHTML;
    //Update form inputs to insert values
    const updateForm = document.querySelector("#update-form").children;
    const nameInput = updateForm[2];
    const addressInput = updateForm[4];
    const mailInput = updateForm[6];
    //remove old values
    nameInput.setAttribute("value", "");
    addressInput.setAttribute("value", "");
    mailInput.setAttribute("value", "");
    // insert values. your welcome, member
    nameInput.setAttribute("value", name);
    addressInput.setAttribute("value", address);
    mailInput.setAttribute("value", mail);
}