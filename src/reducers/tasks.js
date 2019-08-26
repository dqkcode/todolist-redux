import * as types from './../constants'
import _ from 'lodash';

let c4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
}
let genId = () => {
    return c4() + c4() + '-' + c4() + c4() + '-' + c4() + c4()
}
let index = -1;
const data = (localStorage && localStorage.getItem('localStorage_tasks')) ? JSON.parse(localStorage.getItem('localStorage_tasks')) : []

const initialState = data


export default (state = initialState, action) => {

    switch (action.type) {
        case types.SHOW_ALL_TASKS:
            console.log('show all');
            return state
        case types.ADD_TASK:
            let new_task = {}
            new_task.id = genId()
            new_task.name = action.task.inputName
            new_task.status = action.task.selectStatus
            state.push(new_task)
            localStorage.setItem('localStorage_tasks', JSON.stringify(state))
            return [...state]
        case types.UPDATE_STATUS:
            index = _.findIndex(state, (task) => task.id === action.id)
            state[index].status = !state[index].status
        
            localStorage.setItem('localStorage_tasks', JSON.stringify(state))
            return [...state];
        case types.DELETE_TASK:
            index = _.findIndex(state, (task) => task.id === action.id)
            state.splice(index,1)
            localStorage.setItem('localStorage_tasks', JSON.stringify(state))

            return [...state];

        default:
            return state
    }
}
