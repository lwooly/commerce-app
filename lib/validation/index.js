import * as yup from 'yup';

const addProductSchema = yup
  .object({
    image: yup.string().trim().min(1).max(300).url().required(),
    title: yup.string().trim().min(1).max(100).required(),
    description: yup.string().trim().min(1).max(20000).optional(),
    price: yup.number().integer().positive().max(50000).required(),
    quantity: yup.number().integer().positive().max(50000).required(),
  })
  .required();

const updateProductSchema = yup.object({
  image: yup.string().trim().min(1).max(300).url().optional(),
  title: yup.string().trim().min(1).max(100).optional(),
  description: yup.string().trim().min(1).max(20000).optional(),
  price: yup.number().integer().positive().max(50000).optional(),
  quantity: yup.number().integer().positive().max(50000).optional(),
});

export { addProductSchema, updateProductSchema };
