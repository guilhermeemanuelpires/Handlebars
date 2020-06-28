var Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/barbearia.sqlite',
    logging: false
});

// Carrega os models
sequelize.User = sequelize.import('./user.js');
sequelize.Servico = sequelize.import('./servico.js');

//Relacionamneto
sequelize.User.hasMany(sequelize.Servico, { foreignKey: 'userId' });
sequelize.Servico.belongsTo(sequelize.User, { foreignKey: 'userId' });


// Sync com o schema do banco de dados
sequelize.sync();


module.exports = sequelize;