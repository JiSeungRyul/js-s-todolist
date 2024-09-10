export const getters = {
    completedTaskCount: (state) => {
        if (!state.todos.items || !Array.isArray(state.todos.items)) {
            return 0;
        }
        return state.todos.items.filter(item => item.is_cpt === 'Y').length;
      },
      
    completionRate: (state, getters) => {
        if (!state.todos.items || state.todos.items.length === 0) {
            return 0;
        }
        return ((getters.completedTaskCount / state.todos.items.length) * 100).toFixed(2);
    }
}