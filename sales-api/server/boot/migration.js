module.exports = (app) => {
    var models = ['Person', 'Sale', 'Shop', 'RoleMapping', 'Role', 'AccessToken'];
  
    models.forEach(output => {
        app.dataSources.mysql.autoupdate(output, (err) => {
            if (err) console.log('Error migrating models', err);
        });
    });
}