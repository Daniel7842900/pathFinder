import React, { Component } from "react";
import Node from "./Node/Node";

import "./PathFinder.css";

class PathFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: []
    };
  }

  componentDidMount() {
    console.log("entering componentDidMount");
    const grid = [];
    for (let row = 0; row < 15; row++) {
      const gridRow = [];
      for (let col = 0; col < 30; col++) {
        //creating a node object.
        const currentNode = {
          row,
          col,
          isStart: row === 7 && col === 9,
          isEnd: row === 7 && col === 20
        };
        gridRow.push(currentNode);
      }
      grid.push(gridRow);
    }
    //the scope of this grid is inside of this function.
    //setState makes render() be called agian.
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
    );
  }
}

export default PathFinder;
