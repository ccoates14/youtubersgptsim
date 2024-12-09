<template>
  <img alt="Vue logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_4N37TIgWC_QLpspNwGddZH8DhzljeYMFnA&s">
  <div id="app">
    <GroupMessages />
  </div>
</template>

<script>
import GroupMessages from './components/GroupMessages.vue'

export default {
  name: 'App',
  components: {
    GroupMessages,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
