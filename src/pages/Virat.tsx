import React from 'react';
import Chatbot from '../components/main/Chatbot';

const Virat = () => {
  return (
    <div>
      <iframe 
        title="krish" 
        width="1000" 
        height="1000" 
        src="https://app.powerbi.com/view?r=eyJrIjoiZWJlNjY5MDQtNDM4ZS00NGE5LWI1ZDQtNjUyNWM5N2ViMGQyIiwidCI6IjE1MTAzYzk2LTU1NTAtNGVlNC1iZWVjLTU0MzRmMjI5ZWQwYiJ9" 
        frameBorder="0" 
        allowFullScreen={true}
      ></iframe>
      <Chatbot />
    </div>
  );
};

export default Virat;
