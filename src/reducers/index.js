import { combineReducers } from 'redux'
import tasks from './tasks';
import showInfoForm from './statusInfoForm';
import taskEdit from './task';
export default combineReducers({
    tasks,
    showInfoForm,
    taskEdit
})
