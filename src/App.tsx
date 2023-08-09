import React, { useState } from 'react';
import NameList from './NameList';
import useNameScraper from './useNameScraper';
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons();

function App() {
  const { unitStrings, fetchData, isLoading } = useNameScraper();
  const [filter] = useState('');

  return (
    <div className="App">
      <h1>My App</h1>
      <button onClick={fetchData}>Fetch Data</button>
      {isLoading ? <p>Loading...</p> : <NameList />}
    </div>
  );
}

export default App;
