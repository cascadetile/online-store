import * as Yup from 'yup';
export const validationSchema = Yup.object({
  fullname: Yup.string()
    .matches(/^\b[a-z]{3,}\b \b[a-z]{3,}\b/i, 'Should have at least 2 words each length of 3 minimum')
    .required('*required'),
  phone: Yup.string()
    .matches(/^\+/, 'Doesn\'t start with +')
    .matches(/^\+\d+$/, 'No numbers or contains non-numeric characters')
    .min(11, 'Must be 11 characters or more')
    .required('*required'),
  deliveryAddress: Yup.string()
    .matches(/^\b[a-zA-Z]{5,}\b( \b[a-zA-Z]{5,}\b){2,}/, 'Should have at least 3 words each length of 5 minimum')
    .required('*required'),
  email: Yup.string().email('Invalid email address').required('*required'),
  cardNumber: Yup.string()
    .matches(/\d/, 'Contains non-numeric character')
    .min(16, 'Minimum of 16')
    .max(16, 'Maximum of 16')
    .required('*required'),
  cardExpiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])/, 'Month must fit to template 01-12')
    .min(5)
    .max(5)
    .required('*required'),
  cvc: Yup.string()
    .matches(/\d/, 'Contains non-numeric character')
    .max(3)
    .min(3)
    .required('*required')
});