import { createStore } from 'single-source';

const initialState = {
    counter: 0,
};

export const store = createStore(initialState);
export const COUNTER = 'counter';
export const increase = n => (n + 1);
export const square = n => (n * n);
