export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'development',
    mysqlDatabase: process.env.MYSQL_DATABASE,
    mysqlUser: process.env.MYSQL_USER,
    mysqlPassword: process.env.MYSQL_PASSWORD,
    mysqlPasswordRoot: process.env.MYSQL_ROOT_PASSWORD,
    mysqlPort: parseInt(process.env.PORT_MYSQL),
    host: process.env.MYSQL_HOST,
    hostAPI: process.env.HOST_API,
    jwtSecret: process.env.JWT_SECRET,
    portServer: parseInt(process.env.PORT_SERVER, 10) || 3004,
    emailHost: process.env.EMAIL_HOST,
    emailPort: parseInt(process.env.EMAIL_PORT, 10) || 587,
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
    emailFrom: process.env.EMAIL_FROM,
})
