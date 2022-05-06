import React from 'react';

import StoreProvider from './store';
import Form_Group from './Components/Form_Group';
import ListGroup from './Components/ListGroup';
import Footer from './Components/footer';

function App() {
  return <StoreProvider>
    <br/>
    <div className="container border border-dark" style={{padding: '2%'}}> 
      <Form_Group />
      <br/>
      <ListGroup />
    </div>
    <Footer />
  </StoreProvider>
 
}

export default App;
