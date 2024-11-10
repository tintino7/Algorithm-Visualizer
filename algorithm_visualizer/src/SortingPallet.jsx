import { useState, useEffect} from "react";
import selectionSortAlgorithm from './Algorithms/selectionSort'
import experiment from './Algorithms/experiment'

import Pillar from "./assets/Pillar";


function SortingPallet(){

    const maxSize = Math.floor(window.innerWidth > 700 ? window.innerWidth / 40 : window.innerWidth / 25);
    const minSize = maxSize * 0.25;
    const screenHeight = (window.innerWidth > 700 ? window.innerHeight * 0.7 : window.innerHeight * 0.6);

    const [arraySize, setArraySize] = useState(maxSize / 2);
    const [randomize, setRandomize] = useState(true)
    const [algorithm, setAlgorithm] = useState('')
    const [animating, setAnimating] = useState(false)


    function animateSortingAlgorithm(){
       setAnimating(true)
    }
    
    
    function handleArraySizeChange(e){
        setArraySize(prevarraySize => e.target.value)
    }

         
    const [pillars, setPillars] = useState(() => {
        return Array.from({length : arraySize},(_, index) => {
            const height = Math.floor(Math.random() * (screenHeight - 50 + 1) + 50) 
            return {id : index, height : height, className : 'pillar'}
        }
        )
    })


    useEffect(() => {
        if (arraySize) {
            const newPillars = Array.from({ length: arraySize }, (_, index) => {
                const height = Math.floor(Math.random() * (screenHeight - 50 + 1) + 50);
                return { id: index, height : height, className : 'pillar' };
            });
            setPillars(newPillars); 
        }
    }, [arraySize, randomize]); // Update pillars whenever arraySize or randomize changes

    useEffect(() => {
        if(animating){
            const results =  selectionSortAlgorithm(pillars, setPillars)
            for(let i = 0; i < results.length; i++){
                const newPillar = results[i]
                const timeout = setTimeout(() => {
                    setPillars([...newPillar])
                }, 1000)
            }  
        }
       
    },[animating])



    
    return(
        <div>
            <div className="sortDiv">
                <button 
                    className="sortButton" 
                    onClick={() => setRandomize(!randomize)}
                    >
                    Randomize
                </button>

                <select 
                    className="sortButton" 
                    value={algorithm} 
                    onChange={e => setAlgorithm(e.target.value)}
                    >
                    <option value=" Select an Algorithm">Select an Algorithm</option>
                    <option value="selectionsort">Selection Sort</option>
                    <option value="Bubble Sort">Bubble Sort</option>
                    <option value="mergesort">Merge Sort</option>
                    <option value="quicksort">Quick Sort</option>
                </select>

                <div 
                    className="arrayControl"
                >
                    <p 
                        className="arrayControlText"
                        >
                            Array Size
                    </p>
                    <input 
                        type="range" 
                        name="arraySize" 
                        min={minSize} 
                        max={maxSize} 
                        value={arraySize} 
                        onChange={(e) => handleArraySizeChange(e)}
                        />
                </div>

                <div 
                    className="arrayControl"
                    >
                    <p 
                        className="arrayControlText"
                        >
                        Speed
                    </p>
                    <input 
                        type="range"
                        name="arraySize"
                        />
                </div>

                <button 
                    className="sortButton" 
                    onClick={animateSortingAlgorithm}
                    >
                    Sort
                </button>
            </div>

            <div 
                className="sortingpallet"
                >
               {pillars.map(({ id, height, className }) => (
                    <Pillar id={id} className={className} key={id} height={height} />
                ))}
            </div>

        </div>  
    )
}
export default SortingPallet