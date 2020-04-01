import React from 'react';
import List from './routes/list';
import Registration from './routes/registration';
import FourZeroFour from './routes/404';
import {Switch, Route} from 'react-router-dom';
import ProtectedRoute from './routes/protectedRoute';
import Admin from './routes/admin';
import AddProduct from './routes/addProduct';
import Profile from './routes/profile';

function App() {
  return (
    <div className='container'>
      <Switch>
        <Route path='/' exact>
          <List />
        </Route>
        <ProtectedRoute path='/admin' component={Admin} />
        <Route path='/registration' exact>
          <Registration />
        </Route>
        <ProtectedRoute path='/add-product' component={AddProduct} />
        <ProtectedRoute path='/profile' component={Profile} />
        <Route path='/*'>
          <FourZeroFour />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
