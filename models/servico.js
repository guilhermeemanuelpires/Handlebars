function ModelServico(sequelize, DataType) {
    const Servico = sequelize.define('servico', {
        // atributos
        userId: {
            type: DataType.NUMBER,
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: { // User hasMany WorkingDays n:n
                model: 'Users',
                key: 'id'
            }
        },
        tipo: {
            type: DataType.STRING(1)
        },
        Dia: {
            type: DataType.DATE
        },
        Hora: {
            type: DataType.TIME
        },
        observacao: {
            type: DataType.STRING
        }
    }, {
        // opções
    });

    return Servico;
}

module.exports = ModelServico;