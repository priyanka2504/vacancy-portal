import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { rootReducer } from '../redux/reducers';
import { getUsers, getJobs } from '../redux/actions';
import Login from './Login';
import AddPost from './AddPost';
import ViewPost from './ViewPost';
import ApplyPost from './ApplyPost';
import Register from './Register';
import '../styling/App.css';

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
)

store.dispatch(getUsers());
store.dispatch(getJobs());

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className='App'>
                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/admin-add-post" component={AddPost} />
                        <Route exact path="/admin-view-post" component={ViewPost} />
                        <Route exact path="/apply-post" component={ApplyPost} />
                    </Switch>
                </div>
            </Provider>
        )
    }
}

export default App;