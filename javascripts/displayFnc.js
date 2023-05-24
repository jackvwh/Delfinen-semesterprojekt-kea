
import {calcMemberPayment, calcTotalIncome} from "./payment.js";
import {deleteDialog, updateDialog } from "./dialogs.js";
import {sortFiveBest} from "./sortingFnc.js";
export {iterateMembers, iteratePractice, iterateComps, showCompResultRow, showPracticeResultRow, showMemberRow, insertCompMembers, insertTotalIncome}

function insertCompMembers(compArray){
    document.querySelector("#selectAthletePractice").innerHTML = "";
    document.querySelector("#selectAthleteComp").innerHTML = "";

    for (let memberObject of compArray){
        const htmlOption = /*HTML*/ `
        <option value=${memberObject.id}>${memberObject.athlete}</option> 
        `;
        document.querySelector("#selectAthletePractice").insertAdjacentHTML("beforeend", htmlOption);
        document.querySelector("#selectAthleteComp").insertAdjacentHTML("beforeend", htmlOption);
    }
}
function insertTotalIncome(memberArray){
    const totalIncome = calcTotalIncome(memberArray);
    document.querySelector("#total-income").textContent = "Ialt: " + totalIncome + " kr";
}
function iterateMembers(memberArray, caller){
    clearMembers(caller);
    displayMemberTableHeader(caller);
    for (let member of memberArray){
        showMemberRow(member, caller);
    }
}
function iteratePractice(practiceResults){
    clearResults("practice");
    displayTableHeaderPractice();
    const sortedResults = sortFiveBest(practiceResults);
    for (let practiceObj of sortedResults){
        showPracticeResultRow(practiceObj);
    }
}
function iterateComps(compResults){
    clearResults("comp");
    displayTableHeaderComp();
    const sortedResults = sortFiveBest(compResults);
    for (let compObj of sortedResults){
        showCompResultRow(compObj);
    }
}
function clearResults(type){
    document.querySelector(`#crawl-5-best-${type}`).innerHTML = "";
    document.querySelector(`#rygcrawl-5-best-${type}`).innerHTML = "";
    document.querySelector(`#butterfly-5-best-${type}`).innerHTML = "";
    document.querySelector(`#breaststroke-5-best-${type}`).innerHTML = "";
}
function clearMembers(caller){
    document.querySelector(`#${caller}-member-table`).innerHTML = "";
}
function displayMemberTableHeader(caller){
    if (caller === "admin"){
        const memberRowHeader = /*HTML*/ `
        <thead class="tableFixedHeader">
            <tr>
                <th>Medlem</th>
                <th>Fødselsdato</th>
                <th>Køn</th>
                <th>Email</th>
                <th style="width: 350px;">Adresse</th>
                <th>Telefon</th>
                <th>Aktivt medlem</th>
                <th>Beløb</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        `;
     // insert row in DOM
     document.querySelector("#admin-member-table").insertAdjacentHTML("afterbegin", memberRowHeader);
    }
    else if (caller === "cashier"){
        const memberRowHeader = /*HTML*/ `
        <thead class="tableFixedHeader">
            <tr>
                <th>Medlem</th>
                <th>Dødselsdato</th>
                <th>Køn</th>
                <th>Email</th>
                <th style="width: 350px;">Adresse</th>
                <th>Telefon</th>
                <th>Aktivt medlem</th>
                <th>Beløb</th>
                <th>Betalt</th>
            </tr>
        </thead>
        `;
     // insert row in DOM
     document.querySelector("#cashier-member-table").insertAdjacentHTML("afterbegin", memberRowHeader);
    }
    
}
function displayTableHeaderComp(){
    const disciplins = ["crawl", "rygcrawl", "butterfly", "breaststroke"]
        for (let disciplin of disciplins){
            const compRowHeader = /*HTML*/ `
                <thead class="tableFixedHeader">
                    <tr>
                        <th><h2>${disciplin.toUpperCase()}</h2></th>
                        <th>Medlem</th>
                        <th>Stævne navn</th>
                        <th style="width: 350px;"> Stævne sted </th>
                        <th>Resultat tid:</th>
                        <th>Dato</th>
                        <th></th>
                    </tr>
                </thead>
            `;
            // insert table header in DOM
            document.querySelector(`#${disciplin}-5-best-comp`).insertAdjacentHTML("beforeend", compRowHeader);
    }
}
function displayTableHeaderPractice(){
    const disciplins = ["crawl", "rygcrawl", "butterfly", "breaststroke"]
        for (let disciplin of disciplins){
            const practiceRowHeader = /*HTML*/ `
                <thead class="tableFixedHeader">
                    <tr>
                        <th><h2>${disciplin.toUpperCase()}</h2></th>
                        <th>Medlem</th>
                        <th>Resultat tid:</th>
                        <th>Dato</th>
                        <th></th>
                    </tr>
                </thead>
            `;
            // insert table header in DOM
            document.querySelector(`#${disciplin}-5-best-practice`).insertAdjacentHTML("beforeend", practiceRowHeader);
    }
}
function showMemberRow(memberObject, caller){
    //check for caller
    if(caller === "admin"){
        const memberRow = makeMemberHTMLRowAdmin(memberObject); 
        // insert row in DOM
        document.querySelector("#admin-member-table").insertAdjacentHTML("afterbegin", memberRow);
        // add eventListener to update btn and delete-btn
        document.querySelector(`#admin-member-table tr:first-child .update-btn`).addEventListener("click", () => updateDialog(memberObject.id))
        document.querySelector(`#admin-member-table tr:first-child .delete-btn`).addEventListener("click", () => deleteDialog(memberObject.id, "members"));
    }
    else if(caller === "cashier"){
        const memberRow = makeMemberHTMLRowCashier(memberObject); 
        // insert row in DOM
        document.querySelector(`#cashier-member-table`).insertAdjacentHTML("afterbegin", memberRow);

        //"tick" off checkbox of if paid or NOT paid
        if(memberObject.paid === "true"){
            document.querySelector(`#${memberObject.id} input`).setAttribute("checked", "");
        }
    }  
}
function makeMemberHTMLRowAdmin(memberObject){
    const payment = calcMemberPayment(memberObject);
    const htmlRow = /*HTML*/ `
        <tr id=${memberObject.id}>
            <td> ${memberObject.athlete} </td>
            <td> ${memberObject.birthdate} </td>
            <td> ${memberObject.gender} </td>
            <td> ${memberObject.mail} </td>
            <td> ${memberObject.address} </td>
            <td> ${memberObject.phone} </td>
            <td> ${memberObject.active} </td>
            <td> Beløb: ${payment} </td>
            <td style="width: 5px; padding: 0%; padding-right: 25px; padding-left: 25px;"><button class="button-styling update-btn">Update</button></td>
            <td style="width: 5px; padding: 0%; padding-left: 25px; padding-right: 25px;"><button class="button-styling delete-btn">Delete</button></td>
        </tr>
        `;
    return htmlRow;
}
function makeMemberHTMLRowCashier(memberObject){
    const payment = calcMemberPayment(memberObject);
    const htmlRow = /*HTML*/ `
        <tr id=${memberObject.id}>
            <td> ${memberObject.athlete} </td>
            <td> ${memberObject.birthdate} </td>
            <td> ${memberObject.gender} </td>
            <td> ${memberObject.mail} </td>
            <td> ${memberObject.address} </td>
            <td> ${memberObject.phone} </td>
            <td> ${memberObject.active} </td>
            <td> Beløb: ${payment} </td>
            <td><input type="checkbox"></td>
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
        <tr id=${practiceObject.id}>
            <td>1. </td>
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
    const compRow = makeCompResultRow(compObject); 
    // insert row in DOM
    document.querySelector(`#${compObject.disciplin}-5-best-comp`).insertAdjacentHTML("afterbegin", compRow);
     // add eventListener to delete-btn
     document.querySelector(`#${compObject.disciplin}-5-best-comp tr:first-child .delete-btn`).addEventListener("click", ()=>deleteDialog(compObject.id, "compResults"));
    
}
function makeCompResultRow(compObject){
    const htmlRow = /*HTML*/ `
    <tr id=${compObject.id}>
        <td>1. </td>
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