module.exports = {
  apps: [
    {
      name: "apollo-single",
      script: "./server.js",
    },
    {
      name: "apollo-clustered",
      script: "./server.js",
      instances: "max",
      exec_mode: "cluster",
    },
  ],
}
