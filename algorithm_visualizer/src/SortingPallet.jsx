import { useState, useEffect, useMemo, useRef} from "react";


function SortingPallet(){

    const maxSize = Math.floor((window.innerWidth) / 40);
    const minSize = maxSize * 0.25;
    const screenHeight = window.innerHeight * 0.7;
    const [arraySize, setArraySize] = useState(maxSize / 2);
    const [radomize, setRandomize] = useState(true)
   
    const pillarsArray = Array.from({length : arraySize},(_, index) => {
        const height = Math.floor(Math.random() * (screenHeight - 50 + 1) + 50)
        return (
            <div 
                id={index} 
                className="pillar" 
                key={index}
                style={{height : height}}> 
                {height}
            </div>
        )
    }
    )

    
    return(
        <div>
            <div className="sortDiv">
                <button className="sortButton" onClick={() => setRandomize(!radomize)}>
                    Randomize
                </button>
                <select className="sortButton" /* value={algorithm} onChange={e => setAlgorithm(e.target.value)} */>
                    <option value=" Select an Algorithm">Select an Algorithm</option>
                    <option value="selectionsort">Selection Sort</option>
                    <option value="Bubble Sort">Bubble Sort</option>
                    <option value="mergesort">Merge Sort</option>
                    <option value="quicksort">Quick Sort</option>
                </select>
                <input type="range" name="arraySize"/>
            </div>
            <div className="sortingpallet">
               {pillarsArray}
            </div>
        </div> 
    )
}
export default SortingPallet