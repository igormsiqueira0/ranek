<template>
	<section>
		<h2>Endereço de envio</h2>
		<UsuarioForm>
			<button class="btn" @click.prevent="finalizarCompra">
				Finalizar compra
			</button>
		</UsuarioForm>
	</section>
</template>

<script>
import UsuarioForm from '@/components/UsuarioForm.vue';
import { api } from '@/services';
import { mapState } from 'vuex';

export default {
	name: 'FinalizarCompra',
	props: ['produto'],
	components: {
		UsuarioForm,
	},
	computed: {
		...mapState(['user']),
		compra() {
			return {
				comprador_id: this.user.email,
				vendedor_id: this.produto.usuario_id,
				produto: this.produto,
				endereco: {
					cep: this.user.cep,
					rua: this.user.rua,
					numero: this.user.numero,
					bairro: this.user.bairro,
					cidade: this.user.cidade,
					estado: this.user.estado,
				},
			};
		},
	},
	methods: {
		async criarTransacao() {
			return api.post('/transacao', this.compra).then(() => {
				this.$router.push({ name: 'compras' });
			});
		},
		async criarUsuario() {
			await this.$store.dispatch('criarUsuario', this.$store.state.user);
			await this.$store.dispatch('getUsuario', this.$store.state.user.email);
			await this.criarTransacao();
			this.$router.push({ name: 'usuario' });
		},
		finalizarCompra() {
			if (this.user.isLogged) this.criarTransacao();
			else this.criarUsuario();
		},
	},
};
</script>

<style scoped>
h2 {
	margin-top: 40px;
	margin-bottom: 20px;
}

.btn {
	background: #e80;
}
</style>
