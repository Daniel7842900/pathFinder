export function Dfs(grid, startNode, endNode) {
  const visitedNodes = [];
  var s = [];

  s.push(startNode);
  startNode.isVisited = true;

  while (!!s.length) {
    var currentNode = s.pop();
    visitedNodes.push(currentNode);

    if (currentNode === endNode) {
      return visitedNodes;
    }
    const neighborNodes = getUnvisitedNeighborNodes(currentNode, grid);

    for (const neighbor of neighborNodes) {
      if (neighbor.isWall === true) {
        continue;
      }
      neighbor.isVisited = true;
      neighbor.previousNode = currentNode;
      s.push(neighbor);
    }
  }
}

function getUnvisitedNeighborNodes(node, grid) {
  const neighborNodes = [];
  var unvisitedNeighbors = [];
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

  unvisitedNeighbors = neighborNodes.filter(
    (neighbor) => neighbor.isVisited === false
  );

  return unvisitedNeighbors;
}
