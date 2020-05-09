export function AStar(grid, startNode, endNode) {
  // debugger;
  const visitedNodes = [];
  var unVisitedNodes = [];

  startNode.fCost = 0;
  startNode.hDistance = 0;
  startNode.distance = 0;

  unVisitedNodes = getAllNodes(grid);

  while (!!unVisitedNodes.length) {
    sortNodes(unVisitedNodes);
    const closestNode = unVisitedNodes.shift();

    if (closestNode === endNode) {
      return visitedNodes;
    }

    if (closestNode.isWall === true) {
      continue;
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
    //debugger;
    let neighborHDistance = getHeuristicDistance(neighbor, endNode);
    console.log("this is heuristic distance");
    console.log(neighborHDistance);
    //1 can be the weight of edges. we are using 1 because the weight of edge is 1.
    neighbor.distance = node.distance + 1;
    neighbor.fCost = neighborHDistance + neighbor.distance;
    neighbor.previousNode = node;
  }

  return distanceArray;
}

//We use Manhattan distance to calculate the heuristics distance.
//Manhattan distance is only when we can move in four directions.(up, down, left, right)
function getHeuristicDistance(node, endNode) {
  //debugger;
  const { row, col } = node;
  console.log(row);
  console.log(col);
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
  while (currentNode != null) {
    shortestRouteInOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestRouteInOrder;
}
