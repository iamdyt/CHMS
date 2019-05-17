const knexoption = require('../knexfile');
const knex = require('knex')(knexoption);
const crypt = require('apache-crypt');
const path =require('path');
module.exports = {
        //The Admininistrative DashBoard Page
    index:async (request, response)=>{
        response.render('admin/index');
    },
        //Get Registration Form
    getSignup:(request,response)=>{
        response.render('admin/signup',{error:request.flash('error')});
    },

        //Handle Registrations Data and commits to Dataabase
    postSignup:(request,response)=>{
        const{username,email,password} = request.body;
        const hashedPassword = crypt(password,10);
        knex('admins').insert({
            username:username.toLowerCase(),
            password:hashedPassword,
            email:email
        }).then(saved=>{
            request.flash('success', 'Registration Successful! Please Login');
            response.redirect('/admin/signin');})
        .catch(error=>{
            request.flash('error','An error occured!Try again'); 
            response.redirect('/admin/signup');});
    },

        //get Login form
    getSignin:(request,response)=>{
        response.render('admin/signin',{
            success:request.flash('success'),
            error:request.flash('error')});
    },

    //Handles sign in 
    postSignin:async(request,response)=>{
        const {user, password} = request.body;
        const hashedPassword = crypt(password,10);
        const admin = await knex('admins').select('id','username','password')
        .where('username', user.toLowerCase()).orWhere('password',hashedPassword);
        if(admin.length!=0){
            if(user.toLowerCase()==admin[0].username){
                if(hashedPassword==admin[0].password){
                    request.session.adminname = admin[0].username;
                    request.session.adminid=admin[0].id;
                    response.redirect('/admin/dashboard');
                } else{
                    request.flash('error','Password Doesn\'t match');
                    return response.redirect('/admin/signin');
                }
            } else {
                request.flash('error','Username Doesn\'t match');
                response.redirect('/admin/signin');
            }
        }else{
            request.flash('error', 'UserName or Password doesn\'t match');
            response.redirect('/admin/signin');
        }
        
        
    },

    //Get admin Profile
    show:async(request, response)=>{
        const admins = await knex('admins').where('id',request.params.id);
        response.render('admin/account',{admin:admins[0]});
        
    },
    //update admin Profile

    update:(request, response)=>{
       const {user,email}=request.body;
       const {image} = request.files;
       image.mv(path.resolve('public/assets/images',image.name));
       knex('admins').update({
           username:user,
           email:email,
           image:`/assets/images/${image.name}`
       }).where('id', request.params.id);
       response.redirect('/admin/dashboard');

    }
};