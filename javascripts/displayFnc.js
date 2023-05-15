"user strict"

// TO DO 

export {showMemberRow, makeMemberRow}

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
        <td> Beløb: ${calcPayment(memberObject)} </td>
        <td> Betalt: <input type="radio"></td>
        <td style="width: 5px; padding: 0%; padding-right: 25px; padding-left: 25px;"><button class="button-styling update-btn">Update</button></td>
        <td style="width: 5px; padding: 0%; padding-left: 25px; padding-right: 25px;"><button class="button-styling delete-btn">Delete</button></td>
    </tr>
    `;
    return htmlRow;
}