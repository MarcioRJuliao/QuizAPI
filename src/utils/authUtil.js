async function authenticateUser({ email, password }) {
    try {
        const result = await userModel.login({ email });

        if (result.length === 0) {
            return false; // Retorna false se o usuário não for encontrado
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);

        return isMatch; // Retorna true se a senha corresponder, caso contrário false
    } catch (e) {
        console.log('Erro na autenticação do usuário:', e);
        return false; // Em caso de erro, retorne false
    }
}