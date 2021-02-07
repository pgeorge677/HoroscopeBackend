'use strict';
const {
    Model, DataTypes
} = require('sequelize');
const {
    STRING, UUID, UUIDV4,
} = DataTypes;

module.exports = (sequelize, ignored) => {
    class Characteristic extends Model {
        static associate({Sign}) {
            Characteristic.belongsTo(Sign, {foreignKey: 'signId', as: 'signs', allowNull: false})
        }

        toJSON() {
            return {...this.get(), id: undefined, signId: undefined, createdAt: undefined, updatedAt: undefined}
        }
    }

    Characteristic.init({
            uuid: {
                type: UUID,
                defaultValue: UUIDV4
            },
            symbolize: {
                type: STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Characteristic must have a symbolize'},
                    notEmpty: {msg: 'Symbolize must not be empty'}
                }
            },
            element: {
                type: STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Characteristic must have a element'},
                    notEmpty: {msg: 'Element must not be empty'}
                }
            },
            season: {
                type: STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Characteristic must have a season'},
                    notEmpty: {msg: 'Season must not be empty'}
                }
            },
            character: {
                type: STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Characteristic must have a character'},
                    notEmpty: {msg: 'Character must not be empty'}
                }
            },
            positive: {
                type: STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Characteristic must have a positive'},
                    notEmpty: {msg: 'Positive must not be empty'}
                }
            },
            negative: {
                type: STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Characteristic must have a negative'},
                    notEmpty: {msg: 'Negative must not be empty'}
                }
            },
            dayOfWeek: {
                type: STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Characteristic must have a dayOfWeek'},
                    notEmpty: {msg: 'DayOfWeek must not be empty'}
                }
            },
            color: {
                type: STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Characteristic must have a color'},
                    notEmpty: {msg: 'Color must not be empty'}
                }
            },
            planet: {
                type: STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Characteristic must have a planet'},
                    notEmpty: {msg: 'Planet must not be empty'}
                }
            },
            perfume: {
                type: STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Characteristic must have a perfume'},
                    notEmpty: {msg: 'Perfume must not be empty'}
                }
            },
            description: {
                type: STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Characteristic must have a description'},
                    notEmpty: {msg: 'Description must not be empty'}
                }
            },
        }, {
            sequelize,
            tableName: 'characteristics',
            modelName: 'Characteristic',
        }
    );
    return Characteristic;
};














