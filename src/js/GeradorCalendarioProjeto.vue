<template>
	<div class="d-block">
		<h1>Gerador de calendário de projeto</h1>
		<div class="d-block lista-etapas">
			<p>Defina as etapas do projeto:</p>

			<div v-for="etapa in etapasProjeto"
				:key="etapa.id"
				class="d-block etapa-projeto"
			>
				<label :for="`${etapa.id}-nome`">
					Nome da etapa:
				</label>
				<input v-model="etapa.nome"
					:id="`${etapa.id}-nome`"
					:class="{
						'invalid-field': camposComErro[`${etapa.id}.nome`] ?? false,
						'form-field': true,
					}"
					type="text" 
				/>
				|
				<label :for="`${etapa.id}-dataInicio`">
					Data inicial:
				</label>
				<input v-model="etapa.dataInicio"
					:id="`${etapa.id}-dataInicio`"
					:class="{
						'invalid-field': camposComErro[`${etapa.id}.dataInicio`] ?? false,
						'form-field': true,
						'date-field': true,
					}" 
					type="date" 
				/>
				|
				<label :for="`${etapa.id}-dataFim`">
					Data final:
				</label>
				<input v-model="etapa.dataFim"
					:id="`${etapa.id}-dataFim`"
					type="date" 
					:class="{
						'invalid-field': camposComErro[`${etapa.id}.dataFim`] ?? false,
						'form-field': true,
						'date-field': true,
					}"
				/>

				<button @click="removerEtapa(etapa.id)"
					class="botao-remover-etapa"
				>
					Remover
				</button>
			</div>

			<div class="d-block mt-1 mb-2">
				<button @click="addBlankEtapaProjeto"
					class="botao-adicionar-etapa"
				>
					Adicionar nova etapa
				</button>
			</div>
			<div class="d-block mt-2">
				<button @click="gerarCalendario"
					class="botao-gerar-calendario"
				>
					Gerar calendário
				</button>
			</div>
		</div>

		<div class="calendar-and-legend">
			<div class="calendar">
				<v-calendar 
					:from-page="vCalendarFromPage" 
					:attributes="vCalendarAttrs" 
					is-expanded 
					:rows="4" 
					:columns="3" 
				/>
			</div>
			<div class="legend">
				<div v-if="etapasParaCalendario">
					<h3>Legenda:</h3>
					<p v-for="etapaCalendario in etapasParaCalendario"
						:key="etapaCalendario.id"
					>
						<strong :style="`color: ${etapaCalendario.legendColor}`">
							{{ etapaCalendario.nome }}
						</strong>
					</p>
				</div>
			</div>

		</div>
	</div>
</template>
  
<script>
import {generateRandomId, convertMySqlDateToDateObject /*, etapasProjetoForTesting */} from './tools.js'
export default {
	data() {
		return {
			//etapasProjeto: etapasProjetoForTesting,
			etapasProjeto: [],
			etapasParaCalendario: [],
			camposComErro: {},
		}
	},
	methods: {
		addBlankEtapaProjeto(){
			this.etapasProjeto.push({
				id: this.generateRandomId(),
				nome: '',
				dataInicio: '',
				dataFim: '',
				color: null,
				legendColor: null,
			});
		},
		removerEtapa(idEtapa){
			this.etapasProjeto = this.etapasProjeto.filter(etapa => etapa.id != idEtapa);
		},
		gerarCalendario(){
			if( ! this.validate() ){
				return;
			}
			this.realocarCoresAEtapas();
			this.etapasParaCalendario = JSON.parse(JSON.stringify(this.etapasProjeto));
		},
		realocarCoresAEtapas(){
			const colors = [
				'red',
				'blue',
				'yellow',
				'green',
				'purple',
				'pink',
				'orange',
				'gray',
				'red',
				'blue',
				'yellow',
				'green',
				'purple',
				'orange',
				'gray',
				'pink',
			];

			let currentColorIndex = 0;

			this.etapasProjeto = this.etapasProjeto.map(etapa => {
				let currentColor = colors[currentColorIndex++];
				let currentLegendColor;
				switch(currentColor){
					case 'blue': currentLegendColor = '#3182ce'; break;
					case 'yellow': currentLegendColor = '#d69e2e'; break;
					case 'green': currentLegendColor = '#38a169'; break;
					case 'purple': currentLegendColor = '#805ad5'; break;
					case 'pink': currentLegendColor = '#d53f8c'; break;
					case 'orange': currentLegendColor = '#dc6a20'; break;
					case 'gray': currentLegendColor = '#718096'; break;
					default: currentLegendColor = currentColor;
				}
				return {
					...etapa, 
					color: currentColor,
					legendColor: currentLegendColor,
				}
			})
		},
		validate(){
			this.camposComErro = {};
			
			let etapa;
			for(etapa of this.etapasProjeto){
				if(etapa.nome.length < 1){
					this.camposComErro[`${etapa.id}.nome`] = true;
				}

				if( this.isdateStringInWrongFormat(etapa.dataInicio)){
					this.camposComErro[`${etapa.id}.dataInicio`] = true;
				}
				
				if( this.isdateStringInWrongFormat(etapa.dataFim)){
					this.camposComErro[`${etapa.id}.dataFim`] = true;
				}
			}

			return Object.keys(this.camposComErro).length === 0;
		},
		isdateStringInWrongFormat(dateString){
			const dateYmdRegex = /(\d{4})-(\d{2})-(\d{2})/;

			if( dateString === null || ! dateYmdRegex.test(dateString) ){
				return true;
			}
			else{
				// eslint-disable-next-line no-unused-vars
				let [dateYmd, year, month, day] = dateString.match(dateYmdRegex);
				if(parseInt(year) === 0 || parseInt(month) === 0 || parseInt(day) === 0){
					return true;
				}
			}
		},
		generateRandomId,
		convertMySqlDateToDateObject,
	},
	computed: {
		vCalendarAttrs(){
			return this.etapasParaCalendario.map(etapa => {
				return {
					highlight: {
						start: { fillMode: 'solid', color: etapa.color },
						base: { fillMode: 'solid', color: etapa.color },
						end: { fillMode: 'solid', color: etapa.color },
					},
					dates: { 
						start: this.convertMySqlDateToDateObject(etapa.dataInicio), 
						end: this.convertMySqlDateToDateObject(etapa.dataFim), 
					},
				};
			});
		},
		vCalendarFromPage(){
			return { 
				month: 1, 
				year: new Date().getFullYear() 
			};
		}
	},
}
</script>

<style>
.form-field{
	height: 25px;
}
.date-field{
	font-size: 14px;
}
.invalid-field{
	border: 2px solid red;
}
.vc-pane {
	border: 1px solid black;
}
.d-block{
	display:block;
}
.etapa-projeto{
	border: 1px solid black;
	padding: 6px;
}
.botao-adicionar-etapa{
	background-color: #77bb77;
	color: white;
	padding: 6px;
	border: 1px solid green;
}
.botao-gerar-calendario{
	background-color: #7777bb;
	color: white;
	padding: 6px;
	border: 1px solid blue;
}
.botao-remover-etapa{
	background-color: #bb7777;
	color: white;
	padding: 6px;
	border: 1px solid red;
}
.calendar-and-legend{
	margin-top: 30px;
	display: flex;
	justify-content: stretch;
}
.calendar{
	width: 800px; 
}
.legend{
	width: 300px;
	padding-left: 20px;
}
.my-2{
	margin-top: 15px;
	margin-bottom: 15px;
}
.mt-1{
	margin-top: 5px;
}
.mt-2{
	margin-top: 15px;
}
.mb-2{
	margin-bottom: 15px;
}
*{
	font-family: Arial, Helvetica, sans-serif;
}
</style>