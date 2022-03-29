import { client, Query, Field} from "@tilework/opus";

const getProductById = async (id) => {

    client.setEndpoint("http://localhost:4000");
 
    const queryProductById = new Query("product", true).addArgument('id', "String!", id)
    .addFieldList(["id", "name", "inStock", "gallery","description","category","attributes{id,name,type,items{id}}","prices{amount,currency{label,symbol}},brand"])

    return await client.post(queryProductById)
  }

export default getProductById