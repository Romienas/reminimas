import React from 'react';
import List from './routes/list';
import Registration from './routes/registration';
import FourZeroFour from './routes/404';
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
        <Route path='/*'>
          <FourZeroFour />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
