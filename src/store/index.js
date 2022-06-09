import { api } from '@/services';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	string: true,
	state: {
		isLogged: false,
		user: {
			id: '',
			nome: '',
			email: '',
			senha: '',
			cep: '',
			rua: '',
			numero: '',
			bairro: '',
			cidade: '',
			estado: '',
		},
		userProducts: null,
	},
	getters: {},
	mutations: {
		UPDATE_LOGIN(state, payload) {
			state.isLogged = payload;
		},
		UPDATE_USUARIO(state, payload) {
			state.user = Object.assign(state.user, payload);
		},
		UPDATE_USUARIO_PRODUTOS(state, payload) {
			state.userProducts = payload;
		},
		ADD_USUARIO_PRODUTOS(state, payload) {
			state.userProducts.unshift(payload);
		},
	},
	actions: {
		getUsuarioProdutos(context) {
			api.get(`/produto?usuario_id=${context.state.user.id}`).then((r) => {
				context.commit('UPDATE_USUARIO_PRODUTOS', r.data);
			});
		},
		getUsuario(context, payload) {
			api.get(`/usuario/${payload}`).then((r) => {
				context.commit('UPDATE_USUARIO', r.data);
				context.commit('UPDATE_LOGIN', true);
			});
		},
		criarUsuario(context, payload) {
			context.commit('UPDATE_USUARIO', { id: payload.email });
			api.post('/usuario', payload);
		},
		deslogarUsuario(context) {
			context.commit('UPDATE_USUARIO', {
				id: '',
				nome: '',
				email: '',
				senha: '',
				cep: '',
				rua: '',
				numero: '',
				bairro: '',
				cidade: '',
				estado: '',
			});
			context.commit('UPDATE_LOGIN', false);
		},
	},
	modules: {},
});
