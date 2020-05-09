//step 1. set the starting node. (this is the start node.)
//step 2. set the distances of all nodes as infinite except the starting node.
//step 3. find the neighboring nodes with the starting node.
//step 4. update the distances of neighboring nodes as 1. change their isVisited to true.
//step 5. pick any of neighboring nodes and then repeat the process. at this point, neighboring nodes are 2.
//step 6. move to any unvisited neighboring node.

/*import PriorityQueue from "../DataStructure/PriorityQueue";

export function dijkstra(grid, startNode, endNode) {
  let pq = new PriorityQueue();
  let backTrace = {};
  let times = {};
  let visitedNodes = {};
  startNode.distance = 0;
  startNode.isVisited = true;
  console.log("this is start node");
  console.log(startNode);
  pq.enqueue(startNode, startNode.distance);
  console.log("this is pq");
  console.log(pq);

  while (!pq.isEmpty()) {
    let currentNode = pq.dequeue();
    console.log("this is de queued node");
    console.log(currentNode);
    let unVisitedArray = getUnvisitedNeighborNodes(currentNode, grid);

    console.log(unVisitedArray);
    for (let neighbor of unVisitedArray) {
      console.log("entering neighbor?");
      console.log(neighbor);
      let dist = neighbor.distance + 1;
      if (dist < neighbor.distance) {
        neighbor.distance = dist;

        backTrace[neighbor] = currentNode;
        pq.enqueue([neighbor, dist]);
      }
    }

    currentNode.isVisited = true;
  }
  console.log("this is back trace");
  console.log(backTrace);
  return { backTrace };

  let path = [endNode];
  let lastStep = endNode;

  while (lastStep !== startNode) {
    path.unshift(backTrace[lastStep]);
    lastStep = backTrace[lastStep];
  }
}*/

export function dijkstra(grid, startNode, endNode) {
  const visitedNodes = [];

  if (!startNode || !endNode || startNode === endNode) {
    return false;
  }

  startNode.gDistance = 0;
  const unvisitedNodes = getAllNodes(grid);

  // !! makes sure that it's boolean value. 0 falsy, other numbers truthy.
  // so if the length is not 0, keep go into the loop.
  while (!!unvisitedNodes.length) {
    sortNodes(unvisitedNodes);
    //debugger;
    const closestNode = unvisitedNodes.shift();

    //If there is a wall, we skip it.(move to another node again.)
    if (closestNode.isWall === true) {
      continue;
    }

    //If we are trapped by walls, return visitedNode.
    if (closestNode.gDistance === Infinity) {
      return visitedNodes;
    }

    closestNode.isVisited = true;

    visitedNodes.push(closestNode);

    // now we need to get neighbors and update the distances.
    if (closestNode === endNode) {
      return visitedNodes;
    }

    updateDistance(closestNode, grid);
  }
}

function sortNodes(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.gDistance - nodeB.gDistance);
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

function updateDistance(node, grid) {
  const distanceArray = getUnvisitedNeighborNodes(node, grid);

  for (const neighbor of distanceArray) {
    //1 can be the weight of edges. we are using 1 because the weight of edge is 1.
    neighbor.gDistance = node.gDistance + 1;
    neighbor.previousNode = node;
  }

  return distanceArray;
}

function getUnvisitedNeighborNodes(node, grid) {
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
