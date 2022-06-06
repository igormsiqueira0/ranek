<template>
	<section class="produtos-container">
		<transition mode="out-in">
			<ul class="produtos" v-if="data && data.length" key="produtos">
				<li class="produto" v-for="(produto, index) in data" :key="index">
					<router-link :to="{ name: 'produto', params: { id: produto.id } }">
						<img
							v-if="produto.fotos"
							:src="produto.fotos[0].src"
							:alt="produto.fotos[0].titulo"
						/>
						<p class="preco">{{ produto.preco | precoFilter }}</p>
						<h2 class="titulo">{{ produto.nome }}</h2>
						<p class="descricao">{{ produto.descricao }}</p>
					</router-link>
				</li>
				<ProdutosPaginacao
					:itemsPorPag="itemsPorPag"
					:itemsTotal="itemsTotal"
				/>
			</ul>

			<div v-else-if="data && data.length === 0" key="sem-resultados">
				<p class="sem-resultados">
					Busca sem resultados. Tente buscar outro termo.
				</p>
			</div>

			<PaginaCarregando v-else key="carregando" />
		</transition>
	</section>
</template>

<script>
import { api } from '@/services';
import { serialize } from '@/helpers';
import ProdutosPaginacao from '@/components/ProdutosPaginacao.vue';

export default {
	name: 'ProdutosLista',
	data() {
		return {
			data: null,
			itemsPorPag: 9,
			itemsTotal: 0,
		};
	},
	components: {
		ProdutosPaginacao,
	},
	computed: {
		url() {
			const queryString = serialize(this.$route.query);

			return `/produto?_limit=${this.itemsPorPag}${queryString}`;
		},
	},
	methods: {
		async getData() {
			this.data = null;
			api.get(this.url).then((r) => {
				this.data = r.data;
				this.itemsTotal = +r.headers['x-total-count'];
			});
		},
	},
	watch: {
		url() {
			this.getData();
		},
	},
	created() {
		this.getData();
	},
};
</script>

<style scoped>
.produtos-container {
	max-width: 1000px;
	margin-inline: auto;
}

.produtos {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 30px;
	margin: 30px;
}

.produto {
	box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
	padding: 10px;
	background-color: #fff;
	border-radius: 4px;
	transition: all 0.2s;
}

.produto:hover {
	box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
	transform: scale(1.1);
	position: relative;
	z-index: 1;
}

.produto img {
	border-radius: 4px;
	margin-block-end: 20px;
}

.titulo {
	margin-block-end: 10px;
}

.preco {
	color: #e80;
	font-weight: bold;
}

.sem-resultados {
	text-align: center;
}
</style>
