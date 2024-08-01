
/** @type { import("drizzle-kit").Config } */
export default {
    schema: './utils/schema.jsx',
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://smartbudgetdb_owner:A8kEzQUIw0cV@ep-jolly-snow-a5aiy38g.us-east-2.aws.neon.tech/smartbudgetdb?sslmode=require',
    }
  };