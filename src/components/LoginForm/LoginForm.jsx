import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";

import { MdOutlineMailOutline, MdLock } from 'react-icons/md';
import { Toaster, toast } from 'react-hot-toast';
import s from './LoginForm.module.css';

const loginValSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(12, 'Password must be at most 12 characters')
    .required('Password is required'),
});

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginValSchema),
    mode: 'onChange',
  });


  const onSubmit = async data => {
    try {
      const userData = await dispatch(login(data)).unwrap();
      localStorage.setItem('token', userData.token);
      toast.success('Login successful!', {
        style: {
          border: '3px solid #734aef',
          padding: '10px',
          color: '#fbfbfb',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
        },
      });
      reset();
      navigate('/dashboard/home', { replace: true });
    } catch (error) {
      toast.error('Incorrect email or password. Please try again.', {
        style: {
          border: '3px solid rgba(255, 255, 255, 0.1)',
          padding: '10px',
          color: '#fbfbfb',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
        },
      });
      console.log(error);
    }
  };

  return (
    <div className={s.backdrop}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={s.modal}>
        <div className={s.logo}>
          <img src="/src/assets/logo.svg" alt="Money Guard Logo" />
          <h2 className={s.textLogo}>Money Guard</h2>
        </div>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.inputs}>
            <div className={s.inputGroup}>
              <div className={s.inputWrapper}>
                <MdOutlineMailOutline className={s.inputIcon} />
                {/* <svg className={s.inputIcon} width="12" height="12">
                <use href={`${}#${name}`}> </use>
              </svg> */}
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  {...register('email')}
                  className={s.input}
                />
              </div>
              {errors.email && (
                <p className={s.inputError}>{errors.email.message}</p>
              )}
            </div>

            <div className={s.inputGroup}>
              <div className={s.inputWrapper}>
                <MdLock className={s.inputIcon} />
                {/* <svg className={s.inputIcon} width="12" height="12">
                <use href={`${}#${name}`}></use>
              </svg> */}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  {...register('password')}
                  className={s.input}
                />
              </div>

              {errors.password && (
                <p className={s.inputError}>{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className={s.btns}>
            <button
              type="submit"
              className={`${s.logButton} ${s.multiColorButton}`}
            >
              LogIn{' '}
            </button>

            <Link to="/register">
              <button
                type="button"
                className={`${s.logButton} ${s.whiteButton}`}
              >
                Register{' '}
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
