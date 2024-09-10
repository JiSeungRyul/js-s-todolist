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
        @keyup.enter="addNewTodo"
        :disabled="!isToday"
      />
      <button @click="addNewTodo">+</button>
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
    ...mapActions(['getCurDateTime', 'addTodo', 'getTodo', 'patchDelTodo', 'patchDoneTodo']),
    ...mapMutations(['SET_NEW_TODO','SET_SELECTED_DATE']),

    handleUpdateNewTodo(event) {
      this.SET_NEW_TODO(event.target.value);
    },
    async addNewTodo() {
      if (!this.newTodo || this.newTodo.trim() === '') {
        alert('Please write to do');
        return;
      }
      try {
        await this.addTodo();
        this.SET_NEW_TODO('');
      } catch (error) {
        alert('Failed to add to-do. Please try again.');
      }
    },
    async handleDeleteTodo(itemId) {
      try {
        await this.patchDelTodo(itemId);
        alert('To-do deleted successfully');
      } catch (error) {
        alert('Failed to delete. Please try again.');
      }
    },
    async handleUpdateCpltStatus(itemId, isCompleted) {
      const isCpt = isCompleted ? 'Y' : 'N';
      try {
        await this.patchDoneTodo({ itemId, isCpt });
      } catch (error) {
        alert('Failed to update status. Please try again.');
      }
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