const knexoption = require('../knexfile');
const path = require('path');
const knex = require('knex')(knexoption);
module.exports= {
    index:(request, respond)=>{

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
            dob,gender,occupation,phone,email,address,
            marital_status:maritalstatus,
            pics:`assets/images/${image.name}`,
            unit_id:unit
        }); 
        if(members){
            request.flash('success', 'Members Added Successfully');
        } else{
            request.flash('error', 'An error occured! Try again');
        }
       
        response.redirect('/admin/members/create');
    },
}