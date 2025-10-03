import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";

export const signUp = async(req , res)=>{
    try{
        const {fullName , email , password , moblie , role} = req.body;

        const user = await User.findOne({email})

        if(user){
            return res.status(400).json({
                message : "User already exists"
            })
        }

        if(password.length < 6){
            return res.status(400).json({
                message : "Password must be at least 6 characters"
            })
        }

        if(moblie.length < 10){
            return res.status(400).json({
                message : "Invalid moblie number"
            })
        }

        const hashPassword = await bcrypt.hash(password , 10);

        const newUser = await User.create({
            fullName,
            email,
            password : hashPassword,
            moblie,
            role
        })

        const token=await genToken(newUser._id);
        res.cookie("token" , token , {
            secure : false,
            sameSite : 'strict',
            maxAge : 7*24*60*60*1000,
            httpOnly : true
        })

        return res.status(201).json({
            message : "User created successfully",
            user : newUser,
            token : token
        })

    }
    catch(error){
        res.status(500).json({
            message : "Error while creating user" , error : error.message
        })
    }
}

export const signIn = async(req , res)=>{
    try{
        const {email , password } = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message : "User does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch){
            return res.status(400).json({
                message : "Invalid credentials"
            })
        }

        const token=await genToken(user._id);
        res.cookie("token" , token , {
            secure : false,
            sameSite : 'strict',
            maxAge : 7*24*60*60*1000,
            httpOnly : true
        })

        return res.status(200).json({
            message : "User signed in successfully",
            user ,
            token 
        })

    }
    catch(error){
        res.status(500).json({
            message : "Sign In error" , error : error.message
        })
    }
}