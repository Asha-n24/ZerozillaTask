import Joi from "joi-browser";

export const validateProperty = (
  required,
  name,
  value,
  label = "Current Field",
  anyVal = null
) => {
  let Joischema = {};
  if (required) {
    Joischema = {
      name: Joi.string().label(label).required().error(() => {
        return { message: `${label} is required` };
      }),
     
      password: Joi.string().required().error(() => {
        return { message: `Required Field` };
      }),
      email: Joi.string().email().required().error(() => {
        return { message: `Required valid mailId` };
      }),

      
      contact: Joi.number()
        .integer()
        .min(1000000000)
        .max(9999999999)
        
        .error(() => {
          return { message: "Enter Correct Mobile Number" };
        })
        .required(),
        number: Joi.number().integer().min(0).required().error(() => {
            return { message: `${label} is required` };
          }),
    };
  } else {
    Joischema = {
      name: Joi.string().label(label).allow(null),
      password: Joi.string().label(label).allow(null),
      contact: Joi.number()
        .integer()
        .min(1000000000)
        .max(9999999999)
        .label(label)
        .error(() => {
          return { message: "Enter Correct Mobile Number" };
        })
        .allow(null),
        number: Joi.number()
        .integer()
        .min(0)
        .label(label)
        .error(() => {
          return { message: "Enter the number" };
        })
        .allow(null),
    };
  }
  const schema = Joi.reach(Joi.object(Joischema), name);
  const { error } = Joi.validate(value, schema);
  return error ? error.details[0].message : undefined;
};




