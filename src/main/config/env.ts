export const env = {
  port: process.env.API_PORT ?? 8080,
  nodeEnv: (process.env.TS_NODE_DEV != null) ? 'dev' : 'prod'
}
