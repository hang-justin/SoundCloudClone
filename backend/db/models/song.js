'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.hasMany(models.Comment, { foreignKey: 'songId' });

      Song.belongsTo(models.User, { as: 'Artist', foreignKey: 'userId' });

      Song.belongsTo(models.Album, { foreignKey: 'albumId'});

      Song.belongsToMany(models.Playlist, {
        through: models.PlaylistsSong,
        foreignKey: 'songId',
        onDelete: 'CASCADE'
      })

      Song.hasMany(models.PlaylistsSong, { foreignKey: 'songId', onDelete: 'CASCADE'})

    }
  }
  Song.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
