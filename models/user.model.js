const mongoose =require('mongoose')

const userSchema= mongoose.Schema(
    {
        name: {
            type: String,
            required : [true, "enter name"],
        },
        username: {
            type: String,
            required: true,
            lowerCase: true
        },
        age: {
            type: Number,
            required: true,
            default: 0
        },
        email: {
            type: String,
            required: true,
            lowerCase: true
        }
    },
    {
        timestamps: true
    }
)
const User = mongoose.model("User", userSchema)

module.exports = User;