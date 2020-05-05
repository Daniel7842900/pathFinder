import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra, getShortestRoute } from "./Algorithm/Dijkstra";

import "./PathFinder.css";

const startNodeRow = 7;
const startNodeCol = 9;
const endNodeRow = 7;
const endNodeCol = 20;

class PathFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWall(this.state.grid, row, col);
    console.log("entering handle mouse down.");
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) {
      return;
    }
    const newGrid = getNewGridWall(this.state.grid, row, col);
    console.log("entering handle mouse enter");
    this.setState({ grid: newGrid });
  }

  handleMouseUp(row, col) {
    console.log("entering handle mouse up");
    this.state.mouseIsPressed = false;
  }

  animateDijkstra(visitedNodes, shortestRoute) {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        //we need this setTimeout because we need to maually set the time
        //after node-visited setTimeout. So we are setting the last part with
        //this setTimeout.
        setTimeout(() => {
          this.animateShortestRoute(shortestRoute);
        }, 30 * i);
        return;
      }

      setTimeout(() => {
        const node = visitedNodes[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 30 * i);
    }
  }

  //This is the function that actually animates the line.
  animateShortestRoute(shortestRoute) {
    for (let i = 0; i < shortestRoute.length; i++) {
      setTimeout(() => {
        const node = shortestRoute[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest";
      }, 40 * i);
    }
  }

  visualizeAlgorithm() {
    const { grid } = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const endNode = grid[endNodeRow][endNodeCol];
    const visitedNodes = dijkstra(grid, startNode, endNode);
    const shortestRoute = getShortestRoute(endNode);
    this.animateDijkstra(visitedNodes, shortestRoute);
  }

  componentDidMount() {
    const grid = createGrid();
    this.setState({ grid });
  }

  render() {
    //you have to define the variable even though you have it in the state.
    //if there is no {} around the variable, there is no error during the compile,
    //however, it won't recognize in the variable in the state in the contrustor.
    // { } is called destructuring. Here, we are creating a variable grid and then grabs
    // grid value and put it in this variable.
    const { grid } = this.state;
    console.log("entering the render()");

    //console.log({grid}) prints out {grid} as an object.
    //console.log(grid) prints out grid as an array.
    //console.log(grid);
    return (
      <>
        <button onClick={() => this.visualizeAlgorithm()}>Dijkstra</button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isStart, isEnd, isVisited, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      row={row}
                      col={col}
                      isStart={isStart}
                      isEnd={isEnd}
                      isVisited={isVisited}
                      isWall={isWall}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={(row, col) => this.handleMouseUp(row, col)}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const createGrid = () => {
  const grid = [];
  for (let row = 0; row < 15; row++) {
    const gridRow = [];
    for (let col = 0; col < 30; col++) {
      gridRow.push(createNodeObject(row, col));
    }
    grid.push(gridRow);
  }
  //the scope of this grid is inside of this function.
  //setState makes render() be called agian.
  //this.setState({ grid });
  return grid;
};

const createNodeObject = (row, col) => {
  //creating a node object.
  return {
    row,
    col,
    isStart: row === 7 && col === 9,
    isEnd: row === 7 && col === 20,
    isVisited: false,
    isWall: false,
    distance: Infinity,
    neighborNodes: [],
    previousNode: null,
  };
};

const getNewGridWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default PathFinder;
