
export {sortFiveBest, sortCompMembers, sortForYouth, sortForSenior};

// make comp members array to select dropdown in create results
function sortCompMembers(memberArray){
    const compMemberArr = memberArray.filter(compMember)
    return compMemberArr;
}
function compMember(member){
    return member.comp === true;
}
function sortForYouth(resultArray){
    console.log("sorting for youth")
    const youthResults = resultArray.filter(youth)
    return youthResults;
}
function sortForSenior(resultArray){
    console.log("sorting for senior")

    const seniorResults = resultArray.filter(senior)
    return seniorResults;
}
function sortFiveBest(resultArray){
        const filterCrawl = resultArray.filter(crawl);
        const filterRygCrawl = resultArray.filter(rygcrawl);
        const filterButterfly = resultArray.filter(butterfly);
        const filterBreaststroke= resultArray.filter(breaststroke);
        
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
function youth(result){
    return result.youth === "true"
}
function senior(result){
    return result.youth != "true";
}