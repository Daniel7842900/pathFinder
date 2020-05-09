/* A Star algorithm
A Star algorithm is similar to dijkstra algorithm.
The difference is A Star algorithm has heuristic distance.
heuristic distance is estimation distance between the current node
and the target(end node).
*/
export function AStar(grid, startNode, endNode) {
  // visitedNodes can be considered as close set
  const visitedNodes = [];

  // unVisitedNodes can be considered as open set.
  var unVisitedNodes = [];

  // At start node, fCost(total cost, which is g distance + h distance)
  // can be set as 0.
  startNode.fCost = 0;
  startNode.hDistance = 0;
  startNode.gDistance = 0;

  unVisitedNodes = getAllNodes(grid);

  while (!!unVisitedNodes.length) {
    sortNodes(unVisitedNodes);
    const closestNode = unVisitedNodes.shift();

    //if closest node is end node, finish A star algorithm.
    if (closestNode === endNode) {
      return visitedNodes;
    }

    if (closestNode.isWall === true) {
      continue;
    }

    //If we are trapped by walls, return visitedNode.
    if (closestNode.fCost === Infinity) {
      return visitedNodes;
    }

    closestNode.isVisited = true;

    visitedNodes.push(closestNode);

    updateDistance(closestNode, endNode, grid);
  }
}

function sortNodes(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.fCost - nodeB.fCost);
}

function updateDistance(node, endNode, grid) {
  const distanceArray = getUnvisitedNeighborNodes(node, grid);

  for (const neighbor of distanceArray) {
    let neighborHDistance = getHeuristicDistance(neighbor, endNode);
    console.log("this is heuristic distance");
    console.log(neighborHDistance);
    //1 can be the weight of edges. we are using 1 because the weight of edge is 1.
    neighbor.gDistance = node.gDistance + 1;
    neighbor.fCost = neighborHDistance + neighbor.gDistance;
    neighbor.previousNode = node;
  }

  return distanceArray;
}

//We use Manhattan distance to calculate the heuristics distance.
//Manhattan distance is only when we can move in four directions.(up, down, left, right)
function getHeuristicDistance(node, endNode) {
  const { row, col } = node;
  const neighborHDistance =
    Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);

  return neighborHDistance;
}

function getAllNodes(grid) {
  const allNodes = [];

  for (const row of grid) {
    for (const col of row) {
      allNodes.push(col);
    }
  }

  return allNodes;
}

function getUnvisitedNeighborNodes(node, grid) {
  //debugger;
  const neighborNodes = [];
  var unvisitedNeighborNodes = [];
  const { row, col } = node;

  if (row > 0) {
    neighborNodes.push(grid[row - 1][col]);
  }
  if (row < grid.length - 1) {
    neighborNodes.push(grid[row + 1][col]);
  }
  if (col > 0) {
    neighborNodes.push(grid[row][col - 1]);
  }
  if (col < grid[0].length - 1) {
    neighborNodes.push(grid[row][col + 1]);
  }

  unvisitedNeighborNodes = neighborNodes.filter(
    (neighbor) => neighbor.isVisited === false
  );

  return unvisitedNeighborNodes;
}

export function getShortestRoute(endNode) {
  const shortestRouteInOrder = [];
  let currentNode = endNode;

  if (endNode.previousNode == null) {
    return shortestRouteInOrder;
  }

  while (currentNode != null) {
    shortestRouteInOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestRouteInOrder;
}
