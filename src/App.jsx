import React, { useState, useEffect } from 'react';

const NumberGrid = () => {
  const rows = 23;
  const cols = 10;

  
  const initialRedNumbers = [9, 20, 29, 38, 47, 56, 65, 74, 83, 92, 101, 112, 123, 134, 145, 156, 167, 178, 189, 200, 209, 218, 227];

  
  const highlightedNumbers = new Set([1, 12, 23, 34, 45, 56, 67, 78, 89, 100, 109, 118, 127, 136, 145, 154, 163, 172, 181, 192, 203, 214, 225]);

  const gridNumbers = Array.from({ length: rows }, (_, rowIndex) => 
    Array.from({ length: cols }, (_, colIndex) => 
      rowIndex * cols + colIndex + 1
    )
  );

  const [redNumbers, setRedNumbers] = useState(new Set(initialRedNumbers));

  useEffect(() => {
    const interval = setInterval(() => {
      setRedNumbers((prevRedNumbers) => {
        const newRedNumbers = new Set();

        prevRedNumbers.forEach((number) => {
          const row = Math.floor((number - 1) / cols); 
          const col = (number - 1) % cols;

          if (col === 0) {
            const nextRow = (row === rows - 1) ? 0 : row + 1; 
            newRedNumbers.add(nextRow * cols + col + 1);
          } else if (col <= 4) {
            
            const nextCol = (col === cols - 1) ? 0 : col + 1; 
            newRedNumbers.add(row * cols + nextCol + 1);
          } else {
          
            const prevCol = (col === 0) ? cols - 1 : col - 1;
            newRedNumbers.add(row * cols + prevCol + 1);
          }
        });

        return newRedNumbers;
      });
    }, 500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-10 w-full">
      {gridNumbers.flat().map((number, index) => (
        <div 
          key={index} 
          className={`border border-white bg-black flex items-center justify-center aspect-square text-sm 
                     ${highlightedNumbers.has(number) ? 'bg-blue-900 text-white' : ''}
                     ${redNumbers.has(number) ? 'bg-red-500 text-white' : 'text-white'}`}
        >
          {number}
        </div>
      ))}
    </div>
  );
};

export default NumberGrid;
