import { FETCH_USERS, RECEIVE_USERS, FETCH_JOBS, RECEIVE_JOBS } from './actions';

const defaultState = {
    usersList: [],
    userArray: [],
    jobsList: []
}

export const rootReducer = function (state = defaultState, action) {
    switch (action.type) {
        case FETCH_USERS:
            return state;
        case RECEIVE_USERS:
            return Object.assign({}, state, { usersList: action.users })
        case FETCH_JOBS:
            return state;
        case RECEIVE_JOBS:
            return Object.assign({}, state, { jobsList: action.jobs })
        case 'userArray':
            { return { ...state, userArray: action.userArray } }
        default:
            return state;
    }
}