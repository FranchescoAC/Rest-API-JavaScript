const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Datos de ejemplo (simulando una base de datos)
let users = [
    { id: 1, name: "Juan", age: 25 },
    { id: 2, name: "Ana", age: 30 }
];

// GET: Obtener todos los usuarios
app.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

// GET: Obtener un usuario por su ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('Usuario no encontrado');
    }
    res.status(200).json(user);
});

// POST: Crear un nuevo usuario
app.post('/api/users', (req, res) => {
    const { name, age } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        age
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT: Actualizar un usuario por su ID
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('Usuario no encontrado');
    }
    const { name, age } = req.body;
    user.name = name;
    user.age = age;
    res.status(200).json(user);
});

// DELETE: Eliminar un usuario por su ID
app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).send('Usuario no encontrado');
    }
    users.splice(userIndex, 1);
    res.status(200).send('Usuario eliminado');
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor REST API escuchando en http://localhost:3000');
});
