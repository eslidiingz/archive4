module.exports = {
    apps: [{
        name: 'api_master_4015',
        script: 'server.js',
        autorestart: false,
        // exp_backoff_restart_delay: 500,
        // restart_delay: 100,
        // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
        args: 'api_master_4015',
        // instances: 2,
        watch: true,
        max_memory_restart: '4G',
        // env: {
        //     NODE_ENV: 'development'
        // },
        // env_production: {
        //     NODE_ENV: 'production'
        // },
        ignore_watch: ["node_modules", "log_folder","public"]
    }]
};