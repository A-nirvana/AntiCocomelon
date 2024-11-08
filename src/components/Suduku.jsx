// pages/sudoku.js
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const SudokuGame = () => {
  // Utility function to shuffle an array
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // Recursive backtracking algorithm to solve the Sudoku
  const solveBoard = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === "") {
          for (let num of shuffleArray(["1", "2", "3", "4", "5", "6", "7", "8", "9"])) {
            if (isValidPlacement(board, row, col, num)) {
              board[row][col] = num;
              if (solveBoard(board)) return true;
              board[row][col] = "";
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  // Check if placing a number in the board is valid
  const isValidPlacement = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[boxRow + r][boxCol + c] === num) return false;
      }
    }
    return true;
  };

  // Generate a new Sudoku puzzle
  const generateSudokuBoard = () => {
    const emptyBoard = Array.from({ length: 9 }, () => Array(9).fill(""));
    solveBoard(emptyBoard);
    const solutionBoard = emptyBoard.map((row) => row.slice());

    // Randomly remove numbers to create the puzzle
    for (let i = 0; i < 40; i++) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      solutionBoard[row][col] = "";
    }
    return { puzzle: solutionBoard, solution: emptyBoard };
  };

  const [board, setBoard] = useState([]);
  const [initialBoard, setInitialBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const { puzzle, solution } = generateSudokuBoard();
    setBoard(puzzle);
    setInitialBoard(puzzle);
    setSolution(solution);
  }, []);

  const handleChange = (row, col, value) => {
    if (!/^[1-9]?$/.test(value)) return;

    const newBoard = board.map((r) => r.slice());
    newBoard[row][col] = value;
    setBoard(newBoard);
  };

  const checkSolution = () => {
    const isCorrect = board.every((row, rowIndex) =>
      row.every((cell, colIndex) => cell === solution[rowIndex][colIndex])
    );
    setStatus(isCorrect ? "Correct Solution!" : "Incorrect Solution, try again.");
  };

  const solveSudoku = () => {
    setBoard(solution);
    setStatus("Sudoku Solved!");
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>Sudoku Game</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 40px)",
          gap: "2px",
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              value={value}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
              style={{
                width: "40px",
                height: "40px",
                textAlign: "center",
                fontSize: "16px",
                color: "black",
                backgroundColor: initialBoard[rowIndex][colIndex] ? "#e0ffff" : "white",
                border: "1px solid #000",
                borderTop: rowIndex % 3 === 0 ? "2px solid black" : "",
                borderLeft: colIndex % 3 === 0 ? "2px solid black" : "",
                borderRight: colIndex === 8 ? "2px solid black" : "",
                borderBottom: rowIndex === 8 ? "2px solid black" : "",
                boxSizing: "border-box",
              }}
              maxLength={1}
              disabled={!!initialBoard[rowIndex][colIndex]} // Disable input if cell was initially filled
            />
          ))
        )}
      </div>
      <button
        onClick={checkSolution}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          marginRight: "10px",
        }}
      >
        Check Solution
      </button>
      <button
        onClick={solveSudoku}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
        }}
      >
        Solve Sudoku
      </button>
      <p style={{ fontSize: "18px", marginTop: "10px" }}>{status}</p>
    </div>
  );
};

// Disable SSR to avoid hydration issues
export default dynamic(() => Promise.resolve(SudokuGame), { ssr: false });
