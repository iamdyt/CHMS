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
        const events = await knex('events').where('id',request.params.id);
        response.render('events/edit',{event:events[0]});
    },
    update:async(request,response)=>{
        const{name,venue,description} = request.body;
        await knex('events').where('id',request.params.id).update({name,venue,description});
        request.flash('success', 'Event Updated');
        response.redirect('/admin/events/index');
    },
    delete:async(request,response)=>{
        await knex('events').where('id',request.params.id).del();
        request.flash('success', 'Event Deleted Successfully');
        response.redirect('/admin/events/index');        
    }
};