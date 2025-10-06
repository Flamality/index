import React, { useState } from 'react';
import { client } from '../../../services/appwrite'; // your Appwrite config here

export default function AppwriteConnect() {
  const [status, setStatus] = useState('idle');
  const [response, setResponse] = useState(null);

  const sendPing = async () => {
    setStatus('loading');
    try {
      const result = await client.ping();
      setResponse(JSON.stringify(result));
      setStatus('success');
    } catch (err) {
      setResponse(err.message || 'Ping failed');
      setStatus('error');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Appwrite Connection Checker</h1>
      <p>Status: {status}</p>
      <button onClick={sendPing} disabled={status === 'loading'}>
        {status === 'loading' ? 'Pinging...' : 'Send Ping'}
      </button>
      {response && (
        <pre style={{ marginTop: '1rem', background: '#eee', padding: '1rem' }}>
          {response}
        </pre>
      )}
    </div>
  );
}
