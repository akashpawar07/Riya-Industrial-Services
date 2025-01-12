import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
       type: String,
       trim: true,
       required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    forgotPasswordToken:{
        type :String,
        default : ""
    },

    verifyToken: {
        type :String,
        default : ""
    },
    
    forgotPasswordTokenExpiry: String,
    verifyTokenExpiry: Date,

})

// Hash password before saving
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
    next();
});

const User = mongoose.models.Users || mongoose.model("Users", userSchema);
export default User;
