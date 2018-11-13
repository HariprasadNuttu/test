// const options = {
//     client: 'mysql',
//     connection: {
//       user: 'root',
//       password: 'p@ssw0rd',
//       database: 'Vdart_Technologies'
//     }
// }
var config = require('./lib/config');
console.log(config)
// const options = {
//     client: 'pg',
//     connection:'postgres://localhost/sammy'
// }

const knex = require('knex')(config.dbSetup);
//
knex.schema.createTable('message_list', (table) => {
    table.uuid('id')
    table.text('message_contents',['longtext']).nullable()
    table.timestamp('received_ts').nullable()
}).then(() => console.log("table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        // knex.destroy();
    });

    // knex('message_list').insert([{id:"8a0b60ca-e74f-11e8-9027-9c2a70c315ed",received_ts: new Date()}]).then(() => console.log("data inserted"))
    // .catch((err) => { console.log("==================FAilure================"); console.log(err); throw err })
    // .finally(() => {
    //     // knex.destroy();
    // });

    module.exports = knex;
