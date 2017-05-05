var data = [];

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

function algoTaboo(){
	
};