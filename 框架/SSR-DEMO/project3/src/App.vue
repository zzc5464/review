<template>
  <div>
    <h1>vue ssr</h1>
    <router-link to="/">home</router-link>
    <router-link to="/a">a</router-link>
    <router-link to="/animal">animal</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data(){
    return {
      a: 1
    }
  },
  mounted() {
    
  }
}
</script>
