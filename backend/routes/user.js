const express = require("express");
const z = require("zod");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");
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
    const randomBalance = 1 + Math.random() * 10000;

    await Account.create({
        userId,
        balance: randomBalance
    })

    const token = jwt.sign({
        userId
    },process.env.JWT_SECRET || "");

    res.json({
        message: "User created successfully",
        token: token,
        balance: randomBalance
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
        },process.env.JWT_SECRET || "");

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

userRouter.get("/name",authMiddleware, async (req,res)=>{
    try {
        if (!req.userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            firstName: user.firstName,
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
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

userRouter.put("/profile",async(req,res)=>{
    const {firstName, lastName} = req.body;
    const userId = req.userId;
    const response = await User.updateOne({
        _id: userId
    },{
        $set:{firstName,
        lastName}
    })
    if(response.nModified === 0){
        return res.status(411).json({
            message: "Error while updating"
        })
    }

    const updatedUser = await User.findById(userId);

    res.json({
        message: "Updated successfully",
        updatedUser
    })
})


module.exports = userRouter ;
