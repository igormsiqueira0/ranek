<template>
	<header>
		<nav>
			<router-link to="/" class="logo">
				<img src="@/assets/ranek.svg" alt="Ranek" />
			</router-link>
			<router-link v-if="$store.state.isLogged" to="/usuario" class="btn">{{
				nome
			}}</router-link>
			<router-link v-else to="/login" class="btn">Vender / Login</router-link>
		</nav>
	</header>
</template>

<script>
export default {
	name: 'TheHeader',
	computed: {
		nome() {
			return this.$store.state.user.nome.replace(/ .*/, '');
		},
	},
};
</script>

<style scoped>
nav {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px 20px;
	box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}

.logo {
	padding-block: 10px;
}

.logo img {
	width: 90px;
}
</style>
