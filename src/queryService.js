export default class FetchingService {

   getData = async (query, variables = {}) => {

      const res = await fetch("http://localhost:4000/graphql", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            query, variables
         }),
      });

      if (!res.ok) {
         throw new Error(`Could not fetch ${query}` +
            `, received ${res.status}`)
      }
      
      const response = await res.json();      
      return response.data

   };

};
