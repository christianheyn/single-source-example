import React from 'react';
import { makeReactConnect, createStore } from 'single-source';

const initialState = {
    toDoItems: [],
    doneItems: [],
    futureItem: '',
};

const store = createStore(initialState);
const { dispatch } = store;
const TODO_ITEMS = 'toDoItems';
const DONE_ITEMS = 'doneItems';
const FUTURE_ITEM = 'futureItem';

const handleItemDelete = id => dispatch({
    path: DONE_ITEMS,
    payload: items => items.filter(item => item.id !== id),
});

const handleItemDone = (id) => {
    const todoItems = store.getState(TODO_ITEMS);
    const doneItem = todoItems.filter(item => id === item.id)[0];

    dispatch({
        path: TODO_ITEMS,
        payload: items => items.filter(item => id !== item.id),
    });

    dispatch({
        path: DONE_ITEMS,
        payload: items => [ doneItem, ...items ],
    });
};

const handleAddItem = () => {
    const futureItem = store.getState(FUTURE_ITEM);

    if (futureItem === '') {
        return undefined;
    }

    dispatch({
        path: TODO_ITEMS,
        payload: items => [ { id: Date.now(), label: futureItem }, ...items ],
    });

    dispatch({
        path: FUTURE_ITEM,
        payload: '',
    });
};

const handleInputChange = event => dispatch({
    path: FUTURE_ITEM,
    payload: event.target.value,
});

const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
        handleAddItem();
    }
}

const ItemList = props => props.items.map(({ id, label }) => (
    <div key={id} className={props.className || 'item'}>
        { label }
        <button onClick={() => props.onClick(id)}>{ props.btnText }</button>
    </div>
));

const DumbInput = props => <input {...props} />;
const DumbLabel = ({ value }) => <label>{ value ? `add: ${value}` : 'something to do?' }</label>;

const ToDoItems = makeReactConnect(React, store, { items: TODO_ITEMS })(ItemList);
const DoneItems = makeReactConnect(React, store, { items: DONE_ITEMS })(ItemList);
const ItemInput = makeReactConnect(React, store, { value: FUTURE_ITEM })(DumbInput);
const ItemLabel = makeReactConnect(React, store, { value: FUTURE_ITEM })(DumbLabel);

export const ToDoApp = () => (
    <React.Fragment>
        <ItemLabel />
        <ItemInput onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
        <button onClick={handleAddItem}>add</button>
        <span>To Do:</span>
        <ToDoItems onClick={handleItemDone} btnText={'done'} className={'todo-item'} />
        <span>Done:</span>
        <DoneItems onClick={handleItemDelete} btnText={'remove'} className={'done-item'} />
    </React.Fragment>
);
