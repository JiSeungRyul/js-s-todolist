<template>
    <div class="home">
        <p>Hi</p>
        <h1>Welcome to SR`s TO-DO APP</h1>
        <button @click="goToToDo">Start</button>
    </div>
</template>

<script>
export default {
  name: 'AppHome',
  methods: {
    goToToDo() {
      this.$router.push('/todo');
    }
  }
}
</script>

<style>

</style>