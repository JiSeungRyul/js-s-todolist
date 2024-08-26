<template>
    <div class="todo-main">
      <h1>To-Do List</h1>
      <p>Today is {{ curDateTime }}...</p>
      <h3>Write your To-Do list here!</h3>

      <p>What to do next...</p>
      <input 
        type="text" 
        v-model="newTodo" 
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
      todos: state => state.todos,
      newTodo: state => state.newTodo,
    }),
    ...mapGetters(['completionRate']),
  },
  methods: {
    ...mapActions(['getCurDateTime','addTodo','getTodo','patchDelTodo','patchDoneTodo']),
    ...mapMutations(['SET_NEW_TODO']),

    handleUpdateNewTodo(event) {
      updateNewTodo(this.SET_NEW_TODO, event);
    },
    handleDeleteTodo(itemId) {
      deleteTodo(this.patchDelTodo, this.getTodo, itemId);
    },
    handleUpdateCpltStatus(itemId, isCompleted) {
      updateCpltStatus(this.patchDoneTodo, this.getTodo, itemId, isCompleted);
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