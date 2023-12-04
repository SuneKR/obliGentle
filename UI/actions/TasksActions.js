export const CREATE_TASK = 'CREATE_TASK';
export const READ_ONE_TASK = 'READ_ONE_TASK';
export const READ_GROUP_TASKS = 'READ_GROUP_TASKS';
export const READ_ALL_TASKS = 'READ_ALL_TASKS';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const createTask = (task) => ({
    type: CREATE_TASK,
    data: { task }
});

export const readOneTask = (task) => ({
    type: READ_ONE_TASK,
    data: { task }
});

export const readGroupTasks = (tasks) => ({
    type: READ_GROUP_TASKS,
    data: { tasks }
});

export const readAllTasks = (tasks) => ({
    type: READ_ALL_TASKS,
    data: { tasks }
});

export const updateTask = (task) => ({
    type: UPDATE_TASK,
    data: { task }
});

export const deleteTask = (id) => ({
    type: DELETE_TASK,
    data: { id }
});
