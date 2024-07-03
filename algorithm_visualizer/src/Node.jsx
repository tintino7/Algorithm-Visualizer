import {  useState} from "react";

function Cell({ handleStartorFinishChange, createWall, moveStartFinish, startOrFinish, wall, id}){

    const [previousClassName, setPreviousClassName] = useState('')

        

    /* Mouse is down and when i mouse over make wall */
    const handleMouseOver = (e) => {
        
        const target = e.target
        if (wall){
            if(target.className == 'wall'){
                target.className = ''
            }
            else if(target.className == ''){
                target.className = 'wall'
            }
        }
    };

    /* Make wall when i click into a cell */
    const handleClick = (e) => {
        const target = e.target
        if(target.className == 'wall'){
            target.className = ''
        }
        else if(target.className == ''){
            target.className = 'wall'
        }
    }

    /* Function to set states for wall and startorFinish */
    const handleMouseDown = (e) => {
        const target = e.target
        if(target.className === 'start' || target.className === 'finish'){
            moveStartFinish(e, target.className)
        }
        else {
            createWall(e)
        }
    }

    /* Grapped the start or finish node and entered in to a cell */
    const handleMouseEnter = (e) => {
        
        const target = e.target
        if(startOrFinish.active){
            setPreviousClassName(target.className)
            handleStartorFinishChange(target.id, startOrFinish.type)
            target.className = startOrFinish.type
        }
    }

    /* Grapped the start or finish node and left a cell */
    /* const handleMouseLeave = (e) => {
        const target = e.target
        if(startOrFinish.active && !startOrFinish.mouseLeftGrid){
            target.className = previousClassName
           console.log(previousClassName === '')
            setPreviousClassName('')   
            
        }
    } */

    

    return(
        <td 
            className={startOrFinish.startNode == id ? 'start' : startOrFinish.finishNode == id ? 'finish' : ''}
            onMouseOver={handleMouseOver}  
            onClick={handleClick} 
            onMouseDown={handleMouseDown} 
            id={id} 
            onMouseEnter={handleMouseEnter} 
            /* onMouseLeave={handleMouseLeave} */>    
        </td>
    )

}

export default Cell