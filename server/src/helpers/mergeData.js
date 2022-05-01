const mergeData = async function (firstDataset, secondDataset) {
  const mergedResult = [];
  for (let firstId in firstDataset) {
    for (let secondId in secondDataset) {
      if (firstDataset[firstId].tank_id === (secondDataset[secondId].IDNum || secondDataset[secondId].id)) {
        mergedResult.push({
          ...firstDataset[firstId],
          ...secondDataset[secondId],
        });
      }
    }
  }
  return mergedResult;
};

module.exports = mergeData;
