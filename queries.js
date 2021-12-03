const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows)

      response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    let id = request.params.id;
    console.log(typeof id);
    id = parseInt(request.params.id);
    if (typeof id !== 'number') {
        const error = new Error('someone screwed up.');
        throw error;
    }
    console.log(id);
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const body = request.body
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [body.name, body.email], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results);
      response.status(201).send(body);
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const body = request.body
    console.log(body);
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [body.name, body.email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(body);
      }
    )
}
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send()
    })
}
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}





