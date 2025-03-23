import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../DB/db.config.js";
import { loginSchema, registerSchema } from "../validations/authValidation.js";


class authController{
    static async register(req, res) {
        try {
            const body = req.body;
            const validator = vine.compile(registerSchema);
            const payload = await validator.validate(body);

            // if (payload.dob) {
            //     payload.dob = new Date(payload.dob);
            //     if (isNaN(payload.dob)) {
            //         return res.status(400).json({ error: "Invalid date format" });
            //     }
            // }
            // console.log("Received dob:", req.body.dob);
            console.log("Processed payload before insertion:", payload);
            // * Check if email exist
            const findUser = await prisma.user.findUnique({
                where: {
                    email: payload.email
                }
            })

            if (findUser) {
                return res.status(400).json({
                    error: "Email already exist"
                })
            }


            // * Encrypt the password
            const salt = bcrypt.genSaltSync(10);
            payload.password = bcrypt.hashSync(payload.password, salt);
            
            delete payload.password_confirmation;


            const user = await prisma.user.create({
                data: payload,
            })


            return res.json({ status:200, message: "User created successfully", user });
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                // console.log(error.messages)
                return res.status(400).json({errors: error.messages});
            } else {
                return res.status(500).json({ status: 500, message: "Something went wrong" });
            }
        }
        
    }

    static async login(req, res) {
        try {
            const body = req.body;
            const validator = vine.compile(loginSchema);
            const payload = await validator.validate(body);
            // console.log(body);
            
            // * Find user with email
            const findUser = await prisma.user.findUnique({
                where: {
                    email: payload.email
                }
            });
// console.log("Checking Prisma Query Result for User:", findUser);

            if (findUser) {
                if (!bcrypt.compareSync(payload.password, findUser.password))
                {
                    return res.json({ status:400, message: "Invalid Credentials" });
                }
            
                // * Issue token to user
                const payloadData = {
                    id: findUser.id,
                    email: findUser.email
                    
                }
                const token = jwt.sign(payloadData, process.env.JWT_SECRET, { expiresIn: "365d" });

                return res.json({ status:200, message: "User logged in successfully", access_token:`Bearer ${token}` });
            }

            return res.json({ status:400, message: "User not found"});
    
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                // console.log(error.messages)
                return res.status(400).json({errors: error.messages});
            } else {
                return res.status(500).json({ status: 500, message: "Something went wrong" });
            }
        }
    }
}


export default authController;
