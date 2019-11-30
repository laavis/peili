/**
 * @file Make the onChange event work like an onBlur event in the Material UI TextField. The new onChange event also returns the input value as the first parameter.
 * @author Tuomas Pöyry <tuomas.poyry@metropolia.fi>
 */

import TextField from '@material-ui/core/TextField';
import React from 'react';

export default ({ value, onChange, ...props }) => {
  const [cache, setCache] = React.useState(value);

  React.useEffect(() => {
    setCache(value);
  }, [value]);

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
