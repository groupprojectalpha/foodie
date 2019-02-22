import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import AddItems from './components/AddItems/AddItems';
import Login from './components/Login/Login';
import LoginOptions from './components/LoginOptions/LoginOptions';
import Register from './components/Register/Register';
import Profile from  './components/Profile/Profile';
import ShoppingList from './components/ShoppingList/ShoppingList'
import Mobile from './components/MobileList/mobileList';
import AddStore from './components/AddStore/AddStore';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default (
    
    <Switch>
    <Route exact path='/' component={LoginOptions} />
    <Route path='/add' component={AddItems} />
    <Route path='/login' component={Login} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/register' component={Register} />
    <Route path='/profile' component={Profile} />
    <Route path='/shopping_list' component={ShoppingList} />
    <Route path='/mobile/:id' component={Mobile} />
    <Route path='/testing' component={AddStore} />

    </Switch>
    
)


