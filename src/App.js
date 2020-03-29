import React from 'react';
import List from './routes/list';
import Registration from './routes/registration';
import {Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className='container'>
      <Switch>
        <Route path='/' exact>
          <List />
        </Route>
        <Route path='/registration' exact>
          <Registration />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
