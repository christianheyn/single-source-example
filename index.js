import React from 'react';
import ReactDOM from 'react-dom';
import GithubIcon from 'react-icons/lib/ti/social-github';
import { makeReactConnect, createStore } from 'single-source';
import { Counter } from './react-components/Counter';
import { ToDoApp } from './react-components/ToDoList';
import './index.css';

const Wrapper = ({ children }) => <div className={'wrapper'}>{children}</div>
const GithubLink = ({ href }) => (
    <a target={'_blank'} href={href}>source file on Github <GithubIcon /></a>
);

ReactDOM.render(
    <div className="app">
        <h1>single-source <small>React Examples</small></h1>
        <hr />

        <h2>Counter</h2>
        <GithubLink href={'https://github.com/christianheyn/single-source'} />
        <Wrapper>
            <Counter />
        </Wrapper>

        <h2>ToDo-App</h2>
        <GithubLink href={'https://github.com/christianheyn/single-source'} />
        <Wrapper>
            <ToDoApp />
        </Wrapper>
    </div>,
    document.getElementById('root'),
);
