<!-- home.vue -->
<template>
	<div>
		<h1>home</h1>
		<p>{{msg}}</p>
	</div>
</template>


<script>
export default {
	serverRequest(store) {
		return store.dispatch('getMsg')
	},
	mounted() {

	},
	computed: {
		msg() {
			return this.$store.state.msg
		}
	}
}
</script>