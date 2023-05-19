
export {sortResults};

function sortResults(resultArray){
        const filterCrawl = resultArray.filter(crawl);
        const filterRygCrawl = resultArray.filter(rygcrawl);
        const filterButterfly = resultArray.filter(butterfly);
        const filterBreaststroke= resultArray.filter(breaststroke);
        
        const sortedCrawl = filterCrawl.sort(timeCompare);
        console.log("sorted crawl: ", sortedCrawl)
        const sortedRygCrawl = filterRygCrawl.sort(timeCompare);
        const sortedButterfly = filterButterfly.sort(timeCompare);
        const sortedBreaststroke = filterBreaststroke.sort(timeCompare);
        
        const sortedResults = sortedCrawl.concat(sortedRygCrawl, sortedButterfly, sortedBreaststroke);
        return sortedResults;
}
function crawl(result){
    console.log(result);
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