import { getServerSession } from "#auth";
import { database } from "~/server/db";

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event);
    if (!session) {
      return { status: "unauthenticated!" };
    }

    const queryParams = getQuery(event);
    const offset = parseInt((queryParams?.offset as string) || "0", 10);
    const filter = (queryParams?.filter as string) || "";
    const find = { country: { $regex: filter, $options: "i" } };

    const usersCollection = database.collection("users");
    const totalCount = await usersCollection.countDocuments(find);

    const data = await usersCollection
      .find(find)
      .skip(offset)
      .limit(1000)
      .toArray();
    return { users: data, totalCount };
  } catch (error) {
    return { users: [], totalCount: 0, error };
  }
});
