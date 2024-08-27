export const state = () => ({
    curDateTime: '',
    selectedDate: new Date(), 
    newTodo: '',
    todos: {
      list_id: null,
      items:[]
    },
})