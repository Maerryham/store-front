import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    POSTGRES_TEST_USER,
    POSTGRES_TEST_PASSWORD,
    ENV
} = process.env 



let Client



if(ENV === 'test') {
  console.log("Na test")
  Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_TEST_USER,
    password: POSTGRES_TEST_PASSWORD,
  })
}


if(ENV === 'dev') {
  console.log("Na dev")
  Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}

export default Client