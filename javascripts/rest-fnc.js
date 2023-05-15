"use strict"

export {}

const endpoint = "somestring"
const members = [];
const practiceResults = [];
const compResults = [];


async function loadData(){
    const response = await fetch(`${endpoint}/${type}.json`);    
    const data = await response.json();
    const dataArray = prepareDataArray(data);
    return dataArray;
}
// convert Json object to object array
function prepareDataArray(dataObject){
    const dataArray = [];
    for (let key in dataObject){
        const post = dataObject[key];
        post.id = key;
        dataArray.push(post)
    }
    return dataArray;
}

