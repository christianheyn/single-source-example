import React from 'react';
import { makeReactConnect, createStore } from 'single-source';

const initialState = { counter: 0 };
const COUNTER = 'counter';
const store = createStore(initialState);
const { dispatch } = store;

const increase = n => (n + 1);
const decrease = n => (n - 1);
const square = n => (n * n);

const makeDispatchCounter = payload => () => dispatch({
    path: COUNTER,
    payload,
});

const DumbDisplay = ({ counter }) => <input type={'number'} readOnly value={counter || 0} />
const CounterDisplay = makeReactConnect(React, store, { counter: COUNTER })(DumbDisplay);

export const Counter = () => (
    <React.Fragment>
        <CounterDisplay />
        <button onClick={makeDispatchCounter(increase)}>n + 1</button>
        <button onClick={makeDispatchCounter(decrease)}>n - 1</button>
        <button onClick={makeDispatchCounter(square)}>n * n</button>
        <button onClick={makeDispatchCounter(0)}>clear</button>
    </React.Fragment>
);
