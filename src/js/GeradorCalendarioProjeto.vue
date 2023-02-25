<template>
	<div class="d-block">
		<h1>Gerador de calendário de projeto</h1>
		<div class="d-block lista-etapas">
			<p>Defina as etapas do projeto:</p>

			<div v-for="etapa in etapasProjeto"
				:key="etapa.id"
				class="d-block etapa-projeto"
			>
				<label for="">
					Nome da etapa:
				</label>
				<input v-model="etapa.nome"
					type="text" 
				/>
				|
				<label for="">
					Data inicial:
				</label>
				<input type="date" />
				|
				<label for="">
					Data final:
				</label>
				<input type="date" />

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
					Adicionar etapa
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

		<div class="d-block" style="width: 800px; margin-top: 30px">
			<v-calendar 
				:from-page="vCalendarFromPage" 
				:attributes="vCalendarAttrs" 
				is-expanded 
				:rows="4" 
				:columns="3" 
			/>
		</div>
	</div>
</template>
  
<script>
export default {
	data() {
		return {
			etapasProjeto: [],
			etapasParaCalendario: [],
		}
	},
	methods: {
		addBlankEtapaProjeto(){
			this.etapasProjeto.push({
				id: this.generateRandomId(),
				nome: '',
				dataInicio: '',
				dataFim: '',
			});
		},
		removerEtapa(idEtapa){
			this.etapasProjeto = this.etapasProjeto.filter(etapa => etapa.id != idEtapa);
		},
		gerarCalendario(){
			//TODO: validar
			this.etapasParaCalendario = this.etapasProjeto;
		},
		generateRandomId(){
			let length = 8;
			let randomString = '';
			const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
			const charactersLength = characters.length;
			let counter = 0;
			while (counter < length) {
				randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
				counter += 1;
			}
			return `e${randomString}`;
		},
	},
	computed: {
		vCalendarAttrs(){
			return [
				{
					highlight: {
						start: { fillMode: 'light', color: 'red' },
						base: { fillMode: 'light', color: 'red' },
						end: { fillMode: 'light', color: 'red' },
					},
					dates: { start: new Date(2023, 0, 14), end: new Date(2023, 1, 18) },
				},
			];
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
</style>