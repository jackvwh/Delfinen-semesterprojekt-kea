
import { response_message } from "./message.js";
export {loadCompData, loadMemberData, loadPracticeData, deleteData, createData}

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
async function deleteData(id, type){
    // delete item globally
    const url = `${endpoint}/${type}/${id}.json`;
    const response = await fetch(url, { method: "DELETE" });
        if (response.ok){
            // delete item locally
            // event.target.remove();
            response_message("SUCCESS! DATA SLETTET")

        }
        else if(!response.ok){
            response_message("ERROR: DATA IKKE SLETTET")
        }
}
function createData(event){
    event.preventDefault();
    const type = event.target.id
    console.log("form type ", type);
    
    // decide what values to get and send and reset form
    // creates member
    if(type === "create-form"){ 
        // close dialog
        document.querySelector("#create-dialog").close();
        // member input values
        const title = event.target.title.value;
        const athlete = event.target.athlete.value;
        const address = event.target.address.value;
        const mail = event.target.mail.value;
        const phone = event.target.phone.value;
        const gender = event.target.gender.value;
        const birthdate = event.target.birthdate.value;
        const active = event.target.active.value;
        const crawl = event.target.crawl.value;
        const rygcrawl = event.target.rygcrawl.value;
        const butterfly = event.target.butterfly.value;
        const breaststroke = event.target.breaststroke.value;
        // console.log("title: ", title);
        // console.log("athlete: ", athlete);
        // console.log("address: ", address);
        // console.log("mail: ", mail);
        // console.log("phone: ", phone);
        // console.log("gender: ", gender);
        // console.log("birthdate: ", birthdate);
        // console.log("active: ", active);
        // console.log("crawl: ", crawl);
        // console.log("rygcrawl: ", rygcrawl);
        // console.log("butterfly: ", butterfly);
        // console.log("breaststroke: ", breaststroke);

        memberToDB(title, athlete, address, mail, phone, gender, birthdate, active, crawl, rygcrawl, butterfly, breaststroke);

        // reset form
        document.querySelector("#create-form").reset();
    }

    else if (type === "practice-result-form"){
        // close dialog
        document.querySelector("#create-practice-result-dialog").close();
        // practice values
        const athlete = event.target.athlete.value;
        const disciplin = event.target.disciplin.value;
        const resultTime = event.target.resultTime.value;
        const date = event.target.date.value;

        // create json object and make POST request to db
        practiceResultToDB(athlete, disciplin, resultTime, date);

        // reset form
        document.querySelector("#practice-result-form").reset();
    } 
    else if (type === "comp-result-form"){
        // close dialog
        document.querySelector("#create-comp-result-dialog").close();
        // comp values
        const athlete = event.target.athlete.value;
        const disciplin = event.target.disciplin.value;
        const resultTime = event.target.resultTime.value;
        const date = event.target.date.value;
        const compName = event.target.compName.value;
        const address = event.target.address.value;

        // create json object and make POST request to db
        compResultToDB(athlete, disciplin, resultTime, date, compName, address);

        // reset form
        document.querySelector("#comp-result-form").reset();
    } 
}
async function practiceResultToDB(athlete, disciplin, resultTime, date){

    //create new object
    const practiceResult = { 
        athlete: `${athlete}`, 
        disciplin: `${disciplin}`,
        resultTime: `${resultTime}`,
        date: `${date}`,
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
            response_message("SUCCESS! TRÆNINGS RESULTAT OPRETTET");
         }
         else if(!response.ok){
             // show error message
             response_message("ERROR: TRÆNINGS RESULTAT IKKE OPRETTET");
         }
    // response with new object id/athlete
    const data = await response.json();
    // make get request to input specific element into DOM from response id
    // insertNewItem(data.athlete, "users");
}
async function compResultToDB(athlete, disciplin, resultTime, date, compName, address){
    //create new object
    const compResult = { 
        athlete: `${athlete}`, 
        disciplin: `${disciplin}`,
        resultTime: `${resultTime}`,
        date: `${date}`,
        compName: `${compName}`,
        address: `${address}`,
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
         }
         else if(!response.ok){
             // show error message
             response_message("ERROR: KONKURRENCE RESULTAT IKKE OPRETTET");
         }
    // response with new object id/athlete
    const data = await response.json();
    // make get request to input specific element into DOM from response id
    // insertNewItem(data.athlete, "users");
}
async function memberToDB(title, athlete, address, mail, phone, gender, birthdate, active, crawl, rygcrawl, butterfly, breaststroke){
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
             alert("MEMBER SUCCESSFULLY CREATED");
         }
         else if(!response.ok){
             // show error message and reload page
             alert("ERROR: MEMBER NOT CREATED");
         }
    // response with new object id/athlete
    const data = await response.json();
    // make get request to input specific element into DOM from response id
    // insertNewItem(data.athlete, "users");
}
