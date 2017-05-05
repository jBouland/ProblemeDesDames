var data = [];
//Un état voisin = une permutation

function generateBoard(size){
	for (var i = 0; i < size; i++) {
		data[i] = i + 1;
	}

};

function checkValidity(){

};

function algoRecuitSimule(){
	console.log($("#size").val());

};

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
