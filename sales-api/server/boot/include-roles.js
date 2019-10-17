'use strict';

module.exports = (app) => {

  const RoleMapping = app.models.RoleMapping;
  const Role = app.models.Role;
  const Person = app.models.Person;

  Person.hasMany(Role, {
    through: RoleMapping,
    foreignKey: 'principalId'
  });
  RoleMapping.belongsTo(Person, {
    foreignKey: 'principalId'
  });
};