export const fetchData = async ({URL, query}) => {
    try
    {
        const attributes = Object.keys(query);
        if(attributes.length > 1)
        {
            URL += `?`+ attributes[0] + `=${query[attributes[0]]}&` + attributes[1] + `=${query[attributes[1]]}`;
        }
        else if(attributes.length > 0)
        {
            URL += `?`+ attributes[0] + `=${query[attributes[0]]}`;
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