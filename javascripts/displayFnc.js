import {calcMemberPayment } from "./payment";
export {showMemberRow, showPracticeResultRow, showCompResultRow}

function showMemberRow(memberObject){
    // make html row with member values
    const memberRow = makeMemberRow(memberObject); 

    // insert row in DOM
    document.querySelector("#member-table").insertAdjacentHTML("beforeend", memberRow);
     // add eventListener to update btn and delete-btn
     document.querySelector("#member-table tr:last-child .update-btn").addEventListener("click", () => updateMember(memberObject));
     document.querySelector("#member-table tr:last-child .delete-btn").addEventListener("click", () => deleteMember(memberObject));
    
}
function makeMemberRow(memberObject){
    const htmlRow = /*HTML*/ `
    <tr data-id=${memberObject.id}>
        <td> ${memberObject.name} </td>
        <td> ${memberObject.birthDate} </td>
        <td> ${memberObject.gender} </td>
        <td> ${memberObject.email} </td>
        <td> ${memberObject.address} </td>
        <td> ${memberObject.phone} </td>
        <td> ${memberObject.active} </td>
        <td> Beløb: ${calcMemberPayment(memberObject)} </td>
        <td> Betalt: <input type="radio"></td>
        <td style="width: 5px; padding: 0%; padding-right: 25px; padding-left: 25px;"><button class="button-styling update-btn">Update</button></td>
        <td style="width: 5px; padding: 0%; padding-left: 25px; padding-right: 25px;"><button class="button-styling delete-btn">Delete</button></td>
    </tr>
    `;
    return htmlRow;
}
function showPracticeResultRow(practiceObject){
    // make html row with member values
    const practiceRow = makePracticeResultRow(practiceObject); 

    // insert row in DOM
    document.querySelector("#member-table").insertAdjacentHTML("beforeend", practiceRow);
     // add eventListener to update btn and delete-btn
     document.querySelector("#member-table tr:last-child .update-btn").addEventListener("click", () => updatePractice(practiceObject));
     document.querySelector("#member-table tr:last-child .delete-btn").addEventListener("click", () => deletePractice(practiceObject));
    
}
function makePracticeResultRow(practiceObject){
    const htmlRow = /*HTML*/ `
    <tr data-id=${practiceObject.id}>
        <td> ${practiceObject.name} </td>
        <td> ${practiceObject.birthDate} </td>
        <td> ${practiceObject.gender} </td>
        <td> ${practiceObject.email} </td>
        <td> ${practiceObject.address} </td>
        <td> ${memberObject.phone} </td>
        <td> ${memberObject.active} </td>
        <td style="width: 5px; padding: 0%; padding-right: 25px; padding-left: 25px;"><button class="button-styling update-btn">Update</button></td>
        <td style="width: 5px; padding: 0%; padding-left: 25px; padding-right: 25px;"><button class="button-styling delete-btn">Delete</button></td>
    </tr>
    `;
    return htmlRow;
}
function showCompResultRow(compObject){
    // make html row with member values
    const compRow = makeCompResultRow(compObject); 

    // insert row in DOM
    document.querySelector("#member-table").insertAdjacentHTML("beforeend", compRow);
     // add eventListener to update btn and delete-btn
     document.querySelector("#member-table tr:last-child .update-btn").addEventListener("click", () => updateComp(compObject));
     document.querySelector("#member-table tr:last-child .delete-btn").addEventListener("click", () => deleteComp(compObject));
    
}
function makeCompResultRow(compObject){
    const htmlRow = /*HTML*/ `
    <tr data-id=${compObject.id}>
        <td> ${compObject.name} </td>
        <td> ${compObject.birthDate} </td>
        <td> ${compObject.gender} </td>
        <td> ${compObject.email} </td>
        <td> ${compObject.address} </td>
        <td> ${compObject.phone} </td>
        <td> ${memberObject.active} </td>
        <td style="width: 5px; padding: 0%; padding-right: 25px; padding-left: 25px;"><button class="button-styling update-btn">Update</button></td>
        <td style="width: 5px; padding: 0%; padding-left: 25px; padding-right: 25px;"><button class="button-styling delete-btn">Delete</button></td>
    </tr>
    `;
    return htmlRow;
}