export async function fetchDataFromApi1(searchTerm) {
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        const data = await response.json();
        console.log(data);
        return data;
    }catch(error){
        throw new Error("Failed to fetch data from API1");
    }
}

export async function fetchDataFromApi2(searchTerm) {
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${searchTerm.toLowerCase()}`);
        const data = await response.json();
        console.log(data);
        return data;
    }catch(error){
        throw new Error("Failed to fetch data from API2");
    }
}
  