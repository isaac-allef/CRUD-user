const { request, response } = require("express");
const express = require("express");
const { as } = require("./database/connection");
const connection = require('./database/connection');

const routes = express.Router();

routes.get('/users', async (request, response) => {
    const users = await connection('user').select('*');
    return response.status(200).send({ users })
})

routes.post('/users', async (request, response) => {
    const { name, birth } = request.body;

    const [ id ] = await connection('user').insert({
        name,
        birth
    });

    return response.status(201).send({ id });
});

routes.put('/users/:id', async (request, response) => {
    const { id } = request.params;
    const { name, birth } = request.body;

    await connection('user').where('id', id).update({
        name,
        birth
    })

    return response.status(200).send({ id });
});

routes.delete('/users/:id', async (request, response) => {
    const { id } = request.params;

    await connection('user').where('id', id).del();

    return response.status(200).send({ id });
});

module.exports = routes;