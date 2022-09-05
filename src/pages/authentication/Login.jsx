import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./login.scss";
import axios from "axios";
import { AUTH } from "../../constants/paths";
import ButtonLoading from "../../components/loading/ButtonLoading";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../redux/auth/login.actions";

import { auth, google, facebook } from "../../conifg/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import { setTokenAuthenticator } from "../../services/Authenticator.service";

const schema = yup
  .object({
    username: yup.string().required("Vui lòng nhập username."),
    // .email("Định dạng email không hợp lệ."),
    password: yup.string().required("Vui lòng nhập mật khẩu."),
  })
  .required();

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!loading) {
      setLoading(true);
      try {
        const response = await axios.post(AUTH.SIGN_IN, {
          username: data.username,
          password: data.password,
        });
        console.log("response.data :", response.data);
        if (response.data && response.data.success) {
          setLoading(false);
          setTokenAuthenticator(response.data.data.accessToken);
          // dispatch(setUserData(response.data.data));
          navigate("/");
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const loginWithGoogle = async () => {
    if (!googleLoading) {
      setGoogleLoading(true);
      const result = await signInWithPopup(auth, google);
      const { displayName, email, photoURL, phoneNumber } = result.user;
      try {
        const res = await axios.post(AUTH.SIGN_IN_EXTERNAL, {
          username: displayName,
          fullName: displayName,
          email,
          imageAvatar: photoURL,
          phone: phoneNumber,
        });
        console.log("res :", res);
        if (res.data.success && res.data.data) {
          setTokenAuthenticator(res.data.data.accessToken);
          setGoogleLoading(false);
          navigate("/");
        }
      } catch (error) {
        setGoogleLoading(false);
      }
    }
  };
  const loginWithFacebook = async () => {
    const result = await signInWithPopup(auth, facebook);
    console.log("result :", result);
  };

  return (
    <div className="container">
      <div className="login w-[500px] bg-white">
        <h3 className="login__title mb-2">Đăng nhập</h3>
        <p className="login__note">
          Để đảm bảo an toàn, xin vui lòng đăng nhập để truy cập vào thông tin
        </p>
        <div className="login__form ">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <span className="text-sm font-medium">Username</span>
              <div className="form-input">
                <input
                  className={`${
                    errors.username?.message
                      ? "border border-red-500"
                      : "border-1-grey"
                  } `}
                  {...register("username")}
                  placeholder="Username"
                />
              </div>
              <p className="text-sm text-red-600 font-medium">
                {errors.username?.message}
              </p>
            </div>

            <div className="form-control">
              <span className="text-sm font-medium">Mật khẩu</span>
              <div className="form-input">
                <input
                  className={`${
                    errors.password?.message
                      ? "border border-red-500"
                      : "border-1-grey"
                  } `}
                  {...register("password")}
                  placeholder="Mật khẩu"
                  type="password"
                />
              </div>
              <p className="text-sm text-red-600 font-medium">
                {errors.password?.message}
              </p>
            </div>
            <div className="login__button cursor-pointer">
              <button type="submit" className="w-full  flex justify-center">
                {loading ? <ButtonLoading /> : "Đăng nhập"}
              </button>
            </div>
          </form>
        </div>
        <div className="mt-[24px] flex justify-between">
          <a href="/" className="text-blue-500 text-sm">
            Tạo tài khoản
          </a>
          <div className="flex items-center">
            <i className="bx bxs-lock-open text-blue-500"></i>
            <a href="/" className="text-blue-500 text-sm">
              Quên mật khẩu?
            </a>
          </div>
        </div>
        <div className="py-5 flex justify-center items-center align-middle ">
          <div className="border-grey"></div>
          <span className="font-medium text-sm bg-white absolute px-2">
            Hoặc đăng nhập bằng
          </span>
        </div>

        <div className="btnWrapper">
          <button
            className="socialBtn"
            onClick={() => {
              loginWithGoogle();
            }}
          >
            <div className="flex justify-center items-center">
              {googleLoading ? (
                <ButtonLoading color="blue-500" />
              ) : (
                <>
                  <img
                    className="mr-1"
                    src="https://cdn6.agoda.net/images/universal-login/google-logo-v2.svg"
                    alt=""
                  />
                  <span className="text-sm font-medium ">Google</span>
                </>
              )}
            </div>
          </button>
          <div className="w-[50%] py-2 pr-1">
            <button
              className="socialBtn"
              onClick={() => {
                loginWithFacebook();
              }}
            >
              <div className="flex justify-center items-center">
                <img
                  className="mr-1"
                  src="https://cdn6.agoda.net/images/universal-login/facebook-logo.svg"
                  alt=""
                />
                <span className="text-sm font-medium ">Facebook</span>
              </div>
            </button>
          </div>
          <div className="w-[50%] py-2 pl-1">
            <button className="socialBtn">
              <div className="flex justify-center items-center">
                <img
                  className="mr-1"
                  src="https://cdn6.agoda.net/images/universal-login/apple-logo.svg"
                  alt=""
                />
                <span className="text-sm font-medium ">Apple</span>
              </div>
            </button>
          </div>
          <div className="terms">
            <p className="text-xs font-medium text-center pt-2">
              Khi đăng nhập, tôi đồng ý với các Điều khoản sử dụng và Chính sách
              bảo mật của Travel Together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
