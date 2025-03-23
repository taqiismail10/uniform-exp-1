import vine from "@vinejs/vine";

export const registerSchema = vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(150),
    regNumber: vine.number().min(100000).max(999999),
    email: vine.string().trim().email(),
    password: vine.string().trim().confirmed(),
    password_confirmation: vine.string(),
});

export const loginSchema = vine.object({
    
    email: vine.string().trim().email(),
    password: vine.string(),
    
});

export const applicationFormSchema = vine.object({
    schoolName: vine.string().trim(),
    sscReg: vine.number(), // Change to number
    sscRoll: vine.number(), // Change to number
    collegeName: vine.string().trim(),
    hscReg: vine.number(), // Change to number
    hscRoll: vine.number(), // Change to number
});