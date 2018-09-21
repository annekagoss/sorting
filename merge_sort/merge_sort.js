const randomArray = Array.from({length: 64}, (v, i) => Math.round(Math.random()*100));
const result = mergeSort(randomArray);
console.log("random", randomArray);
console.log("sorted", result);

function mergeSort(array) {
    const pairs = [];
    const mergedPairs = [];
    let result = [];

    for ( let i = 0; i < array.length; i += 2 ) {
    		const pair = [array[i], array[i+1]];
        const sortedPair = sortPair(pair);
        pairs.push(sortedPair);
    }

    for (let j = 0; j < pairs.length; j +=2 ) {
        const merged = mergePairs(pairs[j], pairs[j+1]);
        mergedPairs.push(merged);
    }

    while (mergedPairs.length > 1) {
    		const merged = mergePairs(mergedPairs[0], mergedPairs[1]);
        result = mergePairs(result, merged);
        mergedPairs.shift();
        mergedPairs.shift();
    }

		return result;
}

function sortPair([a, b]) {
	const first = Math.min(a, b);
  const second = Math.max(a, b);
  return [first, second];
}

function mergePairs(pair1, pair2) {
		const mergedPair = [];

    while (pair1.length > 0 && pair2.length > 0) {
        if (pair1[0] <= pair2[0]) {
            mergedPair.push(pair1[0]);
            pair1.shift();
        } else {
            mergedPair.push(pair2[0]);
            pair2.shift();
        }
    }

    const remainderPair = [pair1, pair2].sort((a, b) => a.length > b.length)[1];

    while (remainderPair.length > 1) {
    		if (remainderPair[0] <= remainderPair[1]) {
        		mergedPair.push(remainderPair[0]);
            remainderPair.shift();
        } else {
        		mergedPair.push(remainderPair[1]);
            remainderPair.splice(1, 1);
        }
    }
    if (remainderPair.length === 1) {
        mergedPair.push(remainderPair[0]);
        remainderPair.shift();
    }

    return mergedPair;
}

mergeSort(randomArray);
