

function selectionSortAlgorithm(pillars, setPillars){
  
    let minimumIndex = null
    let interval = 0
    let currntIndex = null
    const pillarsLength = pillars.length
    const newPillars = [...pillars]
    const resultsArray = []
    
    function switchPillarsPosition(outerIndex, minimumIndex){
        [newPillars[minimumIndex], newPillars[outerIndex]] = [newPillars[outerIndex], newPillars[minimumIndex]]
    }

    function animateIteration(currentIndex, previousIndex){
        newPillars[currentIndex].className = 'currentPillar'
        newPillars[previousIndex].className = 'pillar'
        resultsArray.push(JSON.parse(JSON.stringify(newPillars)))
    }

    // Set first node as minimum
    newPillars[0].className = 'minimum'
    resultsArray.push(JSON.parse(JSON.stringify(newPillars)))
    
    
    for(let outerIndex = 0; outerIndex < pillarsLength; outerIndex++){
        minimumIndex = outerIndex
        for(let innerIndex = outerIndex + 1; innerIndex < pillarsLength; innerIndex++){
            currntIndex = innerIndex
            animateIteration(currntIndex, currntIndex - 1)
            if(newPillars[currntIndex].height < newPillars[minimumIndex].height){
                minimumIndex = currntIndex
            }
        }
        switchPillarsPosition(outerIndex, minimumIndex)
    }
 

    return resultsArray
}


export default selectionSortAlgorithm

/* Four states of a pillar

1. minimum
2. Sorted
3. Un sorted 
4. current

*/