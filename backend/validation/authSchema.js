const {z} = require("zod");

//Including the password rules
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d@$!%*?&^#()_\-+=~`[\]{}|:;"'<>,.?/]{8,}$/;

const registerSchema = z.object({
    name: z.string().min(1,"Name is required"),
    email: z.string().email({message: "Invalid email format"}),
    password: z.string().regex(passwordRegex, {
    message:
      "Password must be at least 8 characters and include uppercase, lowercase, digit, and special character",
  }),
    role: z.enum(["customer","admin"]),
    avatarUrl: z.string().optional(),
    bio: z.string().optional(),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

module.exports = {registerSchema,loginSchema};