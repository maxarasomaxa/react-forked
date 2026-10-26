import React, { useState } from 'react';
import Translate from './components/translate';
import './App.css';

function App() {
  const [text, setText] = useState('');

  return (
    <div className="App" style={{ padding: '20px' }}>
      {/* Единственный элемент input на странице */}
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Введите русское слово..."
        style={{ fontSize: '20px', padding: '10px', width: '300px' }}
      />
      
      {/* Компонент Translate выведет результат в единственный тег h1 */}
      <Translate text={text} />
    </div>
  );
}

export default App;