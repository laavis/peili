import React from 'react';

export const handleEditTest = (index, dataType, setChanged) => data => {
  setChanged();
  let newData = [...dataType];
  newData[index] = { ...newData[index], ...data };
};
