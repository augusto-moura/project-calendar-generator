import Vue from 'vue';
import GeradorCalendarioProjeto from './GeradorCalendarioProjeto.vue';
import VCalendar from 'v-calendar';

Vue.use(VCalendar);

new Vue({
	render: h => h(GeradorCalendarioProjeto),
}).$mount('#app')

Vue.config.productionTip = true;
window.env = process.env.NODE_ENV;