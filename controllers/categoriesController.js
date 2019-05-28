const knexoption = require('../knexfile');
const knex = require('knex')(knexoption);
module.exports = {
    index: async (request, response)=>{
        const categories = await knex('categories').select('*');
        response.render('categories/index',{
            categories,
            success:request.flash('success')
        });
    },

    create: async (request, response)=>{
        response.render('categories/create')
    },

    store: async (request, response)=>{
        const {name} = request.body;
        await knex('categories').insert({
            name
        });
        request.flash('success','Category Added');
        response.redirect('/admin/categories/index');
    },

    edit: async (request, response)=>{
        const category = await knex('categories').where('id', request.params.id);
        response.render('categories/edit',{
            category
        }); 
        
    },

    update: async (request, response)=>{
        await knex('categories').where('id', request.params.id).update('name',request.body.name);
        request.flash('success', 'Category Updated Successfully');
        response.redirect('/admin/categories/index');
        
    },
    destroy: async (request, response)=>{
        await knex('categories').where('id',request.params.id).del();
        request.flash('success', 'Category Deleted Successfully');
        response.redirect('/admin/categories/index');
    },
};