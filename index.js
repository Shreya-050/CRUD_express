//importing all files and packages
const express = require('express');
const db = require('./dbConn.js');
const UserModel = require('./userSchema.js')





//all the constants
const app = express();
const port = 3000




//In which form the data is send from the frontend
app.use(express.json())


//database function call
db();

//routes
app.get('/', function (req, res) {
    res.send("Welcome to Car Admin");
})





//createUser
app.post('/admin/create-user', async function (req, res) {
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone

    if (!name || !email || !phone) {
        res.json({
            message: "Missing details",
            success: false
        })
    }
    else {
        try {
            const response = await UserModel.create({ name, email, phone });
            if (response) {
                res.json({
                    message: "Successfully Created",
                    success: true
                })
            }
        } catch (error) {
            console.log(error.message)
        }

    }

})

//allUser
app.get('/admin/all-user', async function (req, res) {
    try {
        const response = await UserModel.find();
        if (response) {
            res.json({
                data: response,
                success: true
            })
        } else {
            res.json({
                message: "something went wrong",
                success: false
            })
        }
    }
    catch (error) {
        console.log(error.message)
    }
})

//find all user with a particular condition
app.get('/admin/all-condition-user', async function (req, res) {
    const name = req.body.name
    try {
        const response = await UserModel.find({ name })
        if (response) {
            res.json({
                data: response,
                success: true
            })
        } else {
            res.json({
                message: "something went wrong",
                success: false
            })
        }
    }
    catch (error) {
        console.log(error.message)
    }
})

//get particular user
app.get('/admin/user', async function (req, res) {

    const email = req.body.email
   
    try {
        const response =await  UserModel.findOne({ email })
        if (response) {
            res.json({
                data: response,
                success: true
            })
        }
        else {
            res.json({
                message: "email is missing",
                success: false
            })

        }
    } catch (error) {
        console.log(error.message)
    }
})

//update user
app.put('/admin/update-user', async function (req, res) {
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    try {
        if (email) {
            let response;
            if (name && phone) {
                response =await UserModel.findOneAndUpdate({ email:email },{name:name,phone:phone},{new:true});
                if (response) {
                    res.json({
                        message: "Data updated Successfully",
                        success: true
                    })
                }

            }
           else if (name) {
                response = await UserModel.findOneAndUpdate({ email },{name:name},{new:true});
                if (response) {
                    res.json({
                        message: "Data updated Successfully",
                        success: true
                    })
                }
            }
            if (phone) {
                response =await UserModel.findOneAndUpdate({email:email},{phone:phone},{new:true})
                if (response) {
                    res.json({
                        message: "Data updated Successfully",
                        success: true
                    })
                }
            }
            else {
                res.json({
                    message: "name or phone is missing",
                    success: false
                })
            }
        }
        else{
            res.json({
                message:"email is missing",
                success:false
            })
        }
    } catch (error) {
        console.log(error.message)
    }

})
//delete user
app.delete('/admin/delete-user', async function(req,res){
    const email=req.body.email
    try {
        const response= await UserModel.deleteOne({email})
        if(response){
            res.json({
                message:"Data deleted Successfully",
                success:true
            })
        }
        else{
            res.json({
                message:"email is missing",
                success:false
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})
//server listening
app.listen(port);


//M5fk4Zr9iNWdXl4T
//mongodb+srv://shreya05082:M5fk4Zr9iNWdXl4T@caradmin.wr7om.mongodb.net/





