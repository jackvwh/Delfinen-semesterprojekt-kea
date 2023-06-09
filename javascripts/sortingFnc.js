export {sortFiveBest, sortCompMembers, sortForYouth, sortForSenior, sortByPaid, sortForActive};

function sortByPaid(memberArray) {
    const selectedValue = document.querySelector("#sort-payments").value;

        if (selectedValue === "paid") {
        const paidFirst = memberArray.filter(paid);
            return paidFirst;
        } else if (selectedValue === "unpaid") {
            const unpaidFirst = memberArray.filter(unpaid);
            return unpaidFirst;  
        }
        else if (selectedValue === "all") {
            return memberArray;
        }
}
function unpaid(memberObject){
    return memberObject.paid === "false";
}
function paid(memberObject){
    return memberObject.paid === "true";
}
// make comp members array to select dropdown in create results
function sortCompMembers(memberArray){
    const compMemberArr = memberArray.filter(compMember)
    return compMemberArr;
}
function compMember(member){
    return member.comp === "true";
}
function sortFiveBest(resultArray){
        const filterCrawl = resultArray.filter(crawl);
        const filterRygCrawl = resultArray.filter(rygcrawl);
        const filterButterfly = resultArray.filter(butterfly);
        const filterBreaststroke= resultArray.filter(breaststroke);
        
        const sortedCrawl = filterCrawl.sort(timeCompareObj);
        const sortedRygCrawl = filterRygCrawl.sort(timeCompareObj);
        const sortedButterfly = filterButterfly.sort(timeCompareObj);
        const sortedBreaststroke = filterBreaststroke.sort(timeCompareObj);

        // 5 best swimmers
        const bestCrawl = sortedCrawl.slice(0, 5) 
        const bestRygCrawl = sortedRygCrawl.slice(0, 5) 
        const bestButterfly = sortedButterfly.slice(0, 5) 
        const bestBreaststroke = sortedBreaststroke.slice(0, 5) 
        
        const sortedBestResults = bestCrawl.concat(bestRygCrawl, bestButterfly, bestBreaststroke);
        return sortedBestResults.reverse(); // REVERSE MTHFCKR!!!
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
function timeCompareObj(result1, result2){
    return +result1.resultTime.hours - +result2.resultTime.hours !== 0
    ? +result1.resultTime.hours - +result2.resultTime.hours
    : +result1.resultTime.minutes - +result2.resultTime.minutes !== 0
    ? +result1.resultTime.minutes - +result2.resultTime.minutes
    : +result1.resultTime.seconds - +result2.resultTime.seconds !== 0
    ? +result1.resultTime.seconds - +result2.resultTime.seconds
    : +result1.resultTime.millisec - +result2.resultTime.millisec;
}
function sortForYouth(resultArray){
    const youthResults = resultArray.filter(youth)
    return youthResults;
}
function sortForSenior(resultArray){
    const seniorResults = resultArray.filter(senior)
    return seniorResults;
}
function youth(result){
    return result.youth === "true";
}
function senior(result){
    return result.youth != "true";
}
function sortForActive(memberArray){
    
    const selectedValue = document.querySelector("#sort-active").value;

        if (selectedValue === "active") {
        const activeMembers = memberArray.filter(active);
            return activeMembers;
        } else if (selectedValue === "passive") {
            const passiveMembers = memberArray.filter(passive);
            return passiveMembers;  
        }
        else if (selectedValue === "all") {
            return memberArray;
        }
}
function active(result){
    return result.active === "true";
}
function passive(result){
    return result.active !== "true";
}