import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';


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

const reducerA = (state = initialState, action) => {
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

const state2 = {
    values: [],
    users: [],
    loading: false
}


const reducerB = (state = state2, action) => {
    switch (action.type) {
        case 'INC':
            const newUsers = state.values.concat({value: action.data})
            return {...state, values: newUsers}
        case 'FETCH_VALUES':
            return {...state, users: newUsers}
        case 'LOADED_VALUES':
            return {...state, values: newUsers}
    }
    return state;
}


//Combined Reducer
const reducers = combineReducers({
    calculator: reducerA,
    loader: reducerB
})


//Middlewares
const logger = (store) => (next) => (action) => {
    console.log(`${action.type} was fired`);
    //Intercept
    if(action.type == 'INC')
    {
        action.type = 'DEC';
    }

    next(action);
}


//Async actions through Redux Thunk
const asyncAction = () => {
    return (dispatch) => { //this is dispatch method
        dispatch({type: 'INC', data: 1 }); //call started
        fetch('http://rest.learncode.academy/api/ttn/users')
        .then(response => response.json)
        .then(data => {
            dispatch({type:'FETCH_USERS', data});
        })
        .catch(err => {
            dispatch({type: 'DEC', data: 1 });
        });
    }
}


const middlewares = applyMiddleware(logger, thunkMiddleware);
const store = createStore(reducers, middlewares);


//const store = createStore(reducer, initial value (if not using object));
//const store = createStore(reducers);
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

