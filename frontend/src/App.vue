<template>
    <div id="app">
      <NavBar></NavBar>
      <router-view :key="$route.fullPath" />
    </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      message: ''
    };
  }
};
</script>

<style>

</style>
