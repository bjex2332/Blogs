const User = require('./User');
const MuscleGroups = require('./MuscleGroups');
const Exercises = require('./Exercises');

MuscleGroups.hasMany(Exercises, {
    foreignKey: 'muscle_groups_id',
});

Exercises.belongsTo(MuscleGroups, {
    foreignKey: 'muscle_groups_id',
});

module.exports = { User, MuscleGroups, Exercises };
