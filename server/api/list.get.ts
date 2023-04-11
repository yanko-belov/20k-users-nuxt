import { MongoClient } from "mongodb";

export default defineEventHandler(async (event) => {
  const uri = useRuntimeConfig().mongodbUri;
  try {
    const queryParams = getQuery(event);
    const offset = parseInt((queryParams?.offset as string) || "0", 10);
    const filter = (queryParams?.filter as string) || "";
    const find = { country: { $regex: filter, $options: "i" } };

    const client = new MongoClient(import.meta.env.NUXT_MONGODB_URI as string);
    const database = client.db(import.meta.env.NUXT_MONGODB_DB as string);

    const usersCollection = database.collection("users");
    const totalCount = await usersCollection.countDocuments(find);

    const data = await usersCollection
      .find(find)
      .skip(offset)
      .limit(1000)
      .toArray();
    await client.close();
    return { users: data, totalCount, uri: uri };
  } catch (error) {
    return { users: [], totalCount: 0, error, uri: uri };
  }
});
