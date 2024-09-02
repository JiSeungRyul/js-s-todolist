<template>
    <div class="todo-main">
      <h1>To-Do List</h1>
      <p> Today is {{ curDateTime }}... </p>
      <p> 
        <button @click="prevDay">←</button>
        {{ formattedSelectedDate }}
        <button @click="nextDay" :disabled="isNextDisabled">→</button>
      </p>
      <h3>Write your To-Do list here!</h3>

      <p>What to do next...</p>
      <input 
        type="text" 
        :value="newTodo"
        placeholder="What to do next..."
        @input="handleUpdateNewTodo"
        @keyup.enter="addTodo"
        :disabled="!isToday"
      />
      <p>--------------------------</p>
      <p>What to do today...</p>
      <ul v-if="todos && todos.items.length">
        <li v-for="item in todos.items" :key="item.item_id">
          <input
            type="checkbox"
            :checked="item.is_cpt === 'Y'"
            @change="handleUpdateCpltStatus(item.item_id, $event.target.checked)"
          />
          <span :style="{ textDecoration: item.is_cpt === 'Y' ? 'line-through' : 'none' }">
            {{ item.item_title }} {{ item.due_date }}
          </span>
          <button @click="handleDeleteTodo(item.item_id)">X</button>
        </li>
      </ul>
      <ul v-else>
        <p>There are no registered todos yet....</p>
      </ul>
      <p>{{ this.completionRate }}% in progress...</p>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import { updateNewTodo, deleteTodo, updateCpltStatus } from '@/utils/todoMethods';

export default {
  name: 'ToDoMain',
  data() {
    return {
      menu: false,
    }
  },
  computed: {
    ...mapState({
      curDateTime: state => state.curDateTime,
      selectedDate: state => state.selectedDate,
      todos: state => state.todos,
      newTodo: state => state.newTodo,
    }),
    ...mapGetters(['completionRate']),

    formattedSelectedDate() {
        const date = new Date(this.selectedDate);
        return date.toDateString();
    
    },
    
    isNextDisabled() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(this.selectedDate);
      selectedDate.setHours(0, 0, 0, 0);
      
      return selectedDate >= today;
    },

    isToday() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(this.selectedDate);
      selectedDate.setHours(0, 0, 0, 0);

      return selectedDate.getTime() === today.getTime();
    }
  },
  methods: {
    ...mapActions(['getCurDateTime','addTodo','getTodo','patchDelTodo','patchDoneTodo','getTodoByDate']),
    ...mapMutations(['SET_NEW_TODO','SET_SELECTED_DATE']),

    handleUpdateNewTodo(event) {
      updateNewTodo(this.SET_NEW_TODO, event);
    },
    handleDeleteTodo(itemId) {
      deleteTodo(this.patchDelTodo, this.getTodo, itemId);
    },
    handleUpdateCpltStatus(itemId, isCompleted) {
      updateCpltStatus(this.patchDoneTodo, this.getTodo, itemId, isCompleted);
    },
    prevDay(){
      const newDate = new Date(this.selectedDate);
      newDate.setDate(newDate.getDate() - 1);
      this.SET_SELECTED_DATE(newDate);
      this.getTodo();
    },
    nextDay(){
      const newDate = new Date(this.selectedDate);
      newDate.setDate(newDate.getDate() + 1);
      this.SET_SELECTED_DATE(newDate);
      this.getTodo();
    }
  },
  mounted() {
    this.getCurDateTime();
    this.getTodo();
  },
}
</script>

<style>

</style>