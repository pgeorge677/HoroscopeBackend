'use strict';
const {
    Model, DataTypes
} = require('sequelize');
const {
    STRING, UUID, UUIDV4,
} = DataTypes;
module.exports = (sequelize, ignored) => {
    class Post extends Model {
        static associate({User}) {
            Post.belongsTo(User, {foreignKey: 'userId', as: 'users', allowNull: false})
        }
        toJSON() {
            return {...this.get(), id: undefined, userId: undefined};
        }
    }

    Post.init({
        uuid: {
            type: UUID,
            defaultValue: UUIDV4
        },
        body: {
            allowNull: false,
            type: STRING
        }
    }, {
        sequelize,
        tableName: 'posts',
        modelName: 'Post',
    });
    return Post;
};
