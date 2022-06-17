const mongoose = require("mongoose");
const User = require("../models/userModule");
const Bcrypt = require("bcryptjs");


module.exports = app => {

    // Create a New User 
    app.post("/Signup", req, res => {
        // Encrypt the user password and store the different string. It is not identify  unauthorized person 

        req.body.password = Bcrypt.hashSync(req.body.password);
        // user entered values :  Name,Email,Address,Phone,Password
        // req.body.status : it's default value Not entered by user 
        let data = req.body;

        let userDetails = new User({
            ...data
        });
        //  Store the req.body values into User collection
        userDetails.save().then(details => {
            if (details) {
                return res.send('User Added Successfully');
            } else {
                return res.send('User Not Added ');
            }
            // Its show an error to not able to save users value
        }).catch(err => {
            console.log("User save error", err);
        });

    });
    
    
app.post('/signIn',(req,res)=>{
    console.log(req.body);
    let no= "1233456";
    const saltRounds = 10
    Bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          throw err
        } else {
            req.body.password= Bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) {
              throw err
            } else {
              console.log(hash)
              //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
            }
          })
        }
      })
    console.log("Dharani",req.body);
    const passwordEnteredByUser = "mypass12312345"
    const hash = "$2a$10$P1xuwR8SA8iSBG2xWoWt1O4XG5x7tqY8XU/dEZlOA1DEdxATA5VY6"
    
    Bcrypt.compare(passwordEnteredByUser, hash, function(err, isMatch) {
      if (err) {
        throw err
      } else if (!isMatch) {
        console.log("Password doesn't match!")
      } else {
        console.log("Password matches!")
      }
    })
    // console.log(values);

});


    // Login to app using users Email, password
    app.post('/login', req, res => {

        // to store current log in date 
        req.body.lastLoginAt = new Date()
        // to change the normal string to encrypt password  

        request.body.password = Bcrypt.hashSync(request.body.password);
        // check the user input and stored data values if it is match allow to login otherwise show an error 
        // Got a email and password to the user
        User.findOne({
            Email: req.body.Email,
            Password: req.body.Password
        }, (err, user) => {
            if (err) {
                console.log("Please check Email and Password...");
                throw err;
            } else {
                User.findOneAndUpdate({ "Email": req.body.email }, { "lastLoginAt": req.body.lastLoginAt }, function (err, lastLogin) {
                    if (lastLogin) {
                        res.send("LastLogin Updated Successfully");
                    }
                    else {
                        res.send("LastLogin Update UnSuccess");
                        throw err;
                    }
                });
                return res.json({ user, status: 200, type: 'Success' })

            }
        }).catch(err => {
            console.log("Signup error", err);
        });
    });



    // to set a resetPassword based on user email id
    app.post('/updatePassword', req, res => {

        //req.body got a users email and password

        req.body.password = Bcrypt.hashSync(req.body.password);  // this code to encrtpted the users password

        // to find the users based on email id and change the encrtpted password
        User.findOneAndUpdate({ "Email": req.body.email }, { "Password": req.body.Password }, function (err, values) {
            if (values) {
                return res.json({ values, status: 200, type: 'Success' })

            }
            else {
                console.log("Please check Email and Password...");
                throw err;
            }
        }).catch(err => {
            console.log("Reset Password save error", err);
        });
    });




    // Deactivated the users status 
    app.post('/updateUserStatus/:userId', req, res => {
        // req.params get into login user
        let data = req.params.id;
        //search the user id based user and update the status Activate into Deactive
        User.findOneAndUpdate({ "_id": data }, { "Status": "Deactivate" }, function (err, values) {
            if (values) {
                res.send("Deactivated User Successfully");
            }
            else {
                console.log("Deactivated User Not Success");
                throw err;
            }
        }).catch(err => {
            console.log("Deactivated save error", err);
        });
    });



    // Update the users values 
    app.post('/updateUser/:userId', req, res => {
        // req.params get into login user
        let data = req.params.id;
        //search the user id based user and update the user input values
        User.findOneAndUpdate({ "_id": data }, req.body, function (err, values) {
            if (values) {
                res.send("Update User Successfully");
            }
            else {
                console.log("Update User Not Success");
                throw err;
            }
        }).catch(err => {
            console.log("Deactivated save error", err);
        });
    });



    // Find a particular user and delete
    app.get("/removeUser/:userId", req, res => {
        let { id } = req.params.userId;

        //find userId based to remove the  values in user collection
        User.findByIdAndDelete({ _id: id })
            .then(details => {
                if (details) {
                    return res.json({ details, status: 200, type: 'Success' })
                } else {
                    return res.send('Something went wrong please try after sometime')
                }
            }).catch(err => {
                console.log("Food delete error", err);
            });
    });



}
