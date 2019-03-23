module.exports = {
    apps: [{
        name: "app",
        script: "./app.ts",
        exec_mode: 'cluster',
        instances: 1,
        watch: true,
        watch: ["**/**.ts", "config/*.json"],
        watch_options: {
            followSymlinks: false,
            persistent: true,
            ignoreInitial: true
        },
        ignore_watch: ["./node_modules", "./docker", "__*", "./.git/*", ".idea", "docker", "mocks", "*.log"],
        env: {
            NODE_ENV: 'development',
            NODE_APP_INSTANCE: 'development',
        },
        env_production: {
            ignore_watch: ["./node_modules", "./docker"],
            NODE_ENV: 'production',
            NODE_APP_INSTANCE: 'production',
        }
    }]
}