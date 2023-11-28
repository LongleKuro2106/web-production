import React from 'react';

const Input = ({ input, setInput, handleAdd }) => {
  return (
    <>
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Add item" 
      />
      <button onClick={handleAdd}>Add</button>
    </>
  );
}

export default Input;