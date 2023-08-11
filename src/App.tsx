import React from 'react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import MyUnits from './MyUnits';

initializeIcons();

function App() {

  return (
    <div className="App">
      <MyUnits />
    </div>
  );
}

export default App;
