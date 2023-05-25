
import { showPracticeResultRow, showCompResultRow, showMemberRow} from "./displayFnc.js";
import { response_message } from "./message.js";
import { calcAge } from "./payment.js";
export { loadCompData, loadMemberData, loadPracticeData, deleteData, saveMemberData, createCompResults, createPracticeResults, fetchItem}

const endpoint = "https://delfin-kea-default-rtdb.firebaseio.com/"

async function loadMemberData(){
    // load member data
    const memberResponse = await fetch(`${endpoint}/members.json`);    
    const memberData = await memberResponse.json();
    const memberArray = prepareDataArray(memberData);
    return memberArray;
}
async function loadCompData(){
    // load comp results data
    const compResponse = await fetch(`${endpoint}/compResults.json`);    
    const compData = await compResponse.json();
    const compResults = prepareDataArray(compData);
    return compResults;
}
async function loadPracticeData(){
    // load practice result data
    const practiceResponse = await fetch(`${endpoint}/practiceResults.json`);    
    const practiceData = await practiceResponse.json();
    const practiceResults = prepareDataArray(practiceData);
    return practiceResults;
}
// convert Json object to object array
function prepareDataArray(dataObject){
    const dataArray = [];
    for (let key in dataObject){
        const data = dataObject[key];
        data.id = key;
        dataArray.push(data)
    }
    return dataArray;
}
async function deleteData(event){
    event.preventDefault();
    const id = event.target.dataset.id 
    const type = event.target.dataset.type
    // delete item globally
    const url = `${endpoint}/${type}/${id}.json`;
    const response = await fetch(url, { method: "DELETE" });
        if (response.ok){
            //delete locally
            document.querySelector(`#${id}`).remove();
            //show user message
            response_message("SUCCESS! DATA SLETTET")
        }
        else if(!response.ok){
            response_message("ERROR: DATA IKKE SLETTET")
        }
    document.querySelector("#delete-dialog").close();

}
function saveMemberData(event){
    event.preventDefault();
    const type = event.target.id 
    // get member input values
    const title = event.target.title.value;
    const athlete = event.target.name.value;
    const address = event.target.address.value;
    const mail = event.target.mail.value;
    const phone = event.target.phone.value;
    const gender = event.target.gender.value;
    const birthdate = event.target.birthdate.value;
    const active = event.target.active.value;
    const comp = event.target.competition.value
    const crawl = event.target.crawl.value;
    const rygcrawl = event.target.rygcrawl.value;
    const butterfly = event.target.butterfly.value;
    const breaststroke = event.target.breaststroke.value;
        //check for html request and url
        if (type === "update-form"){
            const id = event.target.dataset.id
            //delete locally
            document.querySelector(`#${id}`).remove();
            // close dialog
            document.querySelector("#update-dialog").close();
            // reset form
            document.querySelector("#update-form").reset();
            updateMemberToDB(title, athlete, address, mail, phone, gender, birthdate, active, comp, crawl, rygcrawl, butterfly, breaststroke, id)
        }
        else if (type === "create-form"){
            // close dialog
            document.querySelector("#create-dialog").close();
            // reset form
            document.querySelector("#create-form").reset();
            createMemberToDB(title, athlete, address, mail, phone, gender, birthdate, active, comp, crawl, rygcrawl, butterfly, breaststroke);   
        }
}
async function createPracticeResults(event) {
    event.preventDefault();
    // practice values
    const uid = event.target.athlete.value;
    const athlete = await getAthlete(uid);
    const athleteName = `${athlete.athlete}`;
    const disciplin = event.target.disciplin.value;
    const date = event.target.date.value;
    const youth = calcAge(athlete.birthdate) < 18 ? true : false;

    // time result
    const hours = event.target.hours.value
    const minutes = event.target.minutes.value
    const seconds = event.target.seconds.value
    const millisec = event.target.millisec.value
    const resultTime = {hour:`${hours}`, minute:`${minutes}`, second: `${seconds}`, millisec: `${millisec}`};
    console.log("result time:", resultTime);
    // create json object and makes a POST request to Database
    practiceResultToDB(uid, athleteName, disciplin, resultTime, date, youth)
    //close dialog
    document.querySelector("#create-practice-result-dialog").close()
    // reset form
    document.querySelector("#practice-result-form").reset()
}
async function createCompResults(event) {
        event.preventDefault();
        // practice values
        const uid = event.target.athlete.value;
        const athlete = await getAthlete(uid);
        const athleteName = athlete.athlete;
        const disciplin = event.target.disciplin.value;
        const date = event.target.date.value;
        const compName = event.target.compName.value;
        const address = event.target.address.value;
        const youth = calcAge(athlete.birthdate) < 18 ? true : false;

         // time result
         const hours = event.target.hours.value
         const minutes = event.target.minutes.value
         const seconds = event.target.seconds.value
         const millisec = event.target.millisec.value
         const resultTime = {hour:`${hours}`, minute:`${minutes}`, second: `${seconds}`, millisec: `${millisec}`};
    
        // create json object and makes a POST request to Database
        compResultToDB(uid, athleteName, disciplin, resultTime, date, compName, address, youth)
        //close dialog
        document.querySelector("#create-comp-result-dialog").close()
        // reset form
        document.querySelector("#comp-result-form").reset()
}
async function getAthlete(uid){
    const athleteResponse = await fetch(`${endpoint}/members/${uid}.json`)
    const athlete = await athleteResponse.json();
    return athlete;
}
async function practiceResultToDB(uid, athleteName, disciplin, resultTime, date, youth){

    //create new object
    const practiceResult = { 
        uid: `${uid}`, 
        athlete: `${athleteName}`, 
        disciplin: `${disciplin}`,
        resultTime: `${resultTime}`,
        date: `${date}`,
        youth: `${youth}`,
    };
     // make javaScript object to Json object
     const dataAsJson = JSON.stringify(practiceResult);
     // fetch reguest to POST item
     const response = await fetch(`${endpoint}/practiceResults.json`, 
         { 
                 method: "POST", 
                 body: dataAsJson 
         });
         if (response.ok){
            // response with new object id/athlete
            const data = await response.json();
            // make get request to input specific element into DOM from response id
            insertNewItem(data.name, "practiceResults");
            // show response message to user
            response_message("SUCCESS! TRÆNINGS RESULTAT OPRETTET");
         }
         else if(!response.ok){
             // show error message
             response_message("ERROR: TRÆNINGS RESULTAT IKKE OPRETTET");
         }
}
async function compResultToDB(uid, athleteName, disciplin, resultTime, date, compName, address, youth){
    //create new object
    const compResult = { 
        uid: `${uid}`,
        athlete: `${athleteName}`, 
        disciplin: `${disciplin}`,
        resultTime: `${resultTime}`,
        date: `${date}`,
        compName: `${compName}`,
        address: `${address}`,
        youth: `${youth}`
    };
     // make javaScript object to Json object
     const dataAsJson = JSON.stringify(compResult);
     // fetch reguest to POST item
     const response = await fetch(`${endpoint}/compResults.json`, 
         { 
                 method: "POST", 
                 body: dataAsJson 
         });
         if (response.ok){
            response_message("SUCCESS! KONKURRENCE RESULTAT OPRETTET");

             // response with new object id/athlete
            const data = await response.json();
            // show new comp result
            insertNewItem(data.name, "compResults");
         }
         else if(!response.ok){
             // show error message
             response_message("ERROR: KONKURRENCE RESULTAT IKKE OPRETTET");
         }
}
async function createMemberToDB(title, athlete, address, mail, phone, gender, birthdate, active, comp, crawl, rygcrawl, butterfly, breaststroke){
    //create new object
    const member = { 
        title: `${title}`, 
        athlete: `${athlete}`,
        address: `${address}`,
        mail: `${mail}`,
        phone: `${phone}`,
        gender: `${gender}`,
        birthdate: `${birthdate}`,
        active: `${active}`,
        competition: `${comp}`,
        disciplins: {
            crawl:`${crawl}`,
            rygcrawl:`${rygcrawl}`,
            butterfly:`${butterfly}`,
            breaststroke:`${breaststroke}`,
        },
    };
     // make javaScript object to Json object
     const dataAsJson = JSON.stringify(member);
     // fetch reguest to POST item
     const response = await fetch(`${endpoint}/members.json`, 
         { 
                 method: "POST", 
                 body: dataAsJson 
         });
         if (response.ok){
            // response with new object id/athlete
            const data = await response.json();
            // make get request to input specific element into DOM from response id
            insertNewItem(data.name, "members");
            //show response message to user
            response_message("MEDLEM OPRETTET!");
         }
         else if(!response.ok){
             // show error message and reload page
             response_message("ERROR: MEDLEM IKKE OPRETTET!");
         }
}
async function updateMemberToDB(title, athlete, address, mail, phone, gender, birthdate, active, comp, crawl, rygcrawl, butterfly, breaststroke, id){
    //create new object
    const member = { 
        title: `${title}`, 
        athlete: `${athlete}`,
        address: `${address}`,
        mail: `${mail}`,
        phone: `${phone}`,
        gender: `${gender}`,
        birthdate: `${birthdate}`,
        active: `${active}`,
        competition: `${comp}`,
        disciplins: {
            crawl:`${crawl}`,
            rygcrawl:`${rygcrawl}`,
            butterfly:`${butterfly}`,
            breaststroke:`${breaststroke}`,
        },
    };
     // make javaScript object to Json object
     const dataAsJson = JSON.stringify(member);
     // fetch reguest to POST item
     const response = await fetch(`${endpoint}/members/${id}.json`, 
         { 
                 method: "PUT", 
                 body: dataAsJson 
         });
         if (response.ok){
            // insert updated
            insertNewItem(id, "members");
            //delete locally
            document.querySelector(`#${id}`).remove();
            //show response message to user
            response_message("MEDLEM OPDATERET!");
         }
         else if(!response.ok){
             // show error message and reload page
             response_message("ERROR: MEDLEM IKKE OPRETTET!");
         }
}

// ----------- FETCH ITEM AND INSERT RESULTS/MEMBERS-------------------
// fetch single item from database
async function fetchItem(id, type){
    //get updated or new item from database
    const response =  await fetch(`${endpoint}/${type}/${id}.json`);
    console.log("new response:", response);
    const dataObject = await response.json();
    return dataObject;
}
//fetch and insert new item
async function insertNewItem(id, type){
    const newItem = await fetchItem(id, type);
    if (type === "practiceResults"){
        showPracticeResultRow(newItem);
    }
    else if (type === "compResults"){
        showCompResultRow(newItem);
    }
    else if (type === "members"){
        showMemberRow(newItem, "admin");
    }
}