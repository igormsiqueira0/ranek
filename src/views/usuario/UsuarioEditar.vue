<template>
	<section>
		<UsuarioForm>
			<button class="btn" @click.prevent="atualizarUsuario">
				Atualizar usuário
			</button>
		</UsuarioForm>
	</section>
</template>

<script>
import UsuarioForm from '@/components/UsuarioForm.vue';
import { api } from '@/services';

export default {
	name: 'UsuarioEditar',
	components: {
		UsuarioForm,
	},
	methods: {
		atualizarUsuario() {
			api
				.put(`/usuario/${this.$store.state.user.id}`, this.$store.state.user)
				.then(() => {
					this.$store.dispatch('getUsuario');
					this.$router.push({ name: 'usuario' });
				})
				.catch((err) => {
					console.log(err.response);
				});
		},
	},
};
</script>

<style scoped></style>
