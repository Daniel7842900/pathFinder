/*
BFS algorithm (Breadth First Search).
The best data structure for BFS is queue.
In this application, we will just use push and unshift methods of array.
However, if the size of an array gets bigger, it is better to implement
queue.js.
It starts from the root node. As the algorithm processes, it adds direct
neighbors of the root node. We move on to the neighbor nodes of the root node
and adds direct neighbor nodes into the queue again.
BFS is good for finding shortest path on unweighted graphs.
*/
export function Bfs(grid, startNode, endNode) {
  const unVisitedNodes = [];
  const visitedNodes = [];

  unVisitedNodes = getAllNodes(grid);

  while (!!unVisitedNodes.length) {}
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

function getUnvisitedNodes(node, grid) {
  const neighborNodes = [];
  var unVisitedNeighborNodes = [];
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
  unVisitedNeighborNodes = neighborNodes.filter(
    (neighbor) => neighbor.isVisited === false
  );

  return unVisitedNeighborNodes;
}
