const User = require('../models/User');
const bcrypt = require('bcrypt'); // Biblioteca para encriptar a senha

const createUser = async (req, res) => {
    try {
        // Pegando os dados enviados na requisição (Payload)
        const { firstname, surname, email, password, confirmPassword } = req.body;

        // Validação simples
        if (!firstname || !surname || !email || !password) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "As senhas não coincidem" });
        }

        // Criptografando a senha (requisito do escopo)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criando o usuário no banco
        const newUser = await User.create({
            firstname,
            surname,
            email,
            password: hashedPassword
        });

        // Retorna status 201 (Created)
        return res.status(201).json(newUser);

    } catch (error) {
        // Retorna 400 em caso de erro (ex: email repetido ou erro de banco)
        return res.status(400).json({ message: "Erro ao criar usuário", error: error.message });
    }
};

// Buscar utilizador pelo ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        // findByPk = Find By Primary Key. O 'attributes' serve para não devolvermos a senha.
        const user = await User.findByPk(id, {
            attributes: ['id', 'firstname', 'surname', 'email']
        });

        if (!user) {
            return res.status(404).json({ message: "Utilizador não encontrado" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: "Erro ao procurar utilizador", error: error.message });
    }
};

// Atualizar utilizador
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, surname, email } = req.body;

        // Validação simples exigida no escopo (Bad Request)
        if (!firstname || !surname || !email) {
            return res.status(400).json({ message: "Os campos firstname, surname e email são obrigatórios" });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Utilizador não encontrado" });
        }

        // Atualiza os dados no banco
        await user.update({ firstname, surname, email });

        // O status 204 (No Content) não devolve corpo (JSON), apenas confirma o sucesso
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ message: "Erro ao atualizar utilizador", error: error.message });
    }
};

// Apagar utilizador
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Utilizador não encontrado" });
        }

        // Remove do banco de dados
        await user.destroy();

        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ message: "Erro ao apagar utilizador", error: error.message });
    }
};

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser
};