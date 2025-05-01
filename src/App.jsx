import { useState } from "react";

export default function App(){
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);

  function addItem(e){
    if(!newItem) return;
    e.preventDefault();
    setItems([...items, newItem]);
    setNewItem("");
  }

  function clearItems(){
    setItems([]);
    setCompletedItems([]);
  }

  function deleteItem(index){
    setItems(items.filter((_, i) => i !== index));
    setCompletedItems(completedItems.filter((i) => i !== index));
  }

  function toggleComplete(index){
    setCompletedItems(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  }

  return(
    <>
    <div>
      <h1>TO-DO LIST</h1>
      <input value={newItem} onChange={(e) => setNewItem(e.target.value)} type="text" placeholder="Add a new item" />
      <button onClick={addItem}>Add</button>
    </div>
    <div>
      <h1>LISTS</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <span style={{ textDecoration: completedItems.includes(index) ? 'line-through' : 'none' }}>
              {item}
            </span>
            <button onClick={() => toggleComplete(index)}>
              {completedItems.includes(index) ? 'Uncomplete' : 'Complete'}
            </button>
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={clearItems}>Clear</button>
    </div>
    </>
  )
}
