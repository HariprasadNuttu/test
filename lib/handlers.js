/*
 * Request Handlers
 *
 */

// Dependencies
var helpers = require('./helpers');
var config = require('./config');

// Define all the handlers
var handlers = {};


const knex = require('knex')(config.dbSetup);

// Not-Found
handlers.notFound = function(data,callback){
  callback(404);
};

// Users
handlers.users = function(data,callback){
  var acceptableMethods = ['post','get','put','delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
};


handlers._users  = {};

handlers._users.post = function(data,callback){

  if(data.payload.length>0){
    data.payload.forEach((payload)=>{
        if (payload.received_ts=='' || payload.received_ts==undefined){
          payload.received_ts = new Date();
        }
    })
    console.log(data.payload);
    knex('message_list').insert(data.payload).then(() => callback(200,{success:true,status:200,'message' : ['Succesfully Created']}))
    .catch((err) => { console.log("==================FAilure================"); callback(500,{success:true,status:500,'message' : err.sqlMessage}); console.log(err);})
    .finally(() => {
        // knex.destroy();
    });


  } else {
    callback(400,{success:false,status:400,'Error' : ['Invalid Payload']});
  }

};




// Export the handlers
module.exports = handlers;
