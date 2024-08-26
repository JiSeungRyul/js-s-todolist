export const mutations = {
    SET_CUR_DATE_TIME(state, curDateTime) {
        state.curDateTime = curDateTime;
    },
    SET_NEW_TODO(state, newTodo) {
        state.newTodo = newTodo;
    },
    SET_TODOS(state, todos) {
        state.todos = todos;
    }
}