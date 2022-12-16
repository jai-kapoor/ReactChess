import React from "react";
import ReactDOM from 'react-dom/client';
import "./index.css";

class Square extends React.Component {
  render() {
    return (
      <button
        className={["square", this.props.color].join(' ')}
        onClick={this.props.onClick}
      >
        {this.props.piece}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    const arr = Array(64).fill("");
    arr[0] = "BR";
    arr[1] = "BN";
    arr[2] = "BB";
    arr[3] = "BQ";
    arr[4] = "BK";
    arr[5] = "BB";
    arr[6] = "BN";
    arr[7] = "BR";
    arr[8] = "BP";
    arr[9] = "BP";
    arr[10] = "BP";
    arr[11] = "BP";
    arr[12] = "BP";
    arr[13] = "BP";
    arr[14] = "BP";
    arr[15] = "BP";
    arr[48] = "WP";
    arr[49] = "WP";
    arr[50] = "WP";
    arr[51] = "WP";
    arr[52] = "WP";
    arr[53] = "WP";
    arr[54] = "WP";
    arr[55] = "WP";
    arr[56] = "WR";
    arr[57] = "WN";
    arr[58] = "WB";
    arr[59] = "WQ";
    arr[60] = "WK";
    arr[61] = "WB";
    arr[62] = "WN";
    arr[63] = "WR";
    this.state = {
      squares: arr,
      playerTurn: "W",
      click1: -1,
    };
  }

  leftEdgeSquares = [0, 8, 16, 24, 32, 40, 48, 56];
  rightEdgeSquares = [7, 15, 23, 31, 39, 47, 55, -1];
  secondRank = [48, 49, 50, 51, 52, 53, 54, 55];
  seventhRank = [8, 9, 10, 11, 12, 13, 14, 15];

  aAndBFiles = [0, 8, 16, 24, 32, 40, 48, 56, 1, 9, 17, 25, 33, 41, 49, 57];
  gAndHFiles = [7, 15, 23, 31, 39, 47, 55, 63, 6, 14, 22, 30, 38, 46, 54, 62];

  pawn(coordinate) {
    let legal = [];
    // if white
    if (this.state.playerTurn == "W") {
      // moving up
      let newCoordinate = coordinate - 8;
      if (newCoordinate >= 0) {
        if (this.state.squares[newCoordinate] == "") {
          legal.push([coordinate, newCoordinate])
          if (this.secondRank.includes(coordinate)) {
            newCoordinate -= 8;
            if (this.state.squares[newCoordinate] == "") {
              legal.push([coordinate, newCoordinate]);
            }
          }
        }
      }
      // capturing left
      newCoordinate = coordinate - 9;
      if (!this.rightEdgeSquares.includes(newCoordinate)) {
        if ((this.state.squares[newCoordinate] + "z")[0] == "B") {
          legal.push([coordinate, newCoordinate]);
        }
      }
      // capturing right
      newCoordinate = coordinate - 7;
      if (!this.leftEdgeSquares.includes(newCoordinate)) {
        if ((this.state.squares[newCoordinate] + "z")[0] == "B") {
          legal.push([coordinate, newCoordinate]);
        }
      }

    }
    // if black
    else {
      // moving down
      let newCoordinate = coordinate + 8;
      if (newCoordinate <= 63) {
        if (this.state.squares[newCoordinate] == "") {
          legal.push([coordinate, newCoordinate]);
          if (this.seventhRank.includes(coordinate)) {
            newCoordinate += 8;
            if (this.state.squares[newCoordinate] == "") {
              legal.push([coordinate, newCoordinate]);
            }
          }
        }
      }
      // capturing true left
      newCoordinate = coordinate + 7;
      if (!this.rightEdgeSquares.includes(newCoordinate)) {
        if ((this.state.squares[newCoordinate] + "z")[0] == "W") {
          legal.push([coordinate, newCoordinate]);
        }
      }
      // capturing true right
      newCoordinate = coordinate + 9;
      if (!this.leftEdgeSquares.includes(newCoordinate)) {
        if ((this.state.squares[newCoordinate] + "z")[0] == "W") {
          legal.push([coordinate, newCoordinate]);
        }
      }

    }

    return legal;
  }
  knight(coordinate) {
    let legal = []
    let newCoordinate = coordinate - 17;
    let fromLeft = this.aAndBFiles.includes(coordinate);
    let toRight = this.gAndHFiles.includes(newCoordinate);
    if (newCoordinate >= 0 && newCoordinate <= 63){
      if (!(fromLeft && toRight)) {
        if ((this.state.squares[newCoordinate]+"z")[0] != this.state.playerTurn){
          legal.push([coordinate, newCoordinate]);
        }
      }
    }
    newCoordinate = coordinate - 15;
    let fromRight = this.gAndHFiles.includes(coordinate);
    let toLeft = this.aAndBFiles.includes(newCoordinate);
    if (newCoordinate >= 0 && newCoordinate <= 63){
      if (!(fromRight && toLeft)){
        if ((this.state.squares[newCoordinate]+"z")[0] != this.state.playerTurn){
          legal.push([coordinate, newCoordinate]);
        }
      }
    }
    newCoordinate = coordinate - 10;
    toRight = this.gAndHFiles.includes(newCoordinate);
    if (newCoordinate >= 0 && newCoordinate <= 63){
      if (!(fromLeft && toRight)) {
        if ((this.state.squares[newCoordinate]+"z")[0] != this.state.playerTurn){
          legal.push([coordinate, newCoordinate]);
        }
      }
    }
    newCoordinate = coordinate - 6;
    toLeft = this.aAndBFiles.includes(newCoordinate);
    if (newCoordinate >= 0 && newCoordinate <= 63){
      if (!(fromRight && toLeft)) {
        if ((this.state.squares[newCoordinate]+"z")[0] != this.state.playerTurn){
          legal.push([coordinate, newCoordinate]);
        }
      }
    }
    newCoordinate = coordinate + 6;
    toRight = this.gAndHFiles.includes(newCoordinate);
    if (newCoordinate >= 0 && newCoordinate <= 63){
      if (!(fromLeft && toRight)){
        if ((this.state.squares[newCoordinate]+"z")[0] != this.state.playerTurn){
          legal.push([coordinate, newCoordinate]);
        }
      }
    }
    newCoordinate = coordinate + 10;
    toLeft = this.aAndBFiles.includes(newCoordinate);
    if (newCoordinate >= 0 && newCoordinate <= 63){
      if (!(fromRight && toLeft)) {
        if ((this.state.squares[newCoordinate]+"z")[0] != this.state.playerTurn){
          legal.push([coordinate, newCoordinate]);
        }
      }
    }
    newCoordinate = coordinate + 15;
    toRight = this.gAndHFiles.includes(newCoordinate);
    if (newCoordinate >= 0 && newCoordinate <= 63){
      if (!(fromLeft && toRight)) {
        if ((this.state.squares[newCoordinate]+"z")[0] != this.state.playerTurn){
          legal.push([coordinate, newCoordinate]);
        }
      }
    }
    newCoordinate = coordinate + 17;
    toLeft = this.aAndBFiles.includes(newCoordinate);
    if (newCoordinate >= 0 && newCoordinate <= 63){
      if (!(fromRight && toLeft)) {
        if ((this.state.squares[newCoordinate]+"z")[0] != this.state.playerTurn){
          legal.push([coordinate, newCoordinate]);
        }
      }
    }
    return legal;
  }
  rook(coordinate) {
    let legal = [];
    // check moving right
    for (let i = 1; i <= 7; i++) {
      let newCoordinate = coordinate + i
      if (newCoordinate > 63 || newCoordinate < 0) {
        break;
      }
      if (this.leftEdgeSquares.includes(newCoordinate)) {
        break;
      }
      if (this.state.squares[newCoordinate] != "") {
        if (this.state.squares[newCoordinate][0] == this.state.playerTurn) {
          break;
        }
      }
      legal.push([coordinate, newCoordinate]);
    }
    // check moving left
    for (let i = 1; i <= 7; i++) {
      let newCoordinate = coordinate - i
      if (newCoordinate > 63 || newCoordinate < 0) {
        break;
      }
      if (this.rightEdgeSquares.includes(newCoordinate)) {
        break;
      }
      if (this.state.squares[newCoordinate] != "") {
        if (this.state.squares[newCoordinate][0] == this.state.playerTurn) {
          break;
        }
      }
      legal.push([coordinate, newCoordinate]);
    }
    // check moving up
    for (let i = 1; i <= 7; i++) {
      let newCoordinate = coordinate - i * 8
      if (newCoordinate > 63 || newCoordinate < 0) {
        break;
      }
      if (this.state.squares[newCoordinate] != "") {
        if (this.state.squares[newCoordinate][0] == this.state.playerTurn) {
          break;
        }
      }
      legal.push([coordinate, newCoordinate]);
    }
    // check moving down
    for (let i = 1; i <= 7; i++) {
      let newCoordinate = coordinate + i * 8
      if (newCoordinate > 63 || newCoordinate < 0) {
        break;
      }
      if (this.state.squares[newCoordinate] != "") {
        if (this.state.squares[newCoordinate][0] == this.state.playerTurn) {
          break;
        }
      }
      legal.push([coordinate, newCoordinate]);
    }
    return legal;
  }

  handleClick(coordinate) {
    let piece = this.state.squares[coordinate]
    if (this.state.click1 == -1 && piece != "") {
      if (piece[0] == this.state.playerTurn) {
        this.setState({ click1: coordinate });
      }
    }
    else if (this.state.click1 != -1 && (piece[0] != this.state.playerTurn)) {
      let legalMoves = []
      if (this.state.squares[this.state.click1][1] == "P") {
        legalMoves = this.pawn(this.state.click1);
      }
      else if (this.state.squares[this.state.click1][1] == "N") {
        legalMoves = this.knight(this.state.click1);
      }
      else if (this.state.squares[this.state.click1][1] == "B") {

      }
      else if (this.state.squares[this.state.click1][1] == "R") {
        legalMoves = this.rook(this.state.click1)
      }
      else if (this.state.squares[this.state.click1][1] == "Q") {

      }
      else if (this.state.squares[this.state.click1][1] == "K") {

      }
      let move = [this.state.click1, coordinate];
      let a = JSON.stringify(legalMoves);
      let b = JSON.stringify(move);
      let c = a.indexOf(b);
      if (c != -1) {
        if (this.state.squares[coordinate] == "BK"){
          alert("White won");
        }
        if (this.state.squares[coordinate] == "WK"){
          alert("Black Won");
        }

        const squares = this.state.squares.slice();
        squares[coordinate] = this.state.squares[this.state.click1];
        squares[this.state.click1] = "";
        this.setState({ squares: squares, click1: -1, playerTurn: this.state.playerTurn == "W" ? "B" : "W" })
      }

    }
    else {
      this.setState({ click1: -1 })
    }

  }

  renderSquare(coordinate, color) {
    return <Square
      coordinate={coordinate}
      piece={this.state.squares[coordinate]}
      color={color}
      onClick={() => this.handleClick(coordinate)}
    />;
  }

  render() {
    const turn = this.state.playerTurn == "W" ? "White" : "Black";
    const status = 'Next player: ' + turn;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0, "white")}
          {this.renderSquare(1, "black")}
          {this.renderSquare(2, "white")}
          {this.renderSquare(3, "black")}
          {this.renderSquare(4, "white")}
          {this.renderSquare(5, "black")}
          {this.renderSquare(6, "white")}
          {this.renderSquare(7, "black")}
        </div>
        <div className="board-row">
          {this.renderSquare(8, "black")}
          {this.renderSquare(9, "white")}
          {this.renderSquare(10, "black")}
          {this.renderSquare(11, "white")}
          {this.renderSquare(12, "black")}
          {this.renderSquare(13, "white")}
          {this.renderSquare(14, "black")}
          {this.renderSquare(15, "white")}
        </div>
        <div className="board-row">
          {this.renderSquare(16, "white")}
          {this.renderSquare(17, "black")}
          {this.renderSquare(18, "white")}
          {this.renderSquare(19, "black")}
          {this.renderSquare(20, "white")}
          {this.renderSquare(21, "black")}
          {this.renderSquare(22, "white")}
          {this.renderSquare(23, "black")}
        </div>
        <div className="board-row">
          {this.renderSquare(24, "black")}
          {this.renderSquare(25, "white")}
          {this.renderSquare(26, "black")}
          {this.renderSquare(27, "white")}
          {this.renderSquare(28, "black")}
          {this.renderSquare(29, "white")}
          {this.renderSquare(30, "black")}
          {this.renderSquare(31, "white")}
        </div>
        <div className="board-row">
          {this.renderSquare(32, "white")}
          {this.renderSquare(33, "black")}
          {this.renderSquare(34, "white")}
          {this.renderSquare(35, "black")}
          {this.renderSquare(36, "white")}
          {this.renderSquare(37, "black")}
          {this.renderSquare(38, "white")}
          {this.renderSquare(39, "black")}
        </div>
        <div className="board-row">
          {this.renderSquare(40, "black")}
          {this.renderSquare(41, "white")}
          {this.renderSquare(42, "black")}
          {this.renderSquare(43, "white")}
          {this.renderSquare(44, "black")}
          {this.renderSquare(45, "white")}
          {this.renderSquare(46, "black")}
          {this.renderSquare(47, "white")}
        </div>
        <div className="board-row">
          {this.renderSquare(48, "white")}
          {this.renderSquare(49, "black")}
          {this.renderSquare(50, "white")}
          {this.renderSquare(51, "black")}
          {this.renderSquare(52, "white")}
          {this.renderSquare(53, "black")}
          {this.renderSquare(54, "white")}
          {this.renderSquare(55, "black")}
        </div>
        <div className="board-row">
          {this.renderSquare(56, "black")}
          {this.renderSquare(57, "white")}
          {this.renderSquare(58, "black")}
          {this.renderSquare(59, "white")}
          {this.renderSquare(60, "black")}
          {this.renderSquare(61, "white")}
          {this.renderSquare(62, "black")}
          {this.renderSquare(63, "white")}
        </div>

      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
