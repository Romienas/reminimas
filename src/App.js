import React from 'react';
import List from './routes/list';
import {Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div className='container'>
      <Switch>
        <Route path='/' exact>
          <List />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
