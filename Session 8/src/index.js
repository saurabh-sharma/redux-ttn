import { createStore } from 'redux';


/*
//Simple Example:
const reducer = (state=0, action) => {
    console.log (action.type)
    switch (action.type) {
        case 'INC': {
            return + action.data;
        }
        case 'DEC': {
            return - action.data;
        }
    }
    return state;
}
*/

const initialState = {
    counter: 0,
    value: 50,
}

const reducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        case 'INC': {
            const counter = state.counter + action.data;
            return { ...state, counter };
        }
        case 'DEC': {
            const counter = state.counter - action.data;
            return { ...state, counter };
        }
    }
    return state;
}


//const store = createStore(reducer, initial value (if not using object));
const store = createStore(reducer);
store.subscribe(() => {
    console.log("State Updated", store.getState())
})


//Action creator
const incrementAction = (data) => {
    return { type: 'INC', data }
}

const decrementAction = (data) => {
    return { type: 'DEC', data }
}

//calling by action creators 

store.dispatch(incrementAction(5));
store.dispatch(incrementAction(10));
store.dispatch(decrementAction(4));


store.dispatch({ type: 'INC', data: 5 });
store.dispatch({ type: 'INC', data: 6 });
store.dispatch({ type: 'INC', data: 9 });
store.dispatch({ type: 'INC', data: 3 });
store.dispatch({ type: 'DEC', data: 2 });
store.dispatch({ type: 'DEC', data: 2 });
store.dispatch({ type: 'x', data: 6 });










