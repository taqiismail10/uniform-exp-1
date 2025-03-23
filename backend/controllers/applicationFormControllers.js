import vine, { errors } from "@vinejs/vine";
import prisma from "../DB/db.config.js";
import { applicationFormSchema } from "../validations/authValidation.js";

class applicationFormController {
    static async create(req, res) {
        try {
            const body = req.body;
            const validator = vine.compile(applicationFormSchema);
            const payload = await validator.validate(body);

            const userId = req.user.id; // Assuming `req.user` is populated by auth middleware

            const applicationForm = await prisma.applicationForm.create({
                data: {
                    ...payload,
                    userId,
                },
            });

            return res.json({ status: 200, message: "Application form submitted successfully", applicationForm });
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

export default applicationFormController;