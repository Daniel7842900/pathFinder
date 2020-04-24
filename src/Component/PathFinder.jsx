import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra } from "./Algorithm/Dijkstra";

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
    };
  }

  visualizeAlgorithm() {
    const { grid } = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const endNode = grid[endNodeRow][endNodeCol];
    const visitedNodes = dijkstra(grid, startNode, endNode);
    console.log("this is visited nodes.");
    //console.log(visitedNodes);
  }

  componentDidMount() {
    console.log("entering componentDidMount");
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
    console.log(grid);

    return (
      <>
        <button onClick={() => this.visualizeAlgorithm()}>Dijkstra</button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { isStart, isEnd } = node;
                  return (
                    <Node key={nodeIdx} isStart={isStart} isEnd={isEnd}></Node>
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
  console.log("creating a node object");
  return {
    row,
    col,
    isStart: row === 7 && col === 9,
    isEnd: row === 7 && col === 20,
    isVisited: false,
    distance: Infinity,
    neighborNodes: [],
    previousNode: null,
  };
};

export default PathFinder;
