import React from 'react';

import Container from '@mui/material/Container'

import ElectricityTable from './Components/ElectricityTable';
import NavBar from './Components/NavBar';
import OptionsBar from './Components/OptionsBar'

const App = () => {
  return (
    <Container>
      <div className="App">
        <header className="App-header">
          <NavBar></NavBar>
        </header>
        <OptionsBar></OptionsBar>
        <ElectricityTable></ElectricityTable>
      </div>
    </Container>
  );
}

export default App;
