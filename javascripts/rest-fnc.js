export {loadCompData, loadMemberData, loadPracticeData, deleteData}

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

async function deleteData(event, object){
    const id = object.dataset.id;
    const type = object.dataset.type;
    // delete item globally
    const url = `${endpoint}/${type}/${id}.json`;
    const response = await fetch(url, { method: "DELETE" });
        if (response.ok){
            // delete item locally
            event.target.remove();
            alert("SUCCESFULLY DELETED")

        }
        else if(!response.ok){
            alert("ERROR: error deleting ITEM")
        }

}

