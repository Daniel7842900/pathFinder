import React, { Component } from "react";
import Node from "./Node/Node";
import "bootstrap/dist/css/bootstrap.min.css";
import { dijkstra, getShortestRoute } from "./Algorithm/Dijkstra";
import { AStar } from "./Algorithm/AStar";
import { Bfs } from "./Algorithm/Bfs";
import { Dfs } from "./Algorithm/Dfs";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";

import "./PathFinder.css";

const STARTNODEROW = 7;
const STARTNODECOL = 9;
const ENDNODEROW = 7;
const ENDNODECOL = 20;

class PathFinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      selectedAlgorithm: "dijkstra",
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
        //debugger;
        const node = visitedNodes[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 30 * i);
    }
  }

  animateAStar(visitedNodes, shortestRoute) {
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

  animateBfs(visitedNodes, shortestRoute) {
    //debugger;
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

  animateDfs(visitedNodes, shortestRoute) {
    //debugger;
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
      //debugger;
      setTimeout(() => {
        const node = visitedNodes[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 30 * i);
    }
  }

  //This is the function that actually animates the line.
  animateShortestRoute(shortestRoute) {
    //debugger;
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
    const startNode = grid[STARTNODEROW][STARTNODECOL];
    const endNode = grid[ENDNODEROW][ENDNODECOL];
    //debugger;

    switch (this.state.selectedAlgorithm) {
      case "dijkstra":
        var visitedNodes = dijkstra(grid, startNode, endNode);
        var shortestRoute = getShortestRoute(endNode);
        this.animateDijkstra(visitedNodes, shortestRoute);
        break;

      case "AStar":
        var visitedNodes = AStar(grid, startNode, endNode);

        var shortestRoute = getShortestRoute(endNode);
        this.animateAStar(visitedNodes, shortestRoute);
        break;

      case "Bfs":
        //debugger;
        var visitedNodes = Bfs(grid, startNode, endNode);

        var shortestRoute = getShortestRoute(endNode);
        this.animateBfs(visitedNodes, shortestRoute);
        break;

      case "Dfs":
        //debugger;
        var visitedNodes = Dfs(grid, startNode, endNode);

        var shortestRoute = getShortestRoute(endNode);
        this.animateDfs(visitedNodes, shortestRoute);
        break;
    }
  }

  getOption(key) {
    if (key === "1") {
      this.setState({ selectedAlgorithm: "dijkstra" });
    } else if (key === "2") {
      this.setState({ selectedAlgorithm: "AStar" });
    } else if (key === "3") {
      this.setState({ selectedAlgorithm: "Bfs" });
    } else if (key === "4") {
      this.setState({ selectedAlgorithm: "Dfs" });
    }
    console.log("this is key");
    console.log(key);
    //console.log(this.state.selectedAlgorithm);
  }

  // visualizeAlgorithm() {
  //   const { grid } = this.state;
  //   const startNode = grid[STARTNODEROW][STARTNODECOL];
  //   const endNode = grid[ENDNODEROW][ENDNODECOL];
  //   const visitedNodes = dijkstra(grid, startNode, endNode);
  //   const shortestRoute = getShortestRoute(endNode);
  //   this.animateDijkstra(visitedNodes, shortestRoute);
  // }

  componentDidMount() {
    const grid = createGrid();
    this.setState({ grid });
  }

  resetGrid() {
    const { grid } = this.state;
    for (let row = 0; row < 15; row++) {
      const gridRow = [];
      for (let col = 0; col < 30; col++) {
        const node = grid[row][col];
        // const newNode = {
        //   ...node,
        //   isWall: false,
        //   isVisited: false,
        // };
        if (node.isWall) {
          node.isWall = false;
        }
        if (node.isVisited) {
          node.isVisited = false;
        }
        if (node.gDistance !== Infinity) {
          node.gDistance = Infinity;
        }
        if (node.neighborNodes.length !== 0) {
          node.neighborNodes = [];
        }
        if (node.previousNode !== null) {
          node.previousNode = null;
        }
        if (node.fCost !== Infinity) {
          node.fCost = Infinity;
        }
        if (node.hDistance !== Infinity) {
          node.hDistance = Infinity;
        }
        if (row === STARTNODEROW && col === STARTNODECOL) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start";
        } else if (row === ENDNODEROW && col === ENDNODECOL) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-end";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node ";
        }
      }
    }
    this.setState({ grid });
  }

  resetWall() {
    const grid = createGrid();
    for (let row = 0; row < 15; row++) {
      const gridRow = [];
      for (let col = 0; col < 30; col++) {
        const node = grid[row][col];
        if (row === STARTNODEROW && col === STARTNODECOL) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start";
        } else if (row === ENDNODEROW && col === ENDNODECOL) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-end";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node ";
        }
      }
    }
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
        <Navbar bg="light" expand="md">
          <Navbar.Brand href="#home">PathFinder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto ml-auto">
              <NavDropdown
                onSelect={(e) => this.getOption(e)}
                title="Algorithms"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  eventKey={"1"}
                  //onSelect={(e) => this.getOption(e)}

                  //onSelect={() => this.getOption()}
                >
                  Dijkstra
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey={"2"}
                  //onSelect={(key) => this.getOption(key)}
                >
                  A*
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey={"3"}
                  //onSelect={(key) => this.getOption(key)}
                >
                  BFS
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey={"4"}
                  //onSelect={(key) => this.getOption(key)}
                >
                  DFS
                </NavDropdown.Item>
              </NavDropdown>
              <Button
                className="btn-margin-left btn-margin-right"
                variant="outline-success"
                onClick={() => this.visualizeAlgorithm()}
              >
                Start!
              </Button>
              <Button
                className="btn-margin-left btn-margin-right"
                variant="outline-success"
                onClick={() => this.resetGrid()}
              >
                Clear Board
              </Button>
              <Button
                className="btn-margin-left btn-margin-right"
                variant="outline-success"
                onClick={() => this.resetWall()}
              >
                Clear wall
              </Button>
              <NavDropdown title="Speed" id="basic-nav-dropdown">
                <NavDropdown.Item>Fast</NavDropdown.Item>
                <NavDropdown.Item>Normal</NavDropdown.Item>
                <NavDropdown.Item>Slow</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
    gDistance: Infinity,
    neighborNodes: [],
    previousNode: null,
    fCost: Infinity,
    hDistance: Infinity,
  };
};

const getNewGridWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  // var img = require(`./icons/walls.png`);
  // img.setAttribute(
  //   "src",
  //   "/Users/daniellim/Desktop/daniel/my-app/src/Component/icons/brickwall.png"
  // );
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  // document
  //   .getElementById(`node-${newNode.row}-${newNode.col}`)
  //   .appendChild(img);
  newGrid[row][col] = newNode;

  return newGrid;
};

// const getNewGrid = (grid) => {
//   const newGrid = grid.slice();
//   const node = newGrid[row][col];
//   // var img = require(`./icons/walls.png`);
//   // img.setAttribute(
//   //   "src",
//   //   "/Users/daniellim/Desktop/daniel/my-app/src/Component/icons/brickwall.png"
//   // );
//   const newNode = {
//     ...node,
//     isWall: false,
//   };

//   if (row === STARTNODEROW && col === STARTNODECOL) {
//     document.getElementById(`node-${node.row}-${node.col}`).className =
//       "node node-start";
//   } else if (row === ENDNODEROW && col === ENDNODECOL) {
//     document.getElementById(`node-${node.row}-${node.col}`).className =
//       "node node-end";
//   } else {
//     document.getElementById(`node-${node.row}-${node.col}`).className = "node";
//   }
//   // document
//   //   .getElementById(`node-${newNode.row}-${newNode.col}`)
//   //   .appendChild(img);
//   newGrid[row][col] = newNode;

//   return newGrid;
// };

export default PathFinder;
