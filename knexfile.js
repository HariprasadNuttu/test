const options = {
    client: 'mysql',
    connection: {
      user: 'root',
      password: 'p@ssw0rd',
      database: 'Vdart_Technologies'
    }
}

// const options = {
//     client: 'pg',
//     connection:'postgres://localhost/sammy'
// }

const knex = require('knex')(options);

knex.schema.createTable('message_list', (table) => {
    table.increments('id').primary()
    table.string('message_contents').nullable()
    table.timestamp('received_ts').nullable()
}).then(() => console.log("table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });

    module.exports = knex;