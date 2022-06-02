<template>
	<ul v-if="paginas > 1">
		<li v-for="pagina in paginas" :key="pagina">
			<router-link :to="{ query: query(pagina) }">{{ pagina }}</router-link>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'ProdutosPaginacao',
	props: {
		itemsPorPag: {
			type: Number,
			default: 0,
		},
		itemsTotal: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		paginas() {
			const res = this.itemsTotal / this.itemsPorPag;

			return res !== Infinity ? Math.ceil(res) : 0;
		},
	},
	methods: {
		query(page) {
			return {
				...this.$route.query,
				_page: page,
			};
		},
	},
};
</script>

<style scoped>
ul {
	grid-column: 1 / -1;
}

li {
	display: inline-block;
}

li a {
	padding: 4px 8px;
	border-radius: 2px;
	margin: 4px;
}

li a.router-link-exact-active,
li a:hover {
	background-color: #87f;
	color: #fff;
}
</style>
