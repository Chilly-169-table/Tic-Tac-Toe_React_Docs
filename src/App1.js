import { useState } from "react";

function Square({ value, onSquareClick }) {
	return (
		<button className="square" onClick={onSquareClick}>
			{value}
		</button>
	);
}

export default function Board() {
	const [squares, setSquares] = useState(Array(3).fill(null));
	const [xIsNext, setXIsNext] = useState(true);

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
	let status;
	if (xIsNext) {
		status = "Next Chance is X";
	} else {
		status = "Next Chance is O";
	}
	return (
		<>
			<div>{status}</div>
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

	function calculateWinner(value) {
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
			if (value[a] && value[a] === value[b] && value[a] === value[c]) {
				return value[a];
			}
		}
		return null;
	}
}
