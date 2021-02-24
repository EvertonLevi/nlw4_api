import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            database:
                process.env.NODE_ENV === "test"
                    ? "./src/database/database.test.sqlite"
                    : defaultOptions.database,
        })
    )
}

// {
//     "type": "sqlite",
//     "migrations": ["./src/database/migrations/**.ts"],
//     "entities": ["./src/models/**.ts"],
//     "logging": true,
//     "cli": {
//         "migrationsDir": "./src/database/migrations"
//     },
//     "database": "./src/database/database.sqlite"
// }