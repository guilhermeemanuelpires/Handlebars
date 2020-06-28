function ModelUser(sequelize, DataType) {
    const User = sequelize.define('user', {
        // atributos
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        user: {
            type: DataType.STRING
        },
        fone: {
            type: DataType.NUMBER
        },
        password: {
            type: DataType.STRING
        },
        email: {
            type: DataType.STRING
        },
        perfil: {
            type: DataType.STRING(1),
            defaultValue: '0'
        },
        resetToken: {
            type: DataType.STRING
        },
        dataReset: {
            type: DataType.DATE,
            allowNull: true
        }
    }, {
        // opções
    });
    return User;
}

module.exports = ModelUser;