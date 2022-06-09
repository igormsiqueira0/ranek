<template>
	<section>
		<div v-if="compras">
			<h2>Compras</h2>
			<div
				class="produtos-wrapper"
				v-for="(compra, index) in compras"
				:key="compra.produto + ' ' + index"
			>
				<ProdutoItem v-if="compra.produto" :produto="compra.produto">
					<p class="vendedor">
						<span>Vendedor: </span>
						{{ compra.vendedor_id }}
					</p>
				</ProdutoItem>
			</div>
		</div>
	</section>
</template>

<script>
import ProdutoItem from '@/components/ProdutoItem.vue';
import { api } from '@/services';
import { mapState } from 'vuex';

export default {
	name: 'UsuarioCompras',
	components: {
		ProdutoItem,
	},
	data() {
		return {
			compras: null,
		};
	},
	computed: {
		...mapState(['user', 'isLogged']),
	},
	methods: {
		getCompras() {
			api.get(`/transacao?comprador_id=${this.user.id}`).then((r) => {
				this.compras = r.data;
			});
		},
	},
	watch: {
		isLogged() {
			this.getCompras();
		},
	},
	created() {
		if (this.isLogged) this.getCompras();
	},
};
</script>

<style scoped>
.produto-wrapper {
	margin-bottom: 40px;
}

.vendedor span {
	color: #e80;
}

h2 {
	margin-bottom: 20px;
}
</style>
