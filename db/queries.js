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

async function postMessage(userId, message, date){
    await pool.query(`
        INSERT INTO MESSAGES(userid, message, date)
        VALUES ($1, $2, $3)
    `, [userId, message, date])
}

async function becomeMember(userID) {
    await pool.query(`
        UPDATE USERS
        SET member = true
        WHERE id = $1
    `, [userID])
}
module.exports = {
    signUpUser,
    checkDuplicateUser,
    getUserMessages,
    getAllMessages,
    postMessage,
    becomeMember
}