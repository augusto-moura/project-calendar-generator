<template>
	<div class="d-block">
		<h1>Gerador de calendário de projeto</h1>
		<div class="d-block lista-etapas">
			<p>Defina as etapas do projeto:</p>

			<div class="d-block etapa-projeto">
				<label for="">
					Nome da etapa:
				</label>
				<input type="text" />
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
			</div>

			<div class="d-block mt-1 mb-2">
				<button class="botao-adicionar-etapa">Adicionar etapa</button>
			</div>
			<div class="d-block mt-2">
				<button class="botao-gerar-calendario">Gerar calendário</button>
			</div>
		</div>

		<div class="d-block" style="width: 800px; margin-top: 30px">
			<v-calendar 
				:from-page="{ month: 1, year: 2019 }" 
				:attributes="attrs" 
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
			attrs: [
				{
					highlight: {
						start: { fillMode: 'light', color: 'red' },
						base: { fillMode: 'light', color: 'red' },
						end: { fillMode: 'light', color: 'red' },
					},
					dates: { start: new Date(2019, 0, 14), end: new Date(2019, 1, 18) },
				},
			],
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