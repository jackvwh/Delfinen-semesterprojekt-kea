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
        <td> ${memberObject.disciplin} </td>
        <td> ${memberObject.resultTime} </td>
        <td> ${memberObject.date} </td>
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
     // add eventListener to delete-btn
     document.querySelector("#member-table tr:last-child .delete-btn").addEventListener("click", () => deletePractice(practiceObject));
    
}
function makePracticeResultRow(practiceObject){
    const htmlRow = /*HTML*/ `
    <tr data-id=${practiceObject.id}>
        <td> ${memberObject.disciplin} </td>
        <td> ${memberObject.name} </td>
        <td> ${memberObject.resultTime} </td>
        <td> ${memberObject.date} </td>
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
     // add eventListener to delete-btn
     document.querySelector("#member-table tr:last-child .delete-btn").addEventListener("click", () => deleteComp(compObject));
    
}
function makeCompResultRow(compObject){
    const htmlRow = /*HTML*/ `
    <tr data-id=${compObject.id}>
        <td> ${memberObject.disciplin} </td>
        <td> ${memberObject.name} </td>
        <td> ${memberObject.competition} </td>
        <td> ${memberObject.place} </td>
        <td> ${memberObject.resultTime} </td>
        <td> ${memberObject.date} </td>
        <td style="width: 5px; padding: 0%; padding-left: 25px; padding-right: 25px;"><button class="button-styling delete-btn">Delete</button></td>
    </tr>
    `;
    return htmlRow;
}