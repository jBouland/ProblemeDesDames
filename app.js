var data = [];
var bestFitness;
var currentFitness;

function generateBoard(size){
	data = [];
	for (var i = 0; i < size; i++) {
		data[i] = i + 1;
	}

};

function callAlgoRecuitSimule(){
	$("#result-recuit").empty();

	var start = performance.now();

	algoRecuitSimule(); 

	var end = performance.now();

	var time = end - start;
	$("#result-recuit").append(" Temps d'execution : "+time.toFixed(1) + "ms");

}

function algoRecuitSimule(){
	var n1 = $("#n1").val();
	var n2 = $("#n2").val();
	var micron = $("#micron").val();
	var temperature = $("#temperature").val();
	if($("#size").val() > 3){
		generateBoard($("#size").val());		
	}
	if(! data.length > 3){
		return;
	}
	// console.log("n1 : ",n1);
	// console.log("n2 : ",n2);
	// console.log("micron : ",micron);
	// console.log("temperature : ",temperature);

	bestFitness = currentFitness = getFitness(data); 
	for (var i = 0; i < n1; i++) {
		for (var j = 1; j < n2; j++) {
			if(bestFitness != 0){
				data = switchColumns(data.slice(), parseInt(temperature));		
			}
			else{
				console.log("Meilleur Solution Trouvée, nombre d'itérations :"+ ((i * 300) + j));
				j = n2;
				i = n1;
			}
		}
		console.log("n1 = " +i + " Nouvelle temperature ! : " + micron*temperature + "au lieu de "+ temperature)
		console.log("Meilleur Solution actuelle :", bestFitness);
		temperature = micron*temperature;
	}
	// console.log("Solution Trouvée : ");
	var fitness = getFitness(data);
	console.log(data, fitness);
	$("#result-recuit").append("Meilleur fitness : ", fitness);

};

function switchColumns(_data, temperature){
	// console.log("TEMPERATURE : ", temperature);
	var firstCol = Math.floor((Math.random() * _data.length)); 
	var secondCol= Math.floor((Math.random() * _data.length)); 
	while(secondCol == firstCol){
		var secondCol= Math.floor((Math.random() * _data.length)); 
	}
	tempo = _data[firstCol] ;
	_data[firstCol] = _data[secondCol];
	_data[secondCol] = tempo;

	// console.log('inversion de ' + firstCol + 'avec ' + secondCol)

	var _dataFitness = getFitness(_data);
	//var dataFitness = getFitness(data);

	if(_dataFitness - currentFitness <= 0 ){
		// console.log(getFitness(_data), getFitness(data));
		if(_dataFitness < bestFitness){
			bestFitness = _dataFitness;		
		}
		// console.log("nouvelle fitness < temperature, mise à jour... " + getFitness(_data) +"<"+ temperature)
		currentFitness = _dataFitness;
		return _data;
	} else{
		// console.log("nouvelle fitness - ancienne fitesse > 0");
		var p = Math.random();
		var x = -(_dataFitness - currentFitness) / temperature;
		//console.log("x = " + x);
		if(p < Math.exp(x)){
		//console.log("Math.exp(x) = " + Math.exp(x));
			// console.log("p < exp(x) mise à jour...");
			currentFitness = _dataFitness;
			return _data;
		}else{
			// console.log("p > exp(x) return pas de changement");
			return data;
		}
	}
}

function getFitness(_data){
	var fitness = 0;
	for (var i = 0; i < _data.length; i++) {
		for (var j = i+1; j < _data.length; j++) {
			if(_data[i] == _data[j] || _data[i] == _data[j] + (j-i) || _data[i] == _data[j] - (j-i)){ // Si 2 reines se touchent
				fitness ++;
			}
		}
	}
	return fitness;
}


function updateFitness(_data, _fitness, index_1, value_1, index_2, value_2){
	var fitness = _fitness;
	for (var j = index_1 + 1; j < _data.length; j++) {
			if(_data[j] == value_1 || _data[j] == value_1 + (j - index_1)){ // Si 2 reines se touchent
				fitness++;
			}
		}
		for (var j = index_1 + 1; j >= 0; j--) {
			if(_data[j] == value_1 || _data[j] == value_1 - (j - index_1)){ // Si 2 reines se touchent
				fitness++;
			}
		}
		for (var j = index_2 + 1; j < _data.length; j++) {
			if(_data[j] == value_2 || _data[j] == value_2 + (j - index_2)){ // Si 2 reines se touchent
				fitness++;
			}
		}
		for (var j = index_2 + 1; j >= 0; j--) {
			if(_data[j] == value_2 || _data[j] == value_2 - (j - index_2)){ // Si 2 reines se touchent
				fitness++;
			}
		}
		return fitness;
	}

	function callAlgoTaboo(){


		$("#result-taboo").empty();

		var start = performance.now();

		algoTaboo(); 

		var end = performance.now();

		var time = end - start;
		$("#result-taboo").append(" Temps d'execution : "+time.toFixed(1) + "ms");
	};

	function algoTaboo(nbPermut){
	//TEST
	nbPermut = 5000;
	//
	var sizeTaboo = parseInt($("#tabooSize").val());
	var arrayTaboo = new LinkedList();
	var bestAnswer = [];
	var bestFitness;
	var iteration = 0;
	generateBoard(parseInt($("#size").val()));

	var fitness =  bestFitness = getFitness(data);
	while(iteration < nbPermut && bestFitness !== 0){
		iteration++;
		var response;
		if(data.length<=8){
			response =  bestVoisinTaboo(data, arrayTaboo);
		} else {
			response = bestRandomVoisinTaboo(data, arrayTaboo);
		}
		
		data = response[0];
		if(response[1] < bestFitness){
			bestAnswer = response[0];
			bestFitness =  response[1];
			if(arrayTaboo.length >= sizeTaboo){
				arrayTaboo.remove(0);
				arrayTaboo.add(response[2]);
			}
		}
	}

	$("#result-taboo").append("Meilleur fitness : ", bestFitness);
	console.log("Fitness : " + bestFitness);
	console.log("Iterations : " + iteration);
	console.log(bestAnswer);
	return;

};

function isTaboo(arrayTaboo, permut){
	for(var i=0; i<arrayTaboo.length; i++){
		if((arrayTaboo[i][0] == permut[0] && arrayTaboo[i][1] == permut[1]) || (arrayTaboo[i][0] == permut [1] && arrayTaboo[i][1] == permut[0])){
			return true;
		}
	}
	return false;
}

/*
* This function return the best neighbour with its fitness and the permutation
* @params data = the current data, taboo = the taboo list
* @return : an array with the best neighbour, its fitness and the permutation
*/
function bestVoisinTaboo(data, taboo){
	var bestVoisin = [];
	var fitness;
	var bestFitness;
	var permut = [];
	for(var i=0; i<data.length; i++){
		for(var j= i+1; j<data.length; j++){
			if(!isTaboo(taboo, [data[i], data[j]])){
				var arrayTemp = data.slice();
				arrayTemp[i] = data[j];
				arrayTemp[j] = data[i];
				fitness = getFitness(arrayTemp);
				if(bestFitness=== undefined || fitness < bestFitness){
					bestFitness = fitness;
					bestVoisin = arrayTemp.slice();
					permut = [i, j];
				}
			}
		}
	}
	return [bestVoisin, bestFitness, permut];
}

function bestRandomVoisinTaboo(data, taboo){
	var rand1, rand2;
	var permut = [];
	var bestFitness;
	var bestVoisin;
	for (var i = 0; i < 50; i++) {
		var arrayTemp = data.slice();
		rand1 = Math.floor(Math.random()* data.length);
		do{
			rand2 = Math.floor(Math.random()* data.length);
		} while(rand1 === rand2);

		arrayTemp[rand1] = data[rand2];
		arrayTemp[rand2] = data[rand1];
		var fitness = getFitness(arrayTemp);
		if(bestFitness=== undefined || fitness < bestFitness){
			bestFitness = fitness;
			bestVoisin = arrayTemp.slice();
			permut = [rand1, rand2];
		}
	}
	return [bestVoisin, bestFitness, permut];
};


function callAlgoGenetique(){

	$("#result-genetic").empty();

	var start = performance.now();

	algoGenetique(); 

	var end = performance.now();

	var time = end - start;
	$("#result-genetic").append(" Temps d'execution : "+time.toFixed(1) + "ms");

};

function algoGenetique(){
	var gameSize = $("#size").val()
	var populationSize = $("#population").val()
	var nbiteration = $("#nbiteration").val()
	var probacroisement = $("#croisement").val()
	console.log("size : ", gameSize);
	var population = [];

	reproduction(population, populationSize, gameSize, nbiteration, probacroisement);

};

function reproduction(population, populationSize, gameSize, nbiteration, probacroisement){
	var values = [];
	for (var i = 0; i < gameSize; i++) {
		values[i] = i + 1;
	}

	for (var i = 0; i < populationSize ; i++) {
		population[i] = generateRandomBoard(values.slice());
		population[i].score = getFitness(population[i]);
	}
	var bestSolution = getBestSolution(population);
	var population = EvaluationPopulation(population);

	for (var i = 0; i < nbiteration; i++) {
		if(Math.random() < probacroisement){
			var selectedPopulation = SelectionTournoi(population);
			//console.log("SelectionTournoi selectedPopulation", selectedPopulation)
			population = croisement(selectedPopulation);
			//console.log("croisement, population", population)
		}
		else{
			population = mutation(population);
			//console.log("mutation, population", population)
		}
		population = EvaluationPopulation(population);
		bestSolution = getBestSolution(population);
		console.log(i+"/"+nbiteration);
		console.log("Meilleur solution : ", bestSolution);
		console.log("Fitness de la meilleur solution : ", bestSolution.score);

		if(bestSolution == 0){
			break;
		}
	}


	$("#result-genetic").append("Meilleur fitness : ", bestSolution.score);


}

function EvaluationPopulation(population){
	for (var i = 0; i < population.length; i++) {
		population[i].score = getFitness(population[i]);
	}
	return population;
}

function SelectionTournoi(population){

	var localpopulation = population.slice();

	var newpopulation = [];
	for (var i = 0; localpopulation.length != 0; i++) {
		var first = Math.floor((Math.random() * localpopulation.length)); 
		var second= Math.floor((Math.random() * localpopulation.length)); 
		while(second == first){
			var second= Math.floor((Math.random() * localpopulation.length)); 
		}
		var firstSolution = localpopulation[first];
		var secondSolution = localpopulation[second];

		if(firstSolution.score > secondSolution.score){
			newpopulation[i] = secondSolution;
		}
		else{
			newpopulation[i] = firstSolution;
		}

		localpopulation.splice(localpopulation.indexOf(firstSolution), 1);
		localpopulation.splice(localpopulation.indexOf(secondSolution), 1);
	}

	return newpopulation;
}


function SelectionCroissante(population){

	var localpopulation = population.slice();
	var size = population.length / 2;

	var newpopulation = [];
	for (var i = 0; i < size; i++) {
		newpopulation[i] = getMinvalue(localpopulation);
	}
	return newpopulation;
}

function getMinvalue(array){
	var min = array[0];
	var minindex = 0;
	for (var i = 0; i < array.length; i++) {
		if(array[i].score < min){
			min = array[i];
			minindex = i;
		}
	}
	array.splice(minindex, 1);
	return min;
}


function generateRandomBoard(values){

	var data=[];
	size = values.length;

	for (var i = 0; i < size; i++) {
		var elementIndex = Math.floor(Math.random()* values.length);
		data[i] = values[elementIndex];
		values.splice(elementIndex, 1);

	}
	return data;

};

function croisement(population){

	newpopulation = [];

	for (var i = 0; i < population.length; i++) {
		if(i == population.length - 1 && population.length % 2 == 1){ // Si on choppe le dernier qui est tout seul (car nb impair)
			newpopulation[i] = population[i];
			break;
		}
		newpopulation[i] = [];
		newpopulation[i + 1] = [];
		for(var j = 0; j < population[i].length; j++){
			if(j < population[i].length / 2){
				newpopulation[i][j] = population[i][j];
				newpopulation[i + 1][j] = population[i + 1][j];
			}
			else{
				newpopulation[i][j] = population[i + 1][j];
				newpopulation[i + 1][j] = population[i][j];
			}
		}
		i++;
	}

	return newpopulation.concat(population);


}

function getBestSolution(population){
	var bestScore = population[0].score + 1;
	var bestPopulation = null;
	for (var i = 0; i < population.length; i++) {
		if(population[i].score < bestScore){
			bestScore = population[i].score;
			bestPopulation = population[i];
		}
	}
	return bestPopulation;
}

function mutation(population){

	var indexpopulation = Math.floor((Math.random() * population.length)); 
	var indexdame = Math.floor((Math.random() * population[indexpopulation].length)); 
	population[indexpopulation][indexdame] = Math.floor((Math.random() * population[indexpopulation].length)); 

	return population;
}
