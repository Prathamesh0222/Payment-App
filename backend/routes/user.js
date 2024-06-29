const express = require("express");
const z = require("zod");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
const JWT_SECRET = require("../config.js");
const { authMiddleware } = require("../middleware");

const signupBody = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

userRouter.post("/signup",async(req,res)=>{
    const body = req.body;
    const {success} = signupBody.safeParse(body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken/ Incorrect inputs"
           
        })
       
    }
    const existingUser = await User.findOne({
        username: body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: body.username,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName
    })

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000,
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

const signinBody = z.object({
    username: z.string().email(),
    password: z.string(),
})

userRouter.get("/signin",async(req,res)=>{
    const body = req.body;
    const {success} = signinBody.safeParse(body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: body.username,
        password: body.password
    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        },JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = z.object({
    passowrd: z.string(),
    firstName: z.string(),
    lastName: z.string()
})

userRouter.put("/",authMiddleware,async(req,res)=>{
    const body = req.body;
    const {success} = updateBody.safeParse(body);
    if(!success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({_id:req.userId},body);

    res.json({
        message:"Updated successfully"
    })

})


userRouter.get("/bulk",async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})




module.exports = userRouter ;