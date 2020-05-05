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

  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  // console.log("this is unvisited nodes.");
  // console.log(unvisitedNodes);

  // !! makes sure that it's boolean value. 0 falsy, other numbers truthy.
  // so if the length is not 0, keep go into the loop.
  while (!!unvisitedNodes.length) {
    //debugger;
    sortNodes(unvisitedNodes);
    // console.log("this is the first unvisited node.");
    // console.log(unvisitedNodes[0]);
    const closestNode = unvisitedNodes.shift();

    //If there is a wall, we skip it.(move to another node again.)
    if (closestNode.isWall === true) {
      continue;
    }

    //If we are trapped by walls, return visitedNode.
    if (closestNode.distance === Infinity) {
      return visitedNodes;
    }
    // console.log("This is the closest Node");
    // console.log(closestNode);

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
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
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
  //debugger;
  // console.log("this is distance Array");
  // console.log(distanceArray);

  for (const neighbor of distanceArray) {
    //1 can be the weight of edges. we are using 1 because the weight of edge is 1.
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
    // console.log("this is one of neighbors");
    // console.log(neighbor);
  }

  return distanceArray;
}

function getUnvisitedNeighborNodes(node, grid) {
  //console.log("this is neighborNodes");

  const neighborNodes = [];
  var unvisitedNeighborNodes = [];
  const { row, col } = node;
  //console.log(node);
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
  // console.log("is this empty?");
  // console.log(neighborNodes);
  unvisitedNeighborNodes = neighborNodes.filter(
    (neighbor) => neighbor.isVisited === false
  );
  // console.log("unvisited neighbor nodes.");
  // console.log(unvisitedNeighborNodes);
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
