import axios from 'axios';

export const actions = {
    getCurDateTime({ commit }) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const curDateTime = new Date().toLocaleDateString('en-US', options);
        commit('SET_CUR_DATE_TIME', curDateTime);
    },
    async getTodo({ commit, state }){
        try {
            console.log(state.selectedDate); 
            const response = await axios.get('http://localhost:5000/api/todos', {
                itemDate: state.selectedDate,
            });
            commit('SET_TODOS', response.data);
        } catch(err) {
            console.log('getTodo: ', err);
            throw err;
        }
    },
    async addTodo({ commit, state }){
        try {
            const response = await axios.post('http://localhost:5000/api/todos/addToto',{
                itemTitle: state.newTodo,
                dueDate: null,
            });
            commit('SET_TODOS', response.data);
            commit('SET_NEW_TODO', '');
        } catch(err) {
            console.log('addTodo: ', err);
            throw err;
        }
    },
    async patchDelTodo({ state }, { itemId }) {
        try {
            await axios.patch(`http://localhost:5000/api/todos/${itemId}/delete`, {
                listId: state.todos.list_id
            });
        } catch(err) {
            console.log('patchDelTodo: ', err);
            throw err;
        }
    },
    async patchDoneTodo({ state }, { itemId, isCpt }){
        try {
            await axios.patch(`http://localhost:5000/api/todos/${itemId}/complete`, {
                listId: state.todos.list_id,
                isCpt: isCpt
            });
        } catch(err) {
            console.log('patchChkCplt: ', err);
            throw err;
        }
    },
}