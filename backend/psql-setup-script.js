const { sequelize } = require('./db/models')


sequelize.showAllScheams({ logging: false })
    .then( async (data) => {
        if (!data.includes(process.env.SCHEMA)) {
            await sequelize.createSchema(process.env.SCHEMA)
        }
    })
