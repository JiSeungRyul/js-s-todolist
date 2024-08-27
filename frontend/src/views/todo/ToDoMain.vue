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
  computed: {
    ...mapState({
      curDateTime: state => state.curDateTime,
      selectedDate: state => state.selectedDate,
      todos: state => state.todos,
      newTodo: state => state.newTodo,
    }),
    ...mapGetters(['completionRate']),

    formattedSelectedDate() {
      return this.selectedDate.toDateString();
    },
    
    isNextDisabled() {
      // 선택된 날짜가 오늘 날짜보다 크거나 같으면 버튼 활성화
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정
      return this.selectedDate >= today;
    },
  },
  methods: {
    ...mapActions(['getCurDateTime','addTodo','getTodo','patchDelTodo','patchDoneTodo']),
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
      // this.getTodoByDate();
    },
    nextDay(){
      const newDate = new Date(this.selectedDate);
      newDate.setDate(newDate.getDate() + 1);
      this.SET_SELECTED_DATE(newDate);
      // this.getTodoByDate();
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