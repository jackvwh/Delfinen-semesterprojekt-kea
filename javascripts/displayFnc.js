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
    const memberRow = makeMemberHTMLRow(memberObject); 
    let table = null;
    //check for caller
    if(caller === "admin"){
        table = "#admin-member-table";
    }
    else if(caller === "cashier"){
        table = "#cashier-member-table"
    }
    // insert row in DOM
    document.querySelector(`${table}`).insertAdjacentHTML("beforeend", memberRow);
     // add eventListener to update btn and delete-btn
     document.querySelector(`${table} tr:last-child .update-btn`).addEventListener("click", () => updateMember(memberObject));
     document.querySelector(`${table} tr:last-child .delete-btn`).addEventListener("click", () => deleteMember(memberObject));
    
}
function makeMemberHTMLRow(memberObject){
    const htmlRow = /*HTML*/ `
    <tr data-id=${memberObject.id}>
        <td> ${memberObject.name} </td>
        <td> ${memberObject.birthdate} </td>
        <td> ${memberObject.gender} </td>
        <td> ${memberObject.email} </td>
        <td> ${memberObject.address} </td>
        <td> ${memberObject.phone} </td>
        <td> ${memberObject.active} </td>
        <td> Beløb: unkown </td>
        <td><input type="radio"></td>
        <td style="width: 5px; padding: 0%; padding-right: 25px; padding-left: 25px;"><button class="button-styling update-btn">Update</button></td>
        <td style="width: 5px; padding: 0%; padding-left: 25px; padding-right: 25px;"><button class="button-styling delete-btn">Delete</button></td>
    </tr>
    `;
    return htmlRow;
}
function showPracticeResultRow(practiceObject){
    // make html row with practice values
    const practiceRow = makePracticeResultRow(practiceObject); 
    // insert row in DOM
    document.querySelector(`#${practiceObject.disciplin}-5-best-practice`).insertAdjacentHTML("beforeend", practiceRow);
     // add eventListener to delete-btn
     document.querySelector(`#${practiceObject.disciplin}-5-best-practice tr:last-child .delete-btn`).addEventListener("click", () => deletePractice(practiceObject));
    
}
function makePracticeResultRow(practiceObject){
    const htmlRow = /*HTML*/ `
    <tr data-id=${practiceObject.id}>
        <td> ${practiceObject.memberUid} </td>
        <td> ${practiceObject.resultTime} </td>
        <td> ${practiceObject.date} </td>
        <td style="width: 5px; padding: 0%; padding-left: 25px; padding-right: 25px;"><button class="button-styling delete-btn">Delete</button></td>
    </tr>
    `;
    return htmlRow;
}
function showCompResultRow(compObject){
    // make html row with member values
    const compRow = makeCompResultRow(compObject); 
    // insert row in DOM
    document.querySelector(`#${compObject.disciplin}-5-best-comp`).insertAdjacentHTML("beforeend", compRow);
     // add eventListener to delete-btn
     document.querySelector(`#${compObject.disciplin}-5-best-comp tr:last-child .delete-btn`).addEventListener("click", () => deleteComp(compObject.id));
    
}
function makeCompResultRow(compObject){
    const htmlRow = /*HTML*/ `
    <tr data-id=${compObject.id}>
        <td> ${compObject.disciplin} </td>
        <td> ${compObject.memberUid } </td>
        <td> ${compObject.competition} </td>
        <td> ${compObject.place} </td>
        <td> ${compObject.resultTime} </td>
        <td> ${compObject.date} </td>
        <td style="width: 5px; padding: 0%; padding-left: 25px; padding-right: 25px;"><button class="button-styling delete-btn">Delete</button></td>
    </tr>
    `;
    return htmlRow;
}