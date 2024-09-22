import { useState, useEffect, useMemo, useRef} from "react";
import Node from './Node.jsx'




function Check(){
    
    /* State to control width and height of grid width and height*/
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)
    const [makeWall, setMakeWall] = useState(false)
    const [startorFinish, setStartorFinish] = useState({
                                                        active : false, 
                                                        type : '', 
                                                        startNode : '',
                                                        finishNode : ''
                                                        })
    
    const [clear, setClear] = useState(true)
    /* Holds reference to the all cell Components */
    const cellElementsRef = useRef(new Map())

   /*  console.log(cellElementsRef.current) */
    

    /* I will update width and height states making a re rendering, So the grid produce cells according to the height and width */
    function handleResize(){
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    }

    
    /* I will update make wall state to create walls */
    function handleWall(e){
        setMakeWall(true)
    }


    /*  I will work when mouseup event happens and set the below states false , 
    So it won't make unnecssary walls or make start or finish node move */
   function handleMouseUp (){
    setMakeWall(false)
    setStartorFinish({...startorFinish, active : false, type : ''})
    }


    /* I will update the startorFinish state to move start of finish Cell */
    function handleStartorFinish (e, cellType){
        setStartorFinish({...startorFinish, active : true, type : cellType})
    }


    const screenHeight = useMemo(() => Math.trunc((height * 0.7) / 25), [height]);
    const screenWidth = useMemo(() => Math.trunc((width * 0.85) / 25), [width]);

    const xAxisStart = useMemo(() => Math.floor(Math.random() * screenWidth), [screenWidth]);
    const yAxisStart = useMemo(() => Math.floor(Math.random() * screenHeight), [screenHeight]);

    const xAxisFinish = useMemo(() => Math.floor(Math.random() * screenWidth), [screenWidth]);
    const yAxisFinish = useMemo(() => Math.floor(Math.random() * screenHeight), [screenHeight]);


    /* An array of Cell components represents each row in grid */
    const gridColumns = Array.from({ length: screenHeight}, (_, columnIndex) => 
        
            Array.from({ length: screenWidth}, (_, rowIndex) => 
                <Node
                    ref={(el) => cellElementsRef.current.set(`${columnIndex}-${rowIndex}`, el)}
                    /* Functions to update state variables */
                    createWall={handleWall}
                    moveStartFinish={handleStartorFinish}
                    /*  State variables passed down to child components */
                    startOrFinish={startorFinish}
                    wall={makeWall} 
                    /* Unique key and Id for each child component */
                    key={clear ? rowIndex : rowIndex + 1000} 
                    id={`${columnIndex}-${rowIndex}`}
                    updateStartorFinish = {updateStartorFinish}
                />
            )
    );   



    useEffect(() => {

        /* const tableGrid = document.getElementById('grid') */

        window.addEventListener('resize', handleResize)
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('touchend', handleMouseUp)
        /* tableGrid.addEventListener('mouseleave', handleMouseLeaveGrid)
        tableGrid.addEventListener('mouseenter', handleMouseEnterGrid) */
        
        return () => {
            window.removeEventListener('resize', handleResize)
            document.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('touchend', handleMouseUp)
            /* tableGrid.removeEventListener('mouseleave', handleMouseLeaveGrid)
            tableGrid.removeEventListener('mouseenter', handleMouseEnterGrid) */
        }
    },[width, height, startorFinish])


    /* Update the start and finish node initially */
    useEffect(()=>{
        setStartorFinish({...startorFinish, startNode : `${yAxisStart}-${xAxisStart}`, finishNode : `${yAxisFinish}-${xAxisFinish}`})
    },[width, height])


    /* function handleMouseLeaveGrid(){
        setStartorFinish({...startorFinish, mouseLeftGrid : true})
        
        console.log(startorFinish)
        
    }
 */
    /* function handleMouseEnterGrid(){    
        setStartorFinish({...startorFinish, mouseLeftGrid : false})
        
    } */

    



    function updateStartorFinish(node){
        if(startorFinish.type === 'start'){
            setStartorFinish({...startorFinish, startNode : node})
        } else if (startorFinish.type === 'finish'){
            setStartorFinish({...startorFinish, finishNode : node})
        }
    }


    
    return(
        <div>

            <div>
                <button className="gridButton" onClick={() => setClear(!clear)} >
                    clear
                </button>
                <button className="gridButton" onClick={() => cellElementsRef.current.get('0-0').className = 'wall'}>
                    change class
                </button>   
            </div>

            <table id="grid">
                <tbody>
                    {gridColumns.map((column, columnIndex) => {
                        return (
                            <tr key={clear ? columnIndex : columnIndex + 1000}>
                                {(column)}
                            </tr>
                        )
                    })}


                    {gridColumns.map((column, columnIndex) => {
                        return (
                            <tr key={clear ? columnIndex : columnIndex + 1000}>
                                {console.log(column[0].props.id)}
                            </tr>
                        )
                    })}
                </tbody>     
            </table>  
        </div>
           
    )
}


export default Check