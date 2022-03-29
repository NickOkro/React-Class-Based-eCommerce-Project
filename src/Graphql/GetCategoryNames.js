import { client, Query, Field} from "@tilework/opus";

const getCategoryNames = async () => {

    client.setEndpoint("http://localhost:4000");
  
    const queryCategoryNames = new Query("categories", true)    
    .addField(new Field("name", true))

    return await client.post(queryCategoryNames)
  }

export default getCategoryNames