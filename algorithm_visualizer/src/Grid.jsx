import { useState, useEffect, useMemo} from "react";
import Node from './Node.jsx'


function Grid(){
    
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

    /* I will update width and height states making a re rendering, 
    So the grid produce cells according to the height and width */
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
    const gridColumns = Array.from({ length: Math.trunc((height*0.7)/25)}, (_, columnIndex) => 
        <tr key={columnIndex}>
            {Array.from({ length: Math.trunc((width*0.85)/25)}, (_, rowIndex) => 

                <Node
                    /* Functions to update state variables */
                    createWall={handleWall}
                    moveStartFinish={handleStartorFinish}
                    /*  State variables passed down to child components */
                    startOrFinish={startorFinish}
                    wall={makeWall} 
                    /* Unique key and Id for each child component */
                    key={rowIndex} 
                    id={`${columnIndex}-${rowIndex}`}
                    updateStartorFinish = {updateStartorFinish}
                />
            )}
        </tr>);   



    useEffect(() => {

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


   
    function updateStartorFinish(node){
        if(startorFinish.type === 'start'){
            setStartorFinish({...startorFinish, startNode : node})
        } else if (startorFinish.type === 'finish'){
            setStartorFinish({...startorFinish, finishNode : node})
        }
    }

    
    return(
        <table id="grid">
            <tbody>
                {gridColumns}
            </tbody>     
        </table>     
    )
}


export default Grid