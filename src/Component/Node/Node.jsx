import React, { Component } from "react";

import "./Node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isStart, isEnd } = this.props;
    const startEndNode = isEnd ? "node-end" : isStart ? "node-start" : "";
    console.log(startEndNode);
    return <div className={`node ${startEndNode}`}></div>;
  }
}

export default Node;
