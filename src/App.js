import React, { useState } from 'react';
import Translate from './components/translate';

function App() {
  const [text, setText] = useState('');

  return (
    <div className="App" style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      {/* Ровно один элемент input */}
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Введите русское слово..."
        style={{ fontSize: '20px', padding: '10px', width: '300px' }}
      />
      
      {/* Компонент Translate выведет перевод в единственный тег h1 */}
      <Translate text={text} />
    </div>
  );
}

export default App;