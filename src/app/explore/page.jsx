"use client";
import { useState, useEffect, useRef } from "react";

const createBoard = () => {
  let board = Array(4)
    .fill()
    .map(() => Array(4).fill(0));
  return board;
};

const addRandomTile = (board) => {
  let emptyCells = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === 0) {
        emptyCells.push([row, col]);
      }
    }
  }
  if (emptyCells.length > 0) {
    const [row, col] =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[row][col] = Math.random() > 0.1 ? 2 : 4;
  }
};

const moveLeft = (board) => {
  let newBoard = board.map((row) => {
    const filteredRow = row.filter((num) => num !== 0);
    const newRow = [];

    for (let i = 0; i < filteredRow.length; i++) {
      if (filteredRow[i] === filteredRow[i + 1]) {
        newRow.push(filteredRow[i] * 2);
        i++;
      } else {
        newRow.push(filteredRow[i]);
      }
    }

    while (newRow.length < 4) newRow.push(0);

    return newRow;
  });

  return newBoard;
};

const moveRight = (board) => {
  let newBoard = board.map((row) => row.reverse());
  newBoard = moveLeft(newBoard);
  return newBoard.map((row) => row.reverse());
};

const moveUp = (board) => {
  let newBoard = rotateBoard(board);
  newBoard = moveLeft(newBoard);
  return rotateBoard(newBoard, true);
};

// Function to move tiles down
const moveDown = (board) => {
  let newBoard = rotateBoard(board);
  newBoard = moveRight(newBoard);
  return rotateBoard(newBoard, true);
};

// Rotate the board 90 degrees (for up/down moves)
const rotateBoard = (board, reverse = false) => {
  const newBoard = [];
  for (let col = 0; col < 4; col++) {
    const newRow = [];
    for (let row = 0; row < 4; row++) {
      newRow.push(board[row][col]);
    }
    newBoard.push(reverse ? newRow.reverse() : newRow);
  }
  return newBoard;
};

// Main App component
const App = () => {
  const [board, setBoard] = useState(createBoard);
  const [gameOver, setGameOver] = useState(false);

  const [startTouch, setStartTouch] = useState(null);
  const [hasMoved, setHasMoved] = useState(false);

  // Add the initial random tiles
  useEffect(() => {
    addRandomTile(board);
    addRandomTile(board);
    setBoard([...board]);
  }, []);

  // Check if the game is over
  const checkGameOver = (board) => {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] === 0) return false;
        if (row < 3 && board[row][col] === board[row + 1][col]) return false;
        if (col < 3 && board[row][col] === board[row][col + 1]) return false;
      }
    }
    return true;
  };

  // Handle swipe start (for touch gestures)
  const handleTouchStart = (e) => {
    const touchStart = e.touches[0];
    setStartTouch({ x: touchStart.clientX, y: touchStart.clientY });
  };

  // Handle swipe move (for touch gestures)
  const handleTouchMove = (e) => {
    if (startTouch) {
      e.preventDefault(); // Prevent default scrolling behavior
    }
  };

  // Handle swipe end (to calculate the swipe direction)
  const handleTouchEnd = (e) => {
    if (!startTouch) return;

    const touchEnd = e.changedTouches[0];
    const diffX = touchEnd.clientX - startTouch.x;
    const diffY = touchEnd.clientY - startTouch.y;

    let newBoard = [];
    // Move only in one direction (choose the side with more space if diagonal)
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe (left or right)
      if (diffX < 0) {
        // Swipe left
        newBoard = moveLeft(board);
      } else {
        // Swipe right
        newBoard = moveRight(board);
      }
    } else {
      // Vertical swipe (up or down)
      if (diffY < 0) {
        // Swipe up
        newBoard = moveUp(board);
      } else {
        // Swipe down
        newBoard = moveDown(board);
      }
    }

    if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
      addRandomTile(newBoard); // Add only one random tile after a valid move
      setBoard(newBoard); // Update the board
      setHasMoved(true); // Set moved state to true
    }

    if (checkGameOver(newBoard)) {
      setGameOver(true); // Game over if no more moves left
    }

    // Reset touch state
    setStartTouch(null);
  };

  return (
    <div
      className="min-h-screen bg-gray-800 flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex flex-col items-center">
        <div className="text-2xl text-white mb-4">
          <h1>2048 Game</h1>
        </div>
        {gameOver && (
          <div className="text-xl text-red-500 mb-4">Game Over!</div>
        )}
        <div className="grid grid-cols-4 gap-2 p-4 max-w-[90vw]">
          {board.map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className={`flex items-center justify-center text-white text-lg font-bold rounded-md
                  ${
                    cell === 0
                      ? "bg-gray-600"
                      : `bg-${2 ** Math.log2(cell) > 128 ? "blue" : "yellow"}-${
                          cell > 8 ? "500" : "200"
                        }`
                  }
                `}
                style={{ height: "70px", width: "70px" }}
              >
                {cell !== 0 ? cell : ""}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
