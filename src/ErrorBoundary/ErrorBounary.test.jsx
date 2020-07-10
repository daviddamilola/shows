/* eslint-disable no-undef */
import ErrorBoundary from "./ErrorBoundary";
import React from 'react';

const Child = () => {
    throw "error";
}

const swallowErrors = (codeToRun) => {
    const error = console.error;
    console.error = () => {};
    codeToRun();
    console.error = error;
}

it('catches error and displays message', () => {
    swallowErrors(() => {
        const wrapper = mount(
            <ErrorBoundary render={() => <span>uh oh!</span>}>
                <Child />
            </ErrorBoundary>
        )
    
        const text = wrapper.text();
    
        expect(text).toEqual("uh oh!")
    })
})