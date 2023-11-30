import React from 'react';

const Input = ({ input, setInput, handleAdd }) => {
  return (
    <>
      <input id='adding-input'
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Add item" 
      />
      <button id='btn' onClick={handleAdd}>Add</button>
    </>
  );
}

export default Input;