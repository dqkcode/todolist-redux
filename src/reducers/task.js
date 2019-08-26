import * as types from '../constants'
let showInfoForm = {

}
const initialState = showInfoForm


export default (state = initialState, action) => {

    switch (action.type) {
        case types.EDIT_TASK:
        console.log('action :', action);
            return {...action.task}

        default:
            return state
    }
}