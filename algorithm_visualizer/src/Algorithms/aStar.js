import PriorityQueue from 'js-priority-queue'

function insideGrid (node, rowLength, columnLength){
    return node.row < rowLength && node.column < columnLength
}

function isWall(node){
    return node.className === 'wall'
}


/* Psuedocode

A_Star:

node{
        gcost : Number,
        hcost : Number,
        fcost : Number,
        parent : String
    }

openList = All the nodes to be visited
closedList = All the nodes already visited
orderofVisitedNode = []
counter = 0

openList.add(startNode)

startNode.gcost = 0
startNode.hcost = heuristic(startNode, endNode)
startNode.fcost = openList.gcost + openList.hcost


while openList is not emty:
    currentNode = openList.dequeue
    orderofVisitedNodes.push(currentNode)

    
    for neighbours of currentNode:
        if neighbour not inside grid or iswall or is inside closedList:
            continue

        if neighbour is endNode:
            return reconstructpath()

        tentative_g_cost = currentNode.gcost + 10 

        if tentative_g_cost < neighbour.gcost or neighbour is not in openList:
            neighbour.gcost = tentative_g_cost
            neighbour.hcost = heuristic(startNode, endNode)
            neighbour.fcost = neighbour.gcost + neighbour.hcost

            neighbour.parent = currentNode

            if neighbour is not in openList:
                openList.queue(neighbour)
            
            
return []   


 */






function A_Star(grid, start, endNode, rowLength, columnLength){
    
    const openList = new PriorityQueue()        
    const closedList = new Map()
    const orderofVisitedNodes = []
    const changeInRowDirection = [0, -1, 0, 1]
    const changeInColumnDirection = [1, 0, -1, 0]
    let startNode = {
        id : start,
        gcost : 0,
        hcost : 0,
        fcost : 0
    }

    openList.comparator = (a, b) => {
        if (a.fcost === b.fcost){ // If same fcost then the one with lowest gcost
            if(a.hcost === b.hcost){ // If same gcost then one with the lowest gcost
                return a.gcost - b.gcost 
            }
            return a.hcost - b.hcost
        }
        return a.fcost - b.fcost // The one with the lowest fcost
    } 

    openList.queue(startNode)
    startNode.gcost = 0
    startNode.hcost = heuristic(startNode, endNode)
    startNode.fcost = openList.gcost + openList.hcost


    while(openList.length > 0){
        const currentNode = openList.dequeue()
        const currentNodeDetails = grid.get(currentNode.id)
        orderofVisitedNodes.push(currentNode.id)
        closedList.set(currentNode.id, currentNode.id)


        for(let i = 0; i < 4; i++){
            const neighbour = `${currentNodeDetails.row + changeInRowDirection[i]}-${currentNodeDetails.column + changeInColumnDirection[i]}`
            const neighbourDetails = grid.get(neighbour)

            if (!insideGrid(neighbourDetails, rowLength, columnLength) || isWall(neighbourDetails) || closedList.has(neighbour)){
                continue
            }
        }


    }

    
}