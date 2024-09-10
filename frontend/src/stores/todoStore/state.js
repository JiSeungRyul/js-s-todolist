import { formatDateToYMD } from '@/utils/todoMethods';

export const state = () => ({
    curDateTime: '',
    selectedDate: formatDateToYMD(new Date()), 
    newTodo: '',
    todos: {
      list_id: null,
      items:[]
    },
})