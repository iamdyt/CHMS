const knexoption = require('../knexfile');
const knex = require('knex')(knexoption);
module.exports = {
    index:async (req,res)=>{
        const LatestSermon = await knex('sermons').join('categories','sermons.category_id','categories.id').orderBy('sermons.id','desc').first();
        
        res.render('home/index', {LatestSermon});
    },

    sermons:async(req,res)=>{
        const sermons = await knex('sermons').select('*');
        //res.send(sermons);
        res.render('home/sermons',{sermons});
    },
    single: async(req,res)=>{
        res.render('home/sermons');
    },
    about:async(req,res)=>{
        res.render('home/about');
    },
    contact:async(req,res)=>{
        res.render('home/contact');
    },
    events:async(req,res)=>{
        res.render('home/events');
    }
};