<template>
	<section>
		<h2>Crie a sua conta</h2>
		<transition mode="out-in">
			<button v-if="!criar" @click="criar = true" class="btn">
				Criar conta
			</button>
			<UsuarioForm v-else>
				<button class="btn btn-form" @click.prevent="criarUsuario">
					Criar usuário
				</button>
			</UsuarioForm>
		</transition>
	</section>
</template>

<script>
import UsuarioForm from '@/components/UsuarioForm.vue';

export default {
	name: 'LoginCriar',
	data() {
		return {
			criar: false,
		};
	},
	components: {
		UsuarioForm,
	},
	methods: {
		async criarUsuario() {
			await this.$store.dispatch('criarUsuario', this.$store.state.user);
			await this.$store.dispatch('getUsuario', this.$store.state.user.email);
			this.$router.push({ name: 'usuario' });
		},
	},
};
</script>

<style scoped>
h2 {
	text-align: center;
	margin-block-start: 40px;
	margin-block-end: 10px;
}

.btn {
	width: 100%;
	max-width: 300px;
	margin-inline: auto;
}

.btn-form {
	max-width: 100%;
}
</style>
