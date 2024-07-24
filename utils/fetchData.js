export const fetchData = async ({URL, query}) => {
    try
    {
        const attributes = Object.keys(query);

        for(let i = 0; i < attributes.length; i++)
        {
            if(i == 0)
                URL += `?`;
            else
                URL += '&';

            URL += attributes[i] + `=${query[attributes[i]]}`
        }

        const res = await fetch(URL);
        const data = await res.json();
        return data;
    }
    catch(error)
    {
        console.error(error)
    }
};