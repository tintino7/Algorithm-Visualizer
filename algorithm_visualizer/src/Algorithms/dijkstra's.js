import PriorityQueue from 'js-priority-queue';

function insideGrid (node, rowLength, columnLength){

    return node.X < rowLength && node.Y < columnLength

}



function dijkstras (grid, startNode, endNode){ // grid--> hashmap, startNode---> string '0-0', endNode---> string '20-20'

    
    let visitedNodes = new Map() // All the visited Nodes
    let unvisitedNodes = grid // All the unvisited Nodes
    let distances = new Map(grid) // All the nodes and their previous nodes and distances {element : el, distance : Infinity, prevNode : null}
    let orderOfVisitedNodes = [] // The order which the nodes are visited

    let foundEndNode = false // To stop the loop when the path to endNode is found

    const priorityQueue = new PriorityQueue({
        comparator: function(a, b) { // comparator function to give priority to min value
          return a.distance - b.distance;
        }
      });

    
    priorityQueue.queue(startNode)
    unvisitedNodes.delete(startNode)
    visitedNodes.set(startNode, startNode)
    distances.set(startNode, distances.get(startNode).distance = 0)
    orderOfVisitedNodes.push(startNode)

    const changeInXDirection = [1, 0, 1, 0]
    const changeInYDirection = [0, 1, 0, 1]
      

    while(!foundEndNode && priorityQueue.length > 0){

        const currentNode = priorityQueue.dequeue()

        for (let i = 0; i < 4; i++){
            // Get neighbor coordinates
            const neighbourID = `${currentNode.X + changeInXDirection[i]}-${currentNode.Y + changeInYDirection[i]}`;
            const neighbour = unvisitedNodes.get(neighbourID);

            if(!neighbour)continue; // Skip if no neighbor exists

            const isWall = neighbour.el.className === 'wall'
            const isEndNode = neighbour.id === endNode

            // If wall or not inside grid or it is visited
            if(isWall || !insideGrid(neighbour, 1, 1) || visitedNodes.has(neighbour.id))continue; 
                
            
            if (isEndNode){
                foundEndNode = true
                orderOfVisitedNodes.push(neighbour)
                break
            } 

            let dist = currentNode.distance + 1

            priorityQueue.queue(neighbour)

            if (dist < distances.get(neighbourID).distance){
                const neighbourDistance = distances.get(neighbourID)
                neighbourDistance = {...neighbourDistance, prevNode : currentNode, distance : dist}
                distances.set(neighbourID, neighbourDistance)

            }
                 
        }

    }


    return orderOfVisitedNodes, distances
   
}