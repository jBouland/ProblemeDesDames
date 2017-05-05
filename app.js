var data = [];
//Un état voisin = une permutation

function generateBoard(size){
	for (var i = 0; i < size; i++) {
		data[i] = i + 1;
	}

};

function checkValidity(){

};


function callAlgoRecuitSimule(){
	console.time('algoRecuitSimule');
	algoRecuitSimule(); 
	console.timeEnd('algoRecuitSimule');
}

function algoRecuitSimule(){
	var temperature = $("#temperature").val();
	if($("#size").val() > 3){
		generateBoard($("#size").val());		
	}
	if(! data.length > 3){
		return;
	}
	var fitness = getFitness(data);
	while(fitness !== 0){
		console.log("fitness : ", fitness)
		data = switchColumns(data, fitness + parseInt(temperature));
		var fitness = getFitness(data);
	}

	console.log("Solution Trouvée : ");
	console.log(data);

};

function switchColumns(_data, temperature){

	console.log("TEMPERATURE : ", temperature);

	var firstCol = Math.floor((Math.random() * _data.length)); 
	var secondCol= Math.floor((Math.random() * _data.length)); 
	while(secondCol == firstCol){
		var secondCol= Math.floor((Math.random() * _data.length)); 
	}
	tempo = _data[firstCol] ;
	_data[firstCol] = _data[secondCol];
	_data[secondCol] = tempo;

	console.log('inversion de ' + firstCol + 'avec ' + secondCol)

	if(getFitness(_data) < temperature){
		console.log("nouvelle fitness < temperature, mise à jour... " + getFitness(_data) +"<"+ temperature)
		return _data
	} else{
		console.log("nouvelle fitness > temperature, pas de changement  " + getFitness(_data) +"<"+ temperature)
		return data
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

function algoGenetique(){
	
};

function algoTaboo(nbPermut){
	//TEST
	nbPermut = 2000;
	//
	var sizeTaboo = 3;
	var arrayTaboo = new LinkedList();
	var bestAnswer = [];
	var bestFitness = 100;
	var fitness =  bestFitness = getFitness(data);
	var iteration = 0;
	if(data.length !== 0){
		generateBoard(parseInt($("#size").val()));
	}

	while(iteration < nbPermut || bestFitness !== 0){
		iteration++;
		var response = bestVoisinTaboo(data, arrayTaboo);
		data = response[1];
		if(response[1] < bestFitness){
			bestAnswer = response[0];
			bestFitness =  response[1];
			if(arrayTaboo.length >= sizeTaboo){
				arrayTaboo.remove(0);
				arrayTaboo.add(response[2]);
			}
		}
	}
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
	var bestFitness = 100;
	var permut = [];
	for(var i=0; i<data.length; i++){
		for(var j= i+1; j<data.length; j++){
			if(!isTaboo(taboo, [data[i], data[j]])){
				var arrayTemp = data.slice();
				arrayTemp[i] = data[j];
				arrayTemp[j] = data[i];
				fitness = getFitness(arrayTemp);
				if(fitness < bestFitness){
					bestFitness = fitness;
					bestVoisin = arrayTemp.slice();
					permut = [i, j];
				}
			}
		}
	}
	return [bestVoisin, bestFitness, permut];
}
