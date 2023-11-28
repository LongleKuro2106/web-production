import React from 'react';

const Item = ({ item, handleIncrease, handleDecrease, handleRemove }) => {
  return (
    <li key={item.id}>
      {item.name} : 
      <button onClick={() => handleDecrease(item.id)}> &lt; </button>
      {item.quantity}
      <button onClick={() => handleIncrease(item.id)}> &gt; </button>
      <button onClick={() => handleRemove(item.id)}>Remove</button>
    </li>
  );
}

export default Item;