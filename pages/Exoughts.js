  import React, { useState } from 'react';
import axios from 'axios';
import { Textarea } from '@nextui-org/react';
import Link from 'next/link'




    




const Exoughts = () => {
  const [text, setText] = useState('');

  const handleExoughts = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/Exoughts', { text });
      alert('Text submitted!');
    } catch (err) {
      console.error(err);
    }
  };






  return (
  
    <>
   
     <form onSubmit={handleExoughts}>
     
    <Textarea value={text} 
    label="Exoughts(conscious expanding thoughts)"
    placeholder="write here" />
      <Link href="/display">
    
    
    <button type="submit">Submit</button>
    </Link>
    </form>
     
   
   </>

      
      
      
     
    
    
  
    
  );
}

export default Exoughts;

