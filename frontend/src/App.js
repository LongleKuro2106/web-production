import React, { useState, useEffect } from 'react';
import './App.css'
import Item from './components/Item';
import Input from './components/Input';
import itemService from './services/ItemApi';

const App = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    itemService.getAll().then(initialItems => {
      setItems(initialItems);
    });
  }, []);

  const handleAdd = () => {
    if (input.trim() !== '') {
      const existingItem = items.find(item => item.name.toLowerCase() === input.toLowerCase());
      if (existingItem) {
        setNotification(`Item "${input}" already exists!`);
        setTimeout(() => setNotification(null), 3000);
      } else {
        const newItem = { name: input, quantity: 1 };
        itemService.create(newItem).then(returnedItem => {
          setItems(items.concat(returnedItem));
          setInput('');
          setNotification(`Item "${input}" added!`);
          setTimeout(() => setNotification(null), 3000);
        });
      }
    } else {
      setNotification('Please enter an item!');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleRemove = (id) => {
    itemService.remove(id).then(() => {
      setItems(items.filter(item => item.id !== id));
      setNotification('Item removed!');
      setTimeout(() => setNotification(null), 3000);
    });
  };

  const handleIncrease = (id) => {
    const item = items.find(n => n.id === id);
    const changedItem = { ...item, quantity: item.quantity + 1 };
    itemService.update(id, changedItem).then(returnedItem => {
      setItems(items.map(item => item.id !== id ? item : returnedItem));
    });
  };

  const handleDecrease = (id) => {
    const item = items.find(n => n.id === id);
    if (item.quantity > 1) {
      const changedItem = { ...item, quantity: item.quantity - 1 };
      itemService.update(id, changedItem).then(returnedItem => {
        setItems(items.map(item => item.id !== id ? item : returnedItem));
      });
    }
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Shopping List</h1>
        <Input input={input} setInput={setInput} handleAdd={handleAdd} />
        <ul>
          {items.map((item, index) => (
            <Item
              item={item} 
              index={index} 
              handleIncrease={handleIncrease} 
              handleDecrease={handleDecrease} 
              handleRemove={handleRemove} 
            />
          ))}
        </ul>
        <p id='total-item'> Total items : {totalItems} </p> 
        {notification && <p>{notification}</p>}
      </header>
    </div>
  );
}

export default App;