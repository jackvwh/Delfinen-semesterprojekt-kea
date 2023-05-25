import { response_message } from "./message.js";

export function search_data(memberArray){
    // search INPUT string
    const searchInput = document.querySelector("#search-input").value;
    // make Regular Expression search VALUE - i for case insensetiv
    const searchValue = new RegExp(`${searchInput}`, "i")
    
    // ------------ SEARCH WITH .FILTER() FROM GLOBAL ARRAY items[] -----------------
    const search_results = memberArray.filter(search_item);
        // search through json object properties 
        function search_item(dataItem){
            for (let key in dataItem){
                if (searchValue.test(dataItem[key])){
                    return dataItem;
                }  
            }  
        }  
    // SHOW search result if any
    if (search_results.length >= 1){
        return search_results;
    }
    else {
        response_message("INTET RESULTAT");
        return memberArray;
    }
}