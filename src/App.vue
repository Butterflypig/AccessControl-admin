<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>

import AppHeader from './components/page/header'
import Aside from './components/page/aside'

export default {
  	name: 'App',
	components:{
		AppHeader,
		Aside
	}
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
	
	html, body, div, ul, li, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, form, input, textarea, th, td, select {
		margin: 0;
		padding: 0;
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

	.el-select{
		width: 130px;
		height: 42px;
		background-color: transparent;
	}
	.el-input__inner {
        background-color: transparent;
	}
	
    .el-select-dropdown__list{
		/* background-color: red; */
	}
	.el-select-dropdown__item{
		background-color: transparent;
	}
</style>
