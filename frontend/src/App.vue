<template>
    <div id="app">
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/todo">ToDo</router-link>
        </nav>
        <router-view />
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      message: ''
    };
  },
  methods: {
    async fetchMessage() {
      try {
        const response = await axios.get('http://localhost:5000/api/test');
        this.message = response.data.message;
      } catch (error) {
        console.error('Error fetching message:', error);
      }
    }
  }
};
</script>

<style>

</style>
