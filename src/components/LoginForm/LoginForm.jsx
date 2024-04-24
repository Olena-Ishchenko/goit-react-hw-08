import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/operations';

const LoginForm = () => {
  const FormValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const emailFieldId = useId();
  const passwordFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (e, actions) => {
    // const form = e.currentTarget;

    dispatch(logIn(e))
      .unwrap()
      .then(() => {
        console.log('login success');
      })
      .catch(() => {
        console.log('login error');
      });

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

export default LoginForm;
