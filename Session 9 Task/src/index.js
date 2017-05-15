import { createStore, combineReducers, applyMiddleware } from 'redux';
//import thunkMiddleware from 'redux-thunk';

//State Definition
const state1 = {
    counter_u: 0,
    counter_p:0
}

const state2 = {
    users: [],
    error_user:'' 
}

const state3 = {
    posts: [],
    error_post:''
}


const reducerOne = (state = state1, action) => {
    //console.log(action.type)
    switch (action.type) {
        case 'INC_P': {
            const counter = state.counter_p + action.data;
            return { ...state, counter };
        }
        case 'DEC_P': {
            const counter = state.counter_p - action.data;
            return { ...state, counter };
        }
    }
    return state;
}
const reducerTwo = (state = state1, action) => {
    //console.log(action.type)
    switch (action.type) {
        case 'INC_U': {
            const counter = state.counter_u + action.data;
            return { ...state, counter };
        }
        case 'DEC_U': {
            const counter = state.counter_u - action.data;
            return { ...state, counter };
        }
    }
    return state;
}

const reducerThree = (state = state2, action) => {
    switch (action.type) {
        case 'FETCH_USERS':
            //console.log(action.data)
            return {...state, users: action.data}
        case 'ERROR_USERS':
            const error_user = action.data;
            return { ...state, error_user };
    }
    return state;
}

const reducerFour = (state = state3, action) => {
    switch (action.type) {
        case 'FETCH_POSTS':
            return {...state, posts: action.data}
        case 'ERROR_POSTS':
            const error_post = action.data;
            return { ...state, error_post };
        case 'RANDOM':
            return state;
    }
    return state;
}

//Combined Reducer
const reducers = combineReducers({
    One: reducerOne,
    Two: reducerTwo,
    Three: reducerThree,
    Four: reducerFour
})


//Middlewares
const logger = (store) => (next) => (action) => {
    console.log(`${action.type} was fired`);
    next(action);
}

const asyncCallback = (store) => (next) => (action) => {
    if(typeof action == 'function') {
        action(store.dispatch);
    }  else{
        next(action);
    }
};

let fetchUsers = () => {
    console.log("Fetch Users Called")
    return (dispatch) => {
        fetch('https://jsonplaceholder.typicode.com/users') //Ajax request
        .then((response) => response.json())
        .then(data => {
            dispatch({type:'FETCH_USERS', data });
            dispatch(incrementUserCallCount(1));
        })
        .catch(err => {
            dispatch({ type: 'ERROR_USERS', data: 'An Error occured in Fetching Users' });
        });
    }
}
let fetchPosts = () => {
    console.log("Fetch Posts Called")
    return (dispatch) => {
        fetch('https://jsonplaceholder.typicode.com/posts') //Ajax request
        .then((response) => response.json())
        .then(data => {
            dispatch({type:'FETCH_POSTS', data });
            dispatch(incrementPostCallCount(1));
        })
        .catch(err => {
            dispatch({ type: 'ERROR_POSTS', data: 'An Error occured in Fetching Posts' });
        });
    }
}

const middlewares = applyMiddleware(logger, asyncCallback);
const store = createStore(reducers, middlewares);


store.subscribe(() => {
    console.log("State Updated", store.getState());
})


//Action creator
const incrementUserCallCount = (data) => {
    return { type: 'INC_U', data }
}

const decrementUserCallCount = (data) => {
    return { type: 'DEC_U', data }
}
const incrementPostCallCount = (data) => {
    return { type: 'INC_P', data }
}

const decrementPostCallCount = (data) => {
    return { type: 'DEC_P', data }
}

//calling by action creators 
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

store.dispatch(incrementUserCallCount(5));
store.dispatch(incrementUserCallCount(10));
store.dispatch(incrementUserCallCount(4));
