import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';

const RegistrationForm = () => {
  const FormValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
  });

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (e, actions) => {
    // const form = e.currentTarget;

    dispatch(register(e));

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FormValidationSchema}
    >
      <Form>
        <div>
          <label htmlFor={nameFieldId}>
            Username
            <Field type="name" name="name" id={emailFieldId} />
            <ErrorMessage name="name" as="span" />
          </label>
          <label htmlFor={emailFieldId}>
            Email
            <Field type="email" name="email" id={emailFieldId} />
            <ErrorMessage name="email" as="span" />
          </label>
          <label htmlFor={passwordFieldId}>
            Password
            <Field type="password" name="password" id={passwordFieldId} />
            <ErrorMessage name="password" as="span" />
          </label>
        </div>
        <button type="submit">Log In</button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
