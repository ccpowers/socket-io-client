import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    socket.on('server chat message', (msg: string) => {
      console.log('got msg', msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      console.log('Disconnecting from socket');
      //socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      console.log('emitting client chat message');
      socket.emit('client chat message', input);
      setInput('');
    }
  };

  return (
    <div className="App">
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;

