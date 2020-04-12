//step 1. set the starting node. (this is the start node.)
//step 2. set the distances of all nodes as infinite except the starting node.
//step 3. find the neighboring nodes with the starting node.
//step 4. update the distances of neighboring nodes as 1. change their isVisited to true.
//step 5. pick any of neighboring nodes and then repeat the process. at this point, neighboring nodes are 2.
//step 6. move to any unvisited neighboring node.

import PriorityQueue from "../DataStructure/PriorityQueue";

export function dijkstra(grid, startNode, endNode) {
  let pq = new PriorityQueue();
  let backTrace = {};
  let times = {};
  let visitedNodes = {};
  startNode.distance = 0;
  startNode.isVisited = true;
  console.log("this is start node");
  console.log(startNode);
  pq.enqueue(startNode, 0);
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

  // let path = [endNode];
  // let lastStep = endNode;

  // while (lastStep !== startNode) {
  //   path.unshift(backTrace[lastStep]);
  //   lastStep = backTrace[lastStep];
  // }
}

function updateDistance(node, grid) {
  const distanceArray = getUnvisitedNeighborNodes(node, grid);

  for (const neighbor of distanceArray) {
    //1 can be the weight of edges. we are using 1 because the weight of edge is 1.
    neighbor.distance++;
  }

  return distanceArray;
}

function getUnvisitedNeighborNodes(node, grid) {
  console.log("this is neighborNodes");

  const neighborNodes = [];
  const { row, col } = node;
  console.log(node);
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
  console.log("is this empty?");
  console.log(neighborNodes);
  return neighborNodes.filter((neighbor) => !neighbor.isVisited);
}

function getKey() {
  return this;
}
