import { useState, useMemo, useRef} from "react";
import { motion } from "framer-motion";
import selectionSort from './Algorithms/selectionSort'
import experiment from './Algorithms/experiment'


function SortingPallet(){

    const maxSize = Math.floor(window.innerWidth > 700 ? window.innerWidth / 40 : window.innerWidth / 25);
    const minSize = maxSize * 0.25;
    const screenHeight = (window.innerWidth > 700 ? window.innerHeight * 0.7 : window.innerHeight * 0.6);
    const [arraySize, setArraySize] = useState(maxSize / 2);
    const [radomize, setRandomize] = useState(true)
    const springAnim = {
        type: "spring",
        damping: 20,
        stiffness: 300
    };

    
      
    const pillarsArrayValues = []
    const pillarsArray = Array.from({length : arraySize},(_, index) => {
        const height = Math.floor(Math.random() * (screenHeight - 50 + 1) + 50)
        pillarsArrayValues.push({ height : height, id : index})
        return (
            <motion.div 
                id={index} 
                className="pillar" 
                layout transition={springAnim}
                key={index}
                style={{height : height}}> 
                {height}
            </motion.div>
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
                <div className="arrayControl">
                    <p className="arrayControlText">Array Size</p>
                    <input type="range" name="arraySize" min={minSize} max={maxSize} value={arraySize} onChange={(e) => setArraySize(e.target.value)} />
                </div>
                <div className="arrayControl">
                    <p className="arrayControlText">Speed</p>
                    <input type="range" name="arraySize"/>
                </div>
                <button className="sortButton" onClick={() => {
                    experiment(pillarsArrayValues)
                }}>
                    Sort
                </button>
            </div>
            <div className="sortingpallet">
               {pillarsArray}
            </div>
        </div> 
    )
}
export default SortingPallet