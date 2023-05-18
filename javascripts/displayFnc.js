
import {calcMemberPayment} from "./payment.js";
import {deleteData} from "./rest-fnc.js";
export {iterateMembers, iteratePractice, iterateComps}



function iterateMembers(memberArray, caller){
    for (let member of memberArray){
        showMemberRow(member, caller);
    }
}
function iteratePractice(practiceResults){
    for (let practiceObj of practiceResults){
        showPracticeResultRow(practiceObj);
    }
}
function iterateComps(compResults){
    for (let compObj of compResults){
        showCompResultRow(compObj);
    }
}
function showMemberRow(memberObject, caller){
    // make html row with member values
    const memberRow = memberHTMLRow(memberObject); 
    let table = null;
    //check for caller
        if(caller === "admin"){
            table = "#admin-member-table";
        }
        else if(caller === "cashier"){
            table = "#cashier-member-table"
        }
    // insert row in DOM
    document.querySelector(`${table}`).insertAdjacentHTML("afterbegin", memberRow);
     // add eventListener to update btn and delete-btn
     document.querySelector(`${table} tr:first-child .update-btn`).addEventListener("click", () => updateDialog(memberObject.id));
     document.querySelector(`${table} tr:first-child .delete-btn`).addEventListener("click", () => deleteDialog(memberObject.id, "members"));
    
}
function memberHTMLRow(memberObject){
    const payment = calcMemberPayment(memberObject);
    const htmlRow = /*HTML*/ `
        <tr data-id=${memberObject.id} data-type="members">
            <td> ${memberObject.name} </td>
            <td> ${memberObject.birthdate} </td>
            <td> ${memberObject.gender} </td>
            <td> ${memberObject.email} </td>
            <td> ${memberObject.address} </td>
            <td> ${memberObject.phone} </td>
            <td> ${memberObject.active} </td>
            <td> Beløb: ${payment} </td>
            <td><input type="radio"></td>
            <td style="width: 5px; padding: 0%; padding-right: 25px; padding-left: 25px;"><button class="button-styling update-btn">Update</button></td>
            <td style="width: 5px; padding: 0%; padding-left: 25px; padding-right: 25px;"><button class="button-styling delete-btn">Delete</button></td>
        </tr>
        `;
    return htmlRow;
}
function showPracticeResultRow(practiceObject){
    // make html row with practice values
    const practiceRow = practiceResultRow(practiceObject); 
    // insert row in DOM
    document.querySelector(`#${practiceObject.disciplin}-5-best-practice`).insertAdjacentHTML("afterbegin", practiceRow);
     // add eventListener to delete-btn
     document.querySelector(`#${practiceObject.disciplin}-5-best-practice tr:first-child .delete-btn`).addEventListener("click", () => deleteDialog(practiceObject.id, "practiceResults"));
    
}
function practiceResultRow(practiceObject){
    const htmlRow = /*HTML*/ `
        <tr data-id=${practiceObject.id} data-type="practiceResults">
            <td> ${practiceObject.athlete} </td>
            <td> ${practiceObject.resultTime} </td>
            <td> ${practiceObject.date} </td>
            <td style="width: 5px; padding: 0%; padding-left: 25px; padding-right: 25px;"><button class="button-styling delete-btn">Delete</button></td>
        </tr>
        `;
    return htmlRow;
}
function showCompResultRow(compObject){
    // make html row with member values
    const compRow = compResultRow(compObject); 
    // insert row in DOM
    document.querySelector(`#${compObject.disciplin}-5-best-comp`).insertAdjacentHTML("afterbegin", compRow);
     // add eventListener to delete-btn
     document.querySelector(`#${compObject.disciplin}-5-best-comp tr:first-child .delete-btn`).addEventListener("click", () => deleteDialog(compObject.id, "compResults"));
    
}
function compResultRow(compObject){
    const htmlRow = /*HTML*/ `
    <tr data-id=${compObject.id} data-type="compResults">
        <td> ${compObject.athlete } </td>
        <td> ${compObject.compName} </td>
        <td> ${compObject.address} </td>
        <td> ${compObject.resultTime} </td>
        <td> ${compObject.date} </td>
        <td style="width: 5px; padding: 0%; padding-left: 25px; padding-right: 25px;"><button class="button-styling delete-btn">Delete</button></td>
    </tr>
    `;
    return htmlRow;
}

function updateDialog(event, object){

    document.querySelector("#update-dialog").showModal();

    // document.querySelector("#update-form").addEventListener("submit", updateData);
}
function deleteDialog(id, type){
    document.querySelector("#delete-dialog").showModal();

    document.querySelector("#delete-form").addEventListener("submit", ()=>deleteData(id, type));
}