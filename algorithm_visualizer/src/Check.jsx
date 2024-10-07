import { useState, useEffect, useMemo, useRef} from "react";
import Node from './Node.jsx'
import dijkstras from "./Algorithms/dijkstra's.js";




function Check(){
    
    /* State to control width and height of grid width and height*/
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)
    const [makeWall, setMakeWall] = useState(false)
    const [startorFinish, setStartorFinish] = useState({
                                                        active : false, 
                                                        type : '', 
                                                        startNode : '',
                                                        finishNode : '', 
                                                        })
    
    const [clear, setClear] = useState(true)
    /* Holds reference to the all cell Components */
    const cellElementsRef = useRef(new Map())

    const isAnimating = useRef(false)

   /*  console.log(cellElementsRef.current) */
    

    /* I will update width and height states making a re rendering, So the grid produce cells according to the height and width */
    function handleResize(){

        if(isAnimating.current)return;
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    }

    
    /* I will update make wall state to create walls */
    function handleWall(e){
        if(isAnimating.current)return;
        setMakeWall(true)
    }


    /*  I will work when mouseup event happens and set the below states false , 
    So it won't make unnecssary walls or make start or finish node move */
   function handleMouseUp (){
    if(isAnimating.current)return;
    setMakeWall(false)
    setStartorFinish({...startorFinish, active : false, type : ''})
    }


    /* I will update the startorFinish state to move start of finish Cell */
    function handleStartorFinish (e, cellType){
        if(isAnimating.current)return;
        setStartorFinish({...startorFinish, active : true, type : cellType})
    }


    const screenHeight = useMemo(() => Math.trunc((height * 0.7) / 25), [height]);
    const screenWidth = useMemo(() => Math.trunc((width * 0.85) / 25), [width]);

    const xAxisStart = useMemo(() => Math.floor(Math.random() * screenWidth), [screenWidth]);
    const yAxisStart = useMemo(() => Math.floor(Math.random() * screenHeight), [screenHeight]);

    const xAxisFinish = useMemo(() => Math.floor(Math.random() * screenWidth), [screenWidth]);
    const yAxisFinish = useMemo(() => Math.floor(Math.random() * screenHeight), [screenHeight]);

    console.log('rendered')

    /* An array of Cell components represents each row in grid */
    const gridColumns = Array.from({ length: screenHeight}, (_, rowIndex) => 
        
            Array.from({ length: screenWidth}, (_, columnIndex) => 
                <Node
                    ref={(el) => cellElementsRef.current.set(`${rowIndex}-${columnIndex}`, {
                                                                                            element : el, 
                                                                                            distance : Infinity, 
                                                                                            prevNode : null,
                                                                                            row : rowIndex,
                                                                                            column : columnIndex
                                                                                            })}
                    /* Functions to update state variables */
                    createWall={handleWall}
                    moveStartFinish={handleStartorFinish}
                    /*  State variables passed down to child components */
                    startOrFinish={startorFinish}
                    wall={makeWall} 
                    /* Unique key and Id for each child component */
                    key={clear ? columnIndex : columnIndex + 1000} 
                    id={`${rowIndex}-${columnIndex}`}
                    updateStartorFinish = {updateStartorFinish}
                    isAnimating={isAnimating.current}
                />
            )
    );   



    useEffect(() => {

        /* const tableGrid = document.getElementById('grid') */

        window.addEventListener('resize', handleResize)
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('touchend', handleMouseUp)
        
        
        return () => {
            window.removeEventListener('resize', handleResize)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('touchend', handleMouseUp)
           
        }
    },[width, height, startorFinish])


    /* Update the start and finish node initially */
    useEffect(()=>{
        setStartorFinish({...startorFinish, startNode : `${yAxisStart}-${xAxisStart}`, finishNode : `${yAxisFinish}-${xAxisFinish}`})
    },[width, height])


    


    function animateorderofvisitedNodes(){

        isAnimating.current = true
        console.log(gridColumns)
        console.log(cellElementsRef.current)

        cellElementsRef.current.forEach((value, key)=>{
            if (value.element){
                value.element.className = value.element.className === 'path' || value.element.className === 'find' ? '' : value.element.className
            }
            
        })


        const {orderOfVisitedNodes, distances} = dijkstras(cellElementsRef.current, startorFinish.startNode, startorFinish.finishNode, screenHeight, screenWidth)
        
        
        let index = 1
        
        const interval = setInterval(() => {
            
            cellElementsRef.current.get(orderOfVisitedNodes[index]).element.className = 'find'
            index++
            
            if (index >= orderOfVisitedNodes.length - 1) {
              clearInterval(interval);
              animatePath(distances)
              
            }
          }, 10);

          
    }

    function animatePath(distances){
        let node = startorFinish.finishNode
        
        // If we didn't found the end node || if start or finish node inside a fully closed wall
        if(distances.get(node).prevNode === null)return
          
        const interval = setInterval(() => {
            
            let previousNode = distances.get(node).prevNode
            
            cellElementsRef.current.get(previousNode).element.className = 'path'
            node = previousNode
            
            if (previousNode === startorFinish.startNode) {
              clearInterval(interval);
              isAnimating.current = false
            }
          }, 20);

          isAnimating.current = false
         
    }
    



    function updateStartorFinish(node){
        if(isAnimating.current)return;
        if(startorFinish.type === 'start'){
            setStartorFinish({...startorFinish, startNode : node})
        } else if (startorFinish.type === 'finish'){
            setStartorFinish({...startorFinish, finishNode : node})
        }
    }


    
    return(
        <div>

            <div>
                <button className="gridButton" onClick={() => !isAnimating.current ? setClear(!clear) : null} >
                    clear
                </button>
                <button className="gridButton" onClick={() => animateorderofvisitedNodes()}>
                    call dijikrists
                </button>   
            </div>

            <table id="grid">
                <tbody>
                    {gridColumns.map((row, rowIndex) => {
                        return (
                            <tr key={clear ? rowIndex : rowIndex + 1000}>
                                {(row)}
                            </tr>
                        )
                    })}

                </tbody>     
            </table>  
        </div>
           
    )
}


export default Check