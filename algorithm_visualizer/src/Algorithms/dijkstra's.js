
function isInsideGrid (nodeId, rowLength, columnLength){

    let [rowIndex, columnIndex] = nodeId.split('-')
    return parseInt(rowIndex) < rowLength && parseInt(columnIndex) < columnLength

}



function dijkstras (grid, startNode, endNode){

    let visitedNodes = new Map // All the visited Nodes
    let unvisitedNodes = grid // All the unvisited Nodes
    let distances = new Map // All the nodes and their previous nodes
    let orderOfVisitedNodes = [] // The order which the nodes are visited

    let foundEndNode = false // To stop the loop when the path to endNode is found




    while(!foundEndNode){

    }



   /*  distance => Map({'0-0': '0-1'}---->{'0-1': '0-2'}----->{0-4 : 0-6})

       visitedNodes => Map({'0-0'}, {0-1}, {0-5}), 

       visitedNode.set(currentNode.id)
   */


       /* 
       visitedNodes.push(unvisitedNode.get(startNode))
       currentNode = unvisitedNodes.pop(startNode)

       for neighbour in currentNode

            if distances.get(neighbour)

       
       */
}