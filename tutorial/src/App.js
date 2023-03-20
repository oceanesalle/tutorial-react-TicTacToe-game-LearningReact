import { useState } from 'react'; // React provides a special function called useState that you can call from your component to let it “remember” things. 

// This line imports the useState function from the 'react' package. useState is a hook provided by React that allows you to add state to functional components. State is a way for components to keep track of information that can change over time and cause the component to re-render.

function Square({ value, onSquareClick }) { // function Square({ value }) indicates the Square component can be passed a prop called value.
  return (
    <button className="square" onClick={onSquareClick}>
      {value}  {/* {value} indicates the value prop will be rendered inside the button.You wanted to render the JavaScript variable called value from your component, not the word “value”. To “escape into JavaScript” from JSX, you need curly braces. */} 
    </button>
  );
}
// This is a functional component called Square. It takes two props: value and onSquareClick. The component returns a button element that will display the value prop when rendered. When the button is clicked, the onSquareClick function will be called.
// The Square component is now a controlled component. The Board has full control over them.

function Board({ xIsNext, squares, onPlay }) { // The Board component will receive two props from Game: xIsNext and squares. It will also receive a function prop called onPlay. This function will be called when a square is clicked.
  function handleClick(i) { //
    if (calculateWinner(squares) || squares[i]) { // If there is a winner or the square is already filled, ignore the click.
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner; // If there is a winner, display the winner.
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// This is another functional component called Board. It takes three props: xIsNext, squares, and onPlay. It renders the game board and tracks the state of the game. It also handles user clicks on the board by calling the handleClick function.

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); // The Game component will keep track of the history of the game in its own state. It will also keep track of which move is currently displayed. The history state will be an array of 9-element arrays. Each element in the array will be either “X”, “O”, or null to indicate an empty square.
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0; 
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) { //
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) { // 
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Finally, the calculateWinner function is a helper function that determines whether there is a winner in the game based on the current state of the board. It does this by iterating over all possible winning combinations and checking if the same player occupies each square in any of the combinations. If a winner is found, the function returns the symbol of the winning player ('X' or 'O'). If there is no winner, the function returns null.
