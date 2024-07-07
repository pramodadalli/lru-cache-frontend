    import React, { useState } from 'react';
    import axios from 'axios';
    import './CacheComponent.css'; // Import CSS file for styling

    const CacheComponent = () => {
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [expiration, setExpiration] = useState(10); // Default expiration time in seconds
    const [response, setResponse] = useState('');

    const handleGetCache = async () => {
        try {
        const url = `http://localhost:8080/cache/${encodeURIComponent(key)}`;
        const response = await axios.get(url);
        setResponse(JSON.stringify(response.data));
        } catch (error) {
        console.error('Error fetching cache:', error);
        setResponse('Error fetching cache');
        }
    };

    const handleSetCache = async () => {
        try {
        const url = `http://localhost:8080/cache/${encodeURIComponent(key)}`;
        const data = { value, expiration };
        const response = await axios.put(url, data);
        if (response.status === 200) {
            setResponse('Cache value set successfully');
        } else {
            setResponse('Failed to set cache value');
        }
        } catch (error) {
        console.error('Error setting cache:', error);
        setResponse('Error setting cache');
        }
    };

    const handleDeleteCache = async () => {
        try {
          const url = `http://localhost:8080/cache/${encodeURIComponent(key)}`;
          const response = await axios.delete(url);
          if (response.status === 200) {
            setResponse('Cache value deleted successfully');
          } else {
            setResponse('Failed to delete cache value');
          }
        } catch (error) {
          console.error('Error deleting cache:', error);
          setResponse('Error deleting cache');
        }
      };

    return (
        <div className="cache-container">
        <h2>Cache Operations</h2>
        <div className="input-group">
            <label>Key:</label>
            <input type="text" value={key} onChange={(e) => setKey(e.target.value)} />
        </div>
        <div className="input-group">
            <label>Value:</label>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <div className="input-group">
            <label>Expiration (seconds):</label>
            <input type="number" value={expiration} onChange={(e) => setExpiration(e.target.value)} />
        </div>
        <div className="button-group">
            <button onClick={handleGetCache}>Get from Cache</button>
            <button onClick={handleSetCache}>Set to Cache</button>
            <button onClick={handleDeleteCache}>Delete from Cache</button>
        </div>
        <div className="response">
            <h3>Response:</h3>
            <pre>{response}</pre>
        </div>
        </div>
    );
    };

    export default CacheComponent;
