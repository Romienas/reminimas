import React from 'react'
import List from './routes/list'
import Registration from './routes/registration'
import FourZeroFour from './routes/404'
import {Switch, Route} from 'react-router-dom'
import ProtectedRoute from './routes/protectedRoute'
import Admin from './routes/admin'
import AddProduct from './routes/addProduct'
import Profile from './routes/profile'
import Orders from './routes/orders'
import Main from './routes/main'
import { Privacy } from './routes/privacy'
import { PrivacyPop } from './modules/privacyPop'
import { LoginPage } from './routes/loginPage'
import UserContextProvider from './contexts/user'
import OrderProcedure from './routes/orderProcedure'

export default class App extends React.Component {
  render(){
    return (
      <div className='container'>
        <UserContextProvider>
          { localStorage.getItem('admin') === 'true' ?
            <Switch>
              <Route path='/list' exact>
                  <List />
              </Route>
              <Route path='/' exact>
                <Main />
              </Route>
              <Route path='/registration' exact>
                <Registration />
              </Route>
              <Route path='/privacy' exact>
                <Privacy />
              </Route>
              <Route path='/login' exact>
                  <LoginPage />
              </Route>
              <Route path='/orderprocedure' exact>
                  <OrderProcedure />
              </Route>
              <ProtectedRoute path='/admin' component={Admin} />
              <ProtectedRoute path='/add-product' component={AddProduct} />
              <ProtectedRoute path='/profile' component={Profile} />
              <ProtectedRoute path='/orders' component={Orders} />
              <Route path='/*'>
                <FourZeroFour />
              </Route>
            </Switch> :
            <Switch>
              <Route path='/list' exact>
                <List />
              </Route>
              <Route path='/' exact>
                <Main />
              </Route>
              <Route path='/registration' exact>
                <Registration />
              </Route>
              <Route path='/privacy' exact>
                <Privacy />
              </Route>
              <Route path='/login' exact>
                <LoginPage />
              </Route>
              <Route path='/orderprocedure' exact>
                  <OrderProcedure />
              </Route>
              <ProtectedRoute path='/profile' component={Profile} />
              <ProtectedRoute path='/orders' component={Orders} />
              <Route path='/*'>
                <FourZeroFour />
              </Route>
            </Switch>
          }
          <PrivacyPop />
        </UserContextProvider>
      </div>
    )
  }
}