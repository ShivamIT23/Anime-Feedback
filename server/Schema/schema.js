
const z = require("zod");

const schema = z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Must be 8 or more characters long" }),
  });

  module.exports = schema;