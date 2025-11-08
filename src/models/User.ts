import mongoose from "mongoose";
import bcrypt from "bcryptjs"

export interface IUser {
    name : string
    email : string
    password : string
    _id ?: mongoose.Types.ObjectId
    createdAt ?: Date
    updatedAt ?: Date
}

const userSchama = new mongoose.Schema<IUser>(
    {
        name : {
            type: String,
            required: true,
            default: 'Admin'
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

// writting a pre hook to prevent the password directly save into database
userSchama.pre("save", async function (){
    // this is whenever their is any modification in the password by the user in first go we need to do it self
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
})

export const User = mongoose.models.users || mongoose.model<IUser>('users',userSchama)