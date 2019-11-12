import TextField from '@material-ui/core/TextField';
import React from 'react';

export default ({ value, onChange, ...props }) => {
  const [cache, setCache] = React.useState(value);

  const handleCacheUpdate = event => {
    setCache(event.target.value);
    if (props.select) onChange(event.target.value);
  };

  const handleUpdate = event => {
    onChange(event.target.value);
  };

  return (
    <TextField
      {...props}
      value={cache}
      onBlur={handleUpdate}
      onChange={handleCacheUpdate}
    />
  );
};
