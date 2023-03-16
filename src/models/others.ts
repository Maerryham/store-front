import Client from "../database";


export const truncate = async() => {
    try{
        const conn = await Client.connect();
        const sql = 'TRUNCATE order_product, orders, users, products RESTART IDENTITY';
        await conn.query(sql);
        conn.release();
    }catch(err){
        throw new Error(`Unable to delete Tables${err}`);
    }
}