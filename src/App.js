import React from 'react';

import StoreProvider from './store';
import FormList from './Components/FormList';
import ListGroup from './Components/ListGroup';

function App() {
  return <StoreProvider>
    <br/>
    <div className="container border border-dark" style={{padding: '2%'}}> 
      <FormList />
      <br/>
      <ListGroup />
    </div>
  </StoreProvider>
}

export default App;
