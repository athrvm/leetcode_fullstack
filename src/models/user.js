const moongose = require('mongoose');
const {Schema} = moongose;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:20
    },
    lastName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        immutable:true
    },
    age:{
        type:Number,
        min:6,
        max:100
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    problemSolved:{
        type:[String],
    }
},{
    timestamps:true
})

// After this we will create a mongoose model using the schema defined above. The model will be used to interact with the 'users' collection in the MongoDB database.

const User = moongose.model('User',userSchema); // user will be created with userSchema.
module.exports = User; // Now this can be used in other files by importing it.
