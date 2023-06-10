import {useEffect, useState} from 'react'
// import {fetchDataFromApi1, fetchDataFromApi2} from './ApiCall.js'

function Api({searchTerm}) {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  // const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState([true]);
  const [error, setError] = useState([]);
   
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
          
  //       const api1Data = await fetchDataFromApi1(searchTerm);
  //       const api2Data = await fetchDataFromApi2(searchTerm);

  //       // Process the data as needed
  //       // const processedData = {
  //       //   api1Data,
  //       //   api2Data,
  //       // };

  //       // Set the processed data to the state
  //       setData(processedData);
  //       setIsLoading(false);
  //     } catch (error) {
  //       // Handle errors
  //       setError(error);
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, [searchTerm]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
          const api1Data = await response.json();
          console.log(api1Data);
          setData1(api1Data);
      }catch (error) {
        // Handle errors
        setError(error);
        setIsLoading(false);
      }
      try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${searchTerm.toLowerCase()}`);
          const api2Data = await response.json();
          console.log(api2Data);
          setData2(api2Data);
      }catch (error) {
        // Handle errors
        setError(error);
        setIsLoading(false);
      }
        // const api1Data = await fetchDataFromApi1(searchTerm);
        // const api2Data = await fetchDataFromApi2(searchTerm);

        // Process the data as needed
        // const processedData = {
        //   data1,
        //   data2,
        // };

        // Set the processed data to the state
        // setData(processedData);
        setIsLoading(false);
    };
    fetchData();
  }, [searchTerm]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Data from API 1:</h2>
      <pre>{JSON.stringify(data1, null, 2)}</pre>
      <h2>Data from API 2:</h2>
      <pre>{JSON.stringify(data2, null, 2)}</pre>
    </div>
  );
  
}

export default Api;