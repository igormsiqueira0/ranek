<template>
	<section>
		<div v-if="produto" class="produto">
			<ul class="fotos" v-if="produto.fotos">
				<li v-for="(foto, index) in produto.fotos" :key="index">
					<img :src="foto.src" :alt="foto.titulo" />
				</li>
			</ul>

			<div class="info">
				<h1>{{ produto.nome }}</h1>
				<p class="preco">{{ produto.preco | precoFilter }}</p>
				<p class="descricao">{{ produto.descricao }}</p>
				<transition v-if="produto.vendido === 'false'" mode="out-in">
					<button class="btn" v-if="!finalizar" @click="finalizar = true">
						Comprar
					</button>
					<FinalizarCompra v-else :produto="produto" />
				</transition>
				<button v-else class="btn" disabled>Produto vendido</button>
			</div>
		</div>

		<PaginaCarregando v-else />
	</section>
</template>

<script>
import { api } from '@/services.js';
import FinalizarCompra from '@/components/FinalizarCompra.vue';

export default {
	name: 'ProdutoView',
	props: ['id'],
	components: {
		FinalizarCompra,
	},
	data() {
		return {
			produto: null,
			finalizar: false,
		};
	},
	methods: {
		getData() {
			api.get(`/produto/${this.id}`).then((r) => {
				this.produto = r.data;
			});
		},
	},
	created() {
		this.getData();
	},
};
</script>

<style scoped>
.produto {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 30px;
	max-width: 900px;
	padding: 60px 20px;
	margin-inline: auto;
}

.preco {
	color: #e80;
	font-weight: bold;
	font-size: 1.5rem;
	margin-block-end: 40px;
}

.descricao {
	font-size: 1.2rem;
}

.btn {
	margin-block-start: 60px;
	width: 200px;
}
</style>
