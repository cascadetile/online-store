import { FormikErrors, FormikTouched } from "formik";

interface Props {
  label: string
  inputName: 'fullname' | 'phone' | 'deliveryAddress' | 'email' | 'cardNumber' | 'cardExpiryDate' | 'cvc'
  placeholder: string
  touched: FormikTouched<{
    fullname: string;
    phone: string;
    deliveryAddress: string;
    email: string;
    cardNumber: string;
    cardExpiryDate: string;
    cvc: string;
  }>
  handleChange: (e: React.ChangeEvent<any>) => void
  handleBlur: (e: any) => void
  errors: FormikErrors<{
    fullname: string;
    phone: string;
    deliveryAddress: string;
    email: string;
    cardNumber: string;
    cardExpiryDate: string;
    cvc: string;
  }>
}

export const FormElement: React.FC<Props> = ({label, inputName, placeholder, touched, handleChange, handleBlur, errors}) => {
  return <div>
    <label htmlFor="favoriteFood">{label}:</label>
    <input
        type="text"
        name={inputName}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
    />
    {touched[inputName] && errors[inputName]
    ? <div>{errors[inputName]}</div>
    : null}
  </div>
}