function selectionSort(array){

    const result = []
    const length = array.length
    let minIndex = null
    let currentIndex = null

    function swap(current, minimum){
        if (current == minimum) return
        [array[current], array[minimum]] = [array[minimum], array[current]]
    }

    /* function getLength(index){
        return parseInt(array[index].props.children)
    }

    function changeClassName(index, className){
        array[index].props.className = className
    }
 */
    for (let i = 0; i<length; i++){
        minIndex = i
        for (let j = i + 1; j<length; j++){
            currentIndex = j
            
            if (array[currentIndex] < array[minIndex]){
                minIndex = j
            }
            /* changeClassName(currentIndex, 'currentPillar')
            changeClassName(minIndex, 'minimum') */
            
        }

        swap(i, minIndex)
        result.push(array)
    }

    return result
}

export default selectionSort



/* Four states of a pillar

1. minimum
2. Sorted
3. Un sorted 
4. current

*/