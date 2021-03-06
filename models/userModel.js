'use strict'
const promisePool = require('../database/db').promise()

const getUserLogin = async (params) => {
  try {
    console.log('user params', params)
    const [rows] = await promisePool.execute(
      'SELECT Email email, Username username, Password password, UserID userId FROM user WHERE Email = ?;',
      params
    )

    return rows
  } catch (e) {
    console.log('error', e.message)
  }
}

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query(
      `SELECT FName firstName,
       LName lastName,
        Gender gnder,
        BirthDate birthDate,
        City city,
        StrAddress streetAddress,
        PostCode postCode,
        Country country 
        FROM 
        user 
        INNER JOIN 
        location 
        ON
        user.LivesID = location.LivesID;`
    )
    return rows
  } catch (e) {
    console.log('error', e.message)
    throw e
  }
}

const insertUser = async (user) => {
  try {
    console.log('insert user', user)
    const [
      rows,
    ] = await promisePool.query(
      'INSERT INTO location (City, StrAddress, PostCode, Country) VALUES(?, ?, ?, ?); INSERT INTO user (FName, LName, Gender, Email, Username, Password, BirthDate, LivesID) VALUES (?, ?, ?, ?, ?, ?, ?, LAST_INSERT_ID());',
      [
        user.city,
        user.strAddress,
        user.postCode,
        user.country,
        user.firstName,
        user.lastName,
        user.gender,
        user.email,
        user.username,
        user.password,
        user.birthDate,
      ]
    )
    return rows
  } catch (err) {
    return err
  }
}

const getUserById = async (id) => {
  try {
    const [rows] = await promisePool.query(
      `SELECT 
      UserID id, 
      FName firstName, 
      LName lastName, 
      Email email 
      FROM
       user 
      WHERE 
      UserID = ?;`,
      [id]
    )

    return rows[0]
  } catch (err) {
    console.log('error', err.message)
    return err.message
  }
}

module.exports = {
  getAllUsers,
  insertUser,
  getUserLogin,
  getUserById,
}
