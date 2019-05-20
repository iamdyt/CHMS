const knexoption = require('../knexfile');
const knex = require('knex')(knexoption);
module.exports={
    index:async(request,response)=>{
        const events = await knex('events').select('*');
        response.render('events/index',{events, success:request.flash('success')});
    },

    create:(request,response)=>{
        response.render('events/create');
    },

    store:async(request,response)=>{
        const {name,venue,description} = request.body;
        await knex('events').insert({
            name,venue,description
        });
        request.flash('success', 'Event Successfully Added');
        response.redirect('/admin/events/index');
    },
    show:async(request,response)=>{
        
    },
    edit:async(request,response)=>{
        
    },
    update:async(request,response)=>{
        
    },
    delete:async(request,response)=>{
        
    }
};