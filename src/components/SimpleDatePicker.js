import React, { useState } from 'react';

function SimpleDatePicker({ onDateChange }) {
  const [date, setDate] = useState('');

  const handleChange = (event) => {
    setDate(event.target.value);
    onDateChange(event.target.value);
  };

  return (
    <input
      type="datetime-local"
      value={date}
      onChange={handleChange}
      style={{ marginTop: '20px', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
    />
  );
}

export default SimpleDatePicker;
