import { createContext, useState, useEffect } from 'react';
import Loader from '../components/Loader';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (fileName) => {
      try {
        const response = await fetch(`/assets/data/${fileName}`);
        if (!response.ok) {
          throw new Error('Something went really wrong');
        }
        const text = await response.text();
        parseCsvFile(fileName, text);
      } catch (error) {
        console.error('Error fetching the CSV file:', error);
      }
    };

    const parseCsvFile = (fileName, text) => {
      const rows = text.split('\n').filter(row => row);
      const headers = rows[0].split(',').map(header => header.trim());
      const data = rows.slice(1).map(row => {
        const values = row.split(',').map(value => value.trim());
        let currentData = {};
        headers.forEach((header, index) => {
          currentData[header] = values[index] || '';
        });
        return currentData;
      });

      // Append the parsed data to the existing data state
      setData(prevData => ({ ...prevData, [fileName]: data }));
    };

    // Fetch all CSV files from the assets folder
    const loadData = async () => {
      setLoading(true); 
      await fetchData('teams.csv');
      await fetchData('players.csv');
      await fetchData('matches.csv');
      await fetchData('records.csv');
      setLoading(false); 
    };

    loadData();
  }, []);

  
  if (loading) return <Loader />;

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };


