import React from 'react';
import { makeReactConnect, createStore } from 'single-source';

const initialState = { counter: 0 };

const store = createStore(initialState);
const { dispatch } = store;
const COUNTER = 'counter';
const increase = n => (n + 1);
const square = n => (n * n);

const handleClear = () => dispatch({
    path: COUNTER,
    payload: 0,
});

const handleIncrease = () => dispatch({
    path: COUNTER,
    payload: increase,
});

const handleSquare = () => dispatch({
    path: COUNTER,
    payload: square,
});

const DumbDisplay = ({ counter }) => <input type={'number'} readOnly value={counter || 0} />
const CounterDisplay = makeReactConnect(React, store, { counter: COUNTER })(DumbDisplay);

export const Counter = () => (
    <React.Fragment>
        <CounterDisplay />
        <button onClick={handleIncrease}>n + 1</button>
        <button onClick={handleSquare}>n * n</button>
        <button onClick={handleClear}>clear</button>
    </React.Fragment>
);
