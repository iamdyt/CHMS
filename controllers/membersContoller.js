const knexoption = require('../knexfile');
const path = require('path');
const knex = require('knex')(knexoption);
const slugify = require('slugify');
module.exports= {
    index:async(request, response)=>{
       const members = await knex('members').select('*').orderBy('id', 'desc');
        response.render('members/index',{
        members,
        success:request.flash('success')});
        
    },

    create:(request, response)=>{
        response.render('members/create',{
            success:request.flash('success'),
            error:request.flash('error')
        });

    },

    store:async(request, response)=>{
        const {first,last,dob,gender,occupation,phone,email,address,maritalstatus,unit} = request.body;
        const{image} = request.files;
        image.mv(path.resolve('public/assets/images/',image.name));
        const members = await knex('members').insert({
            first_name:first,
            last_name:last,
            dob,gender,
            occupation:slugify(occupation),phone,email,address,
            marital_status:maritalstatus,
            pics:`/assets/images/${image.name}`,
            unit_id:unit
        }); 
        if(members){
            request.flash('success', 'Members Added Successfully');
        } else{
            request.flash('error', 'An error occured! Try again');
        }
       
        response.redirect('/admin/members/create');
    },

    show:async(request, response)=>{
        const member = await knex('members').where('id', request.params.id);
        response.render('members/single',{member:member[0]});
    },

    delete:async(request,response)=>{
        await knex('members').where('id',request.params.id).del();
        request.flash('success','Member Deleted Successully');
        response.redirect('/admin/members/index');
        
    },

    edit:async(request,response)=>{
        const member = await knex('members').where('id', request.params.id);
        response.render('members/edit',{member:member[0]});
    },

    update:async(request,response)=>{
        const {first,last,dob,gender,occupation,phone,email,address,maritalstatus} = request.body;
        await knex('members').where('id', request.params.id)
        .update({
            first_name:first,
            last_name:last,
            dob,gender,occupation,phone,email,address,
            marital_status:maritalstatus
        });
        request.flash('success','Profile Updated Successfully');
        response.redirect('/admin/members/index/');
        
    }
};