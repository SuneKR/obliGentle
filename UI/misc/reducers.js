// imports
import { combineReducers } from 'redux';

// local imports
import { CREATE_TASK, READ_ONE_TASK, READ_ALL_TASKS, UPDATE_TASK, DELETE_TASK } from '../actions'

let dataState = { tasks: []};

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case CREATE_TASK: {
            let { task } = action.data;
            let clone = JSON.parse(JSON.stringify(state.tasks));
            clone.unshift(task);

            return {...state, tasks: clone};
        }

        case READ_ONE_TASK: {
            let { task } = action.data;
            let clone = JSON.parse(JSON.stringify(state.tasks));
            const index = clone.findIndex((obj) => obj.id === task.id);
            if (index !== -1) clone[index] = task;
            
            return {...state, tasks: clone}
        }
        
        case READ_ALL_TASKS: {
            let { tasks } = action.data;

            return {...state, tasks};
        }
        
        case UPDATE_TASK: {
            let { task } = action.data;
            let clone = JSON.parse(JSON.stringify(state.tasks));
            const index = clone.findIndex((obj) => obj.id === task.id);
            if (index !== -1) clone[index] = task;

            return {...state, tasks: clone};
        }

        case DELETE_TASK: {
            let { id } = action.data;
            let clone = JSON.parse(JSON.stringify(state.tasks))
            const index = clone.findIndex((obj) => obj.id === id);
            if (index !== -1) clone.splice(index, 1);
            
            return {...state, tasks: clone};
        }

        default: return state;

    }
}

const reducers = combineReducers({dataReducer});

export default reducers;