import { client, Query, Field} from "@tilework/opus";

const getProductsByCategory = async (category) => {

    client.setEndpoint("http://localhost:4000");
 
    const queryProductsByCategory = new Query("category", true).addArgument('input', 'CategoryInput', { title : category})
    .addField(new Field("products", true)
    .addFieldList(["id", "name", "attributes{id,name,type,items{id}}", "inStock", "gallery", "prices{amount, currency{symbol, label}}","brand"])) 

    return await client.post(queryProductsByCategory)
  }

export default getProductsByCategory