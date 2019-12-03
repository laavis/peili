import React from 'react';

export const handleEditTest = (index, dataType, setChanged) => data => {
  setChanged();
  let newData = [...dataType];
  newData[index] = { ...newData[index], ...data };
};

const removeTest = (index, dataSet) => () => {
  let newDataSet = [...dataSet];
  newDataSet.splice(index, 1);
};
