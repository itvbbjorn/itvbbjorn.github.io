import React from 'react';
import NameList from './NameList';
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons();

function App() {

  return (
    <div className="App">
      <NameList />
    </div>
  );
}

export default App;
