options = {
    client:'mysql',
    version:'10.1.38',
    connection:{
        host:'us-cdbr-iron-east-05.cleardb.net',
        user:'b772dbfa48648d',
        password:'4ba4a8b5',
        database:'heroku_4229e7d82e5f8cc'
    },
    migrations:{
        directory:__dirname+'/db/migrations'
    },

    seeds:{
        directory:__dirname+'/db/seeds'
    }
};
mysql://b772dbfa48648d:4ba4a8b5@us-cdbr-iron-east-05.cleardb.net/heroku_4229e7d82e5f8cc?reconnect=true
module.exports = options;