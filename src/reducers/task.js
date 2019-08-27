import * as types from '../constants'

let objectState = {

}
const initialState = objectState


export default (state = initialState, action) => {

    switch (action.type) {
        case types.EDIT_TASK:
            console.log('action.task - reducer:', action.task);
            return {...action.task}
       

        default:
            return state
    }
}