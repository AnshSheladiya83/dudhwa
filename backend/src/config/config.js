/**
        * File Name: config.js
        */
       const envFound = require('dotenv').config();
       
       module.exports = {
         port: parseInt(process.env.PORT, 10),
         node_env: process.env.NODE_ENV,
         database: {
           development: {
             url: process.env.DEV_DATABASE_URL || 'mongodb://localhost:27017/test_autoback',
           },
           test: {
             url: process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/myapp_test',
           },
           production: {
             url: process.env.PROD_DATABASE_URL || 'mongodb://user:password@mongo-db-instance-name:27017/myapp_prod',
           },
         },
         jwtSecret: process.env.JWT_SECRET || 'mysecretkey',
         url: {
           base_url: process.env.BASE_URL,
         },
       };