import mongo from "mongodb";

const mongoClient = mongo.MongoClient;
let connection: mongo.Db | null = null;

export default (async () => {
    if (connection) {
        return connection;
    }
    
    connection = await new Promise((resolve, reject) => {
        // @ts-ignore
        mongoClient.connect(process.env.DB_URL, (error, client) => {
            if (error) {
                reject(error);
            } else {
                resolve(client.db(process.env.DB_DATABASE));
            }
        });
    });

    return connection;
})();