import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.jsx'
const sql = neon('postgresql://smartbudgetdb_owner:A8kEzQUIw0cV@ep-jolly-snow-a5aiy38g.us-east-2.aws.neon.tech/smartbudgetdb?sslmode=require');
export const db = drizzle(sql,{schema});
