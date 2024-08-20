<template>
    <div class="todo-main">
      <h1>To-Do List</h1>
      <p>Today is {{ curDateTime }}...</p>
      <h3>Write your To-Do list here!</h3>

      <p>What to do next...</p>
      <input 
        type="text" 
        v-model="newTask" 
        placeholder="What to do next..."
        @keyup.enter="addTask"
      />
      <p>--------------------------</p>
      <p>What to do today...</p>
      <ul>
        <li v-for="(task,idx) in tasks" :key="idx">
          <input
            type="checkbox"
            v-model="task.completed"
          />
          <span :style="{textDecoration: task.completed ? 'line-through':'none'}">
            {{ task.title }}
          </span>
          <button @click="delTask(idx)">X</button>
        </li>
      </ul>
      <p>{{ this.completionRate }}% in progress...</p>

      <p>--------------------------</p>
      <input
        type="text"
        v-model="newTask"
        placeholder="Enter To Do..."
      >
      <button @click="addTask1">입력</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ToDoMain',
  data() {
    return {
      curDateTime: '',
      tasks: [{title:'test', completed:true}],
      newTask: '',
      progress: 0,
    }
  },
  methods: {
    test(){
      const currentTime = new Date().toLocaleString();
      console.log(currentTime);
    },
    getCurDateTime(){
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      this.curDateTime = new Date().toLocaleDateString('en-US', options);
    },
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({
          title: this.newTask,
          completed: false
        });
        this.newTask = '';
      }
    },
    delTask(idx) {
      this.tasks.splice(idx,1);
    },
    // =============================================
    async addTask1(){
      try{
        const response = await axios.post('http://localhost:5000/api/tasks',{
          title: this.newTask,
          completed: false
        });
        console.log('addTask: ', response.data);
        this.newTask = '';
      } catch(err){
        console.log('addTask: ', err)
      }
    }
  },
  mounted() {
    this.getCurDateTime();
    console.log(this.tasks.length);
  },
  computed: {
    completedTaskCount() {
      return this.tasks.filter(task => task.completed).length;
    },
    completionRate() {
      if (this.tasks.length === 0) {
        return 0;
      }
      return ((this.completedTaskCount / this.tasks.length) * 100).toFixed(2);
    }
  }
}
</script>

<style>

</style>