const { DataTypes, Model } = require('sequelize')
const dbConnect = require('../configs/dbConnect')

const tableOptions = {
    sequelize: dbConnect,
    modelName: 'kargo'
}

const tableColumns = {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.INTEGER
    },
    company: {
        type: DataTypes.STRING(100)
    },
    store: {
        type: DataTypes.STRING(100)
    },
    product: {
        type: DataTypes.STRING(100)
    },
    order_date: {
        type: DataTypes.STRING(255)
    },
    isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}

class thisTable extends Model {}
thisTable.init(tableColumns, tableOptions)
module.exports = thisTable