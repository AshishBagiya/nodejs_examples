export default () => ({
    app: {
        name: process.env.APP_NAME || 'My App',
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development',
    }
})