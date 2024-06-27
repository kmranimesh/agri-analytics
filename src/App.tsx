import React, { useState, useEffect } from 'react';
import AgricultureAnalytics from './components/AgricultureAnalytics';
import jsonData from './data/agriculture_data.json';

const App: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(jsonData);
  }, []);

  return (
    <div>
      {data.length > 0 ? <AgricultureAnalytics jsonData={data} /> : <p>Loading...</p>}
    </div>
  );
};

export default App;
