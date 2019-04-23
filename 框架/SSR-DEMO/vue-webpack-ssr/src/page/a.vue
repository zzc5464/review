<template>
  <div>
    a
  </div>
</template>
<script>
export default {
  serverRequest(store) {
		return store.dispatch('getMsg')
	},
  mounted() {
    
  }
}
</script>
