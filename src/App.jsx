import React, { useState, useEffect } from 'react';

const NumberGrid = () => {
  const highlightedNumbers = new Set([1, 12, 23, 34, 45, 56, 67, 78, 89, 100, 109, 118, 127, 136, 145, 154, 163, 172, 181, 192, 203, 214, 225]); 
    
    const initialRedNumbers = [9, 20, 29, 38, 47, 56, 65, 74, 83, 92, 101, 112, 123, 134, 145, 156, 167, 178, 189, 200, 209, 218, 227];
    const [redNumbers, setRedNumbers] = useState(new Set(initialRedNumbers));
    
    const [directions, setDirections] = useState(initialRedNumbers.map(() => "left")); 

    useEffect(() => {
      const interval = setInterval(() => {
        setRedNumbers((prevRedNumbers) => {
          const updatedNumbers = new Set();
  
          [...prevRedNumbers].forEach((number, index) => { 
            let col = number % 10;
            if (col === 0) col = 10; 
  
            let newNumber = number;
            let newDirection = directions[index];
  
            if (newDirection === "left") {
              if (col > 1) {
                newNumber = number - 1; 
              } 
              else if(col === 1) {
                newNumber = number + 1;
                newDirection = "right"; 
              }
              else {
                newDirection = "right"; 
              }
            } else {
              if (col < 10) {
                newNumber = number + 1; 
              } 
              else if(col === 10) {
                newNumber = number - 1;
                newDirection = "left"; 
              }
              else {
                newDirection = "left"; 
              }
            }
  
            directions[index] = newDirection; 
            updatedNumbers.add(newNumber); 
          });
  
          setDirections([...directions]); 
          return updatedNumbers; 
        });
      }, 500);
  
      return () => clearInterval(interval);
    }, [directions]);


return (
    <div className='flex justify-center bg-gray-300'>
      <div className='grid grid-cols-10 grid-rows-23 p-4 w-fit h-fit '>
      {Array.from({length: 230}).map((_, index) => (
        <div key={index} className={`h-20 w-20 bg-black text-white flex items-center justify-center border
        ${highlightedNumbers.has(index+1) ? 'bg-blue-900 text-white' : ''}
        ${redNumbers.has(index+1) ? 'bg-red-500 text-white' : ''}`}>
          {index+1}
        </div>
      ))}
    </div>
    </div>
)
};
export default NumberGrid;
