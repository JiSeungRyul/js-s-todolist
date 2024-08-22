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
        @keyup.enter="addTodo"
      />
      <p>--------------------------</p>
      <p>What to do today...</p>
      <ul>
        <li v-for="item in todos.items" :key="item.item_id">
          <input
            type="checkbox"
            v-model="item.is_cpt"
          />
          <span :style="{ textDecoration: item.is_cpt === 'Y' ? 'line-through' : 'none' }">
            {{ item.item_title }} {{ item.due_date }}
          </span>
          <button @click="delTask(idx)">X</button>
        </li>
      </ul>
      <p>{{ this.completionRate }}% in progress...</p>

      <p>--------------------------</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ToDoMain',
  data() {
    return {
      curDateTime: '',
      todos: {
        list_id: null,
        items:[]
      },
      newTodo: '',
      progress: 0,
    }
  },
  methods: {
    getCurDateTime(){
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      this.curDateTime = new Date().toLocaleDateString('en-US', options);
    },
    delTask(idx) {
      this.todos.splice(idx,1);
    },
    async addTodo(){
      try{
        const response = await axios.post('http://localhost:5000/api/todo',{
          itemTitle: this.newTodo,
          dueDate: null
        });
        console.log('addTask: ', response.data);

        this.todos.list_id = response.data.list_id;
        this.todos.items = response.data.items;
        
        this.newTodo = '';
      } catch(err){
        console.log('addTask: ', err)
      }
    }
  },
  mounted() {
    this.getCurDateTime();
    console.log(this.todos.length);
  },
  computed: {
    completedTaskCount() {
      return this.todos.items.filter(item => item.is_cpt === 'Y').length;
    },
    completionRate() {
      if (this.todos.items.length === 0) {
        return 0;
      }
      return ((this.completedTaskCount / this.todos.items.length) * 100).toFixed(2);
    }
  }
}
</script>

<style>

</style>