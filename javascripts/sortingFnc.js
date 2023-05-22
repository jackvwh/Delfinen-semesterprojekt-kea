
export {sortResults,compMembers};

// make comp members array to select dropdown in create results
function compMembers(memberArray){
    const compMemberArr = memberArray.filter(compMember)
    console.log("compMembers: ", compMemberArr);
    return compMemberArr;
}
function compMember(member){
    return member.comp === true;
}
function sortResults(resultArray, userInput){

    if (userInput === "youth"){
        const youthArray = resultArray.filter(filterForYouth)

        const filterCrawl = youthArray.filter(crawl);
        const filterRygCrawl = youthArray.filter(rygcrawl);
        const filterButterfly = youthArray.filter(butterfly);
        const filterBreaststroke= youthArray.filter(breaststroke);
        
        const sortedCrawl = filterCrawl.sort(timeCompare);
        const sortedRygCrawl = filterRygCrawl.sort(timeCompare);
        const sortedButterfly = filterButterfly.sort(timeCompare);
        const sortedBreaststroke = filterBreaststroke.sort(timeCompare);

        // 5 best swimmers
        const bestCrawl = sortedCrawl.slice(0, 5) 
        const bestRygCrawl = sortedRygCrawl.slice(0, 5) 
        const bestButterfly = sortedButterfly.slice(0, 5) 
        const bestBreaststroke = sortedBreaststroke.slice(0, 5) 
        
        const sortedBestResults = bestCrawl.concat(bestRygCrawl, bestButterfly, bestBreaststroke);
        return sortedBestResults;
    }
    else {
        const seniorArray = resultArray.filter(filterForSenior)

        const filterCrawl = seniorArray.filter(crawl);
        const filterRygCrawl = seniorArray.filter(rygcrawl);
        const filterButterfly = seniorArray.filter(butterfly);
        const filterBreaststroke= seniorArray.filter(breaststroke);
        
        const sortedCrawl = filterCrawl.sort(timeCompare);
        const sortedRygCrawl = filterRygCrawl.sort(timeCompare);
        const sortedButterfly = filterButterfly.sort(timeCompare);
        const sortedBreaststroke = filterBreaststroke.sort(timeCompare);

        // 5 best swimmers
        const bestCrawl = sortedCrawl.slice(0, 5) 
        const bestRygCrawl = sortedRygCrawl.slice(0, 5) 
        const bestButterfly = sortedButterfly.slice(0, 5) 
        const bestBreaststroke = sortedBreaststroke.slice(0, 5) 
        
        const sortedBestResults = bestCrawl.concat(bestRygCrawl, bestButterfly, bestBreaststroke);
        return sortedBestResults;
    }
}
function crawl(result){
    return result.disciplin === "crawl";
}
function rygcrawl(result){
    return result.disciplin === "rygcrawl";
}
function butterfly(result){
    return result.disciplin === "butterfly";
}
function breaststroke(result){
    return result.disciplin === "breaststroke";
}
function timeCompare(result1, result2){
    return result1.resultTime > result2.resultTime ? -1
         : result1.resultTime < result2.resultTime ? 1
         : 0;
}
function filterForSenior(result){
    return result
}