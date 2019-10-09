const knexoption = require('../knexfilelocal');
const knex = require('knex')(knexoption);
module.exports = {
    index:async (req,res)=>{
        res.render('home/index');
    },


    prayer:async(req,res)=>{
        res.render('home/prayer');
    },

    prayerPost:async(req,res)=>{
        const {name, request} = req.body;
        const inserted = await knex('prayers').insert({
            name,request
        })
        res.redirect('/');
    },    
    
    adminPrayer: async (req,res)=>{
       const prayers = await knex('prayers').select('*')
        res.render('home/adminprayer', {
            prayers
        });
    }
};