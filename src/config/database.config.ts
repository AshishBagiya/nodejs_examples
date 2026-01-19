export default () => ({
    mongo: {
        url: process.env.MONGO_URL || 'mongodb://localhost:27017/mydatabase',
    },
    mysql: {
        url: process.env.MYSQL_URL || 'mysql://localhost:3306/mydatabase',
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || 3306,
        username: process.env.MYSQL_USERNAME || 'root',
        password: process.env.MYSQL_PASSWORD || 'password',
        database: process.env.MYSQL_DATABASE || 'mydatabase',
    },
})