const { UUIDV4, DataTypes, Model }  = require("sequelize");

/**
 * User model
 */
class User extends Model
{
    static init(sequelize)
    {
      return super.init(
        {
          id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          givenName : {
            type: DataTypes.STRING,
            field: 'given_name',
            allowNull: false,
          },
          familyName : {
            type: DataTypes.STRING,
            field: 'family_name',
            allowNull: false,
          },
        },
        {
          timestamps: true,
          createdAt: 'created',
          updatedAt: false,
          tableName: "users",
          sequelize
        }
      );
    }
}

module.exports = User;
