import React, { Component } from "react";

import "./Node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      row,
      col,
      isStart,
      isEnd,
      isVisited,
      isWall,
      onMouseDown,
    } = this.props;
    const startEndNode = isEnd
      ? "node-end"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";
    console.log(startEndNode);
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${startEndNode}`}
        onMouseDown={() => onMouseDown(row, col)}
      ></div>
    );
  }
}

export default Node;
