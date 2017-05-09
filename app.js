var data = [];
var bestFitness;
var currentFitness;

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

	/*

	Pour 500 reines : 
	Bons paramètres : t = 500, n1 = 150, n2 = 150, micron = 0.9

	*/
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
				console.log("Meilleur Solution Trouvée, N1:"+i+", N2:"+j);
				j = n2;
				i = n1;
			}
		}
		temperature = micron*temperature;
	}
	// console.log("Solution Trouvée : ");
	console.log(data, getFitness(data));

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
		if(p < Math.exp(x)){
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

	function algoGenetique(){

	};

	function algoTaboo(){

	};