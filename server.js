const express = require('express');

const app = express();

app.get('/api/customers', (request, response) => {
    const customers = [
        {id: 1, nombre: 'Juan', apellido: 'Benitez'},
        {id: 2, nombre: 'Carlos', apellido: 'Torres'},
        {id: 3, nombre: 'Nico', apellido: 'DS'}
    ];
    response.jason(customers);
});

const port = 5000;

app.listen(port, () => console.log('Server started on port ${port}'));