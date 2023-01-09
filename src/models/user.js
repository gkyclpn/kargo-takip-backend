const { DataTypes, Model } = require('sequelize')
const dbConnect = require('../configs/dbConnect')

const tableOptions = {
    sequelize: dbConnect,
    modelName: 'user'
}

const tableColumns = {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(50)
    },
    gmail: {
        type: DataTypes.STRING(50)
    },
    gmail_user_id: {
        type: DataTypes.STRING(50)
    },
    access_token: {
        type: DataTypes.STRING(300)
    },
    refresh_token: {
        type: DataTypes.STRING(300)
    },
    isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}

class thisTable extends Model {}
thisTable.init(tableColumns, tableOptions)
module.exports = thisTable