<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	
	html,body,div,img{
		padding: 0;
		margin: 0;
	}
	img{
		vertical-align: middle;
		border:none
	}
	input,button{
		outline: none;
		border: none;
		background-color: transparent;
	}
</style>
