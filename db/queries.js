const e = require("express");
const pool = require("./pool")

async function signUpUser(username, password){
    await pool.query(`
            INSERT INTO USERS (username, password)
            VALUES ($1, $2)
        `, [username, password])
}

async function checkDuplicateUser(username){
    const { rows } = await pool.query(`
                SELECT username FROM USERS
                WHERE username = $1
            `, [username])

    return rows
}

async function getUserMessages(userId) {
    try {
        if(userId){
            const { rows } = await pool.query(`
                SELECT 
                    messages.messageID,
                    messages.message,
                    messages.date,
                    users.username
                FROM messages
                JOIN users ON messages.userID = users.id
                WHERE users.id = $1;
            `, [userId]);
            
            return rows;
        } else {
            return null
        }
    } catch (e) {
        console.error("Error executing query: ", e.message);  
        console.error("Detailed error:", e);                 
    }
}

async function getAllMessages(){
    const { rows } = await pool.query(`
        SELECT  
            messages.messageID,
            messages.message,
            messages.date,
            users.username
        FROM MESSAGES
        JOIN USERS ON messages.userID = users.id
    `)

    return rows
}

module.exports = {
    signUpUser,
    checkDuplicateUser,
    getUserMessages,
    getAllMessages
}