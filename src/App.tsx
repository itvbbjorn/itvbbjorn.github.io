import React from 'react';
import NameList from './NameList';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import MyUnits from './MyUnits';

initializeIcons();

function App() {

  return (
    <div className="App">
      {/* <NameList /> */}
      <MyUnits />
    </div>
  );
}

export default App;
