import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Display = () => {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/texts');
      setTexts(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
      {texts.map((text) => (
        <div key={text._id}>
          <p>{text.text}</p>
        </div>
      ))}
    </>
  );
};

export default Display;
