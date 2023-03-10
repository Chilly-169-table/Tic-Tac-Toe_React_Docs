import { useState } from "react";

function Square({ value, onSquareClick }) {
	// Indicates the Component square can be passed a prop called value i.e  a variable
	// const [value, setValue] = useState(null);
	// useState returns two values, 1st-current state of the Component and Second a function setValue that is used to change the 1st value.
	// null passed to useState sets value variable to null, like a starting point for the variable and the state
	// function handleClick() {
	// setValue("X");
	// }
	// return (
	// <button className="square" onClick={handleClick}>
	// {value}
	// </button>
	// );
	return (
		<button className="square" onClick={onSquareClick}>
			{value}
		</button>
	);
}
export default function Board() {
	const [xIsNext, setXIsNext] = useState(true);
	const [squares, setSquares] = useState(Array(9).fill(null));

	function handleClick(i) {
		if (squares[i] || calculateWinner(squares)) {
			return;
		}
		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = "X";
		} else {
			nextSquares[i] = "O";
		}
		setSquares(nextSquares); //Updates the squares state array's ith value to 'X'
		//And since part of the state has been changed, the Board Component is re-rendered along with it's children.
		setXIsNext(!xIsNext);
	}

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = "Winner: " + winner;
	} else {
		status = "Next-Player" + (xIsNext ? "X" : "O");
	}
	return (
		<>
			<div className="status">{status}</div>
			<div className="board-row">
				<Square
					value={squares[0]}
					onSquareClick={() => handleClick(0)}
				/>
				<Square
					value={squares[1]}
					onSquareClick={() => handleClick(1)}
				/>
				<Square
					value={squares[2]}
					onSquareClick={() => handleClick(2)}
				/>
			</div>

			<div className="board-row">
				<Square
					value={squares[3]}
					onSquareClick={() => handleClick(3)}
				/>
				<Square
					value={squares[4]}
					onSquareClick={() => handleClick(4)}
				/>
				<Square
					value={squares[5]}
					onSquareClick={() => handleClick(5)}
				/>
			</div>

			<div className="board-row">
				<Square
					value={squares[6]}
					onSquareClick={() => handleClick(6)}
				/>
				<Square
					value={squares[7]}
					onSquareClick={() => handleClick(7)}
				/>
				<Square
					value={squares[8]}
					onSquareClick={() => handleClick(8)}
				/>
			</div>
		</>
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
		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return squares[a];
		}
	}
	return null;
}
