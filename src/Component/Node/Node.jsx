import React, { Component } from "react";

import "./Node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { row, col, isStart, isEnd, isVisited } = this.props;
    const startEndNode = isEnd
      ? "node-end"
      : isStart
      ? "node-start"
      : isVisited
      ? "node-visited"
      : "";
    console.log(startEndNode);
    return (
      <div id={`node-${row}-${col}`} className={`node ${startEndNode}`}></div>
    );
  }
}

export default Node;
