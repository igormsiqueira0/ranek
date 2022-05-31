<template>
	<div id="app">
		<TheHeader />
		<main>
			<router-view />
		</main>
		<TheFooter />
	</div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
	name: 'App',
	components: {
		TheHeader,
		TheFooter,
	},
};
</script>

<style>
#app {
	display: flex;
	min-height: 100vh;
	flex-direction: column;
}
main {
	flex: 1;
}

/* reset --------------------------- */
body,
ul,
li,
h1,
h2,
h3,
p {
	margin: 0;
	padding: 0;
}

*,
*::before,
*::after {
	box-sizing: border-box;
}

body {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	color: #345;
	background: url('./assets/pattern.svg') repeat top;
}

ul {
	list-style: none;
}

a {
	color: #345;
	text-decoration: none;
}

img {
	display: block;
	max-width: 100%;
}
/* utility --------------------------- */

.btn {
	display: block;
	padding: 10px 30px;
	background-color: #87f;
	border-radius: 4px;
	color: #fff;
	text-align: center;
	font-size: 1rem;
	box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
	transition: all 0.3s;
	border: none;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	cursor: pointer;
}

.btn:hover {
	background-color: #65d;
	transform: scale(1.1);
}
</style>
