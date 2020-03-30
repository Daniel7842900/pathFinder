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
      for (let col = 0; col < 15; col++) {
        gridRow.push([]);
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

    const { grid } = this.state;
    console.log("entering the render()");
    console.log({ grid });

    return (
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={row.id}>
              {row.map((node, colIdx) => (
                <Node></Node>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}

export default PathFinder;
