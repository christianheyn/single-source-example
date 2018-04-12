import React from 'react';
import ReactDOM from 'react-dom';
import { makeReactConnect, createStore } from 'single-source';
import './index.css';

const initialState = {
    counter: 0,
};

const store = createStore(initialState);
const COUNTER = 'counter';
const increase = n => (n + 1);
const square = n => (n * n);

const handleIncrease = () => store.dispatch({
    path: COUNTER,
    payload: increase,
});

const handleSquare = () => store.dispatch({
    path: COUNTER,
    payload: square,
});

const CounterDisplay = props => (
    <input type={'number'} readOnly value={props.counter || 0} />
);

const ConnectedCounterDisplay = makeReactConnect(
    React,
    store,
    { counter: COUNTER },
)(CounterDisplay);

const App = () => (
    <div className="app">
        <ConnectedCounterDisplay />
        <button onClick={handleIncrease}>+ 1</button>
        <button onClick={handleSquare}>n * n</button>
    </div>
);

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
