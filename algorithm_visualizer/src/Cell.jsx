import {  useState, useRef} from "react";

function Cell({createWall, moveStartFinish, startOrFinish, wall, id,updateStartorFinish}){

    const [myClassName, setMyClassName] = useState('') 
    const touchMap = useRef(new Map())


    /* Mouse is down and when i mouse over make wall */
    const handleMouseOver = (e) => {
        
        const target = e.target
        if (wall){
            if(target.className == 'wall'){
                setMyClassName('')
            }
            else if(target.className == ''){
                setMyClassName('wall')
            }
        }
    };


    /* Function to set states for wall and startorFinish */
    const handleMouseDown = (e) => {
        e.preventDefault()
        const target = e.target
        if(target.className === 'start' || target.className === 'finish'){
            moveStartFinish(e, target.className)
        }
        else {
            createWall(e)
            /* For that initial cell */
            setMyClassName(myClassName === 'wall'? '': 'wall')
        }
    }


    /* This is the equilant of mousedown but fro touch devices */
    function handleTouchStart(e){
        console.log(e)
        const target = e.target
        if(target.className === 'start' || target.className === 'finish'){
            moveStartFinish(e, target.className)
            console.log('startorFinish')
        }
        else {
            createWall(e)
            /* For that initial cell */
            setMyClassName(myClassName === 'wall'? '': 'wall')
            console.log('wall')
        }
    }


    /* function to make changes to the component when touch move on touch devices */
    function handleTouchMove(e){

        const touch = e.touches[0]
        const element = document.elementFromPoint(touch.clientX, touch.clientY);

        if (wall){
            if(touchMap.current.has(element.id)){
                return
            } else {
                touchMap.current.set(element.id, element.id)
                if(element.className === 'wall'){
                    element.className = ''
                } else if (element.className === ''){
                    element.className = 'wall'
                }
            }
        } else if (startOrFinish.type === 'start' || startOrFinish.type === 'finish'){
            if(startOrFinish.active){
                if(element.tagName === 'TD'){
                    updateStartorFinish(element.id)
                }
                
                console.log(element.tagName)
            }
        }
        

    }



        const handleMouseEnter = (e) => {
            /* e.preventdefault() */
            const target = e.target
            if(startOrFinish.active){
                updateStartorFinish(target.id)
            }
        }



        let NodeclassName = ''

        if(startOrFinish.startNode === id){
            NodeclassName = 'start'
        } else if (startOrFinish.finishNode === id){
            NodeclassName = 'finish'
        }
        else{
            NodeclassName = myClassName
        }

        
    return(
        <td 
            className={NodeclassName}
            onMouseOver={handleMouseOver}  
            onMouseDown={handleMouseDown} 
            onTouchStart = {handleTouchStart}
            onTouchMove = {handleTouchMove}
            onTouchEnd={e => console.log(e)}
            id={id} 
            onPointerEnter={handleMouseEnter} 
            >    
        </td>
    )

}

export default Cell
