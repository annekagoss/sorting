const randomArray = Array.from({length: 64}, (v, i) => Math.round(Math.random()*100));
const result = mergeSort(randomArray);
console.log("random", randomArray);
console.log("sorted", result);

function mergeSort(array) {
    let result = [];

    const pairs = array.reduce((result, item, i) => {
    		if (i % 2 !== 0) return result;
    		const pair = [item, array[i+1]];
        const sortedPair = pair.sort((a, b) => a > b);
        result.push(sortedPair);
        return result;
    }, []);

   	const mergedPairs = pairs.reduce((result, item, i) => {
    		if (i % 2 !== 0) return result;
        result.push(mergePairs(pairs[i], pairs[i+1]));
        return result;
    }, []);

		return mergedPairs.reduce((result, item, i) => {
    			if (i === 1) return result;
          if (i === 0) {
              result = mergePairs(item, mergedPairs[i+1]);
              return result;
          }
          result = mergePairs(result, item);
          return result;
      }, []);
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

    const remainderPair = [pair1, pair2].find(pair => pair.length > 0);

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
