import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail, isMobilePhone } from "validator";
import "./Register.css"
import { register } from "../../actions/auth";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const validPhone = (value) => {
  if (!isMobilePhone(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid phone number.
      </div>
    );
  }
};


const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState('');
  
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();
  
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, phone, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="signup-form">
    <h1>Sign Up</h1>
    <form onSubmit={handleRegister}>
      <div className='input'>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='input'>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='input'>
        <label htmlFor="phone-number">Phone Number</label>
        <input
          type="tel"
          id="phone-number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className='input'>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='input'>
      <label htmlFor="repeat-password">Repeat Password</label>
          <input
            type="password"
            id="repeat-password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          {/* {passwordError && <p className="password-error">{passwordError}</p>} */}
        </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
    // <div className="col-md-12">
    //   <div className="card card-container">
    //     <img
    //       src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
    //       alt="profile-img"
    //       className="profile-img-card"
    //     />

    //     <Form onSubmit={handleRegister} ref={form}>
    //       {!successful && (
    //         <div>
    //           <div className="form-group">
    //             <label htmlFor="username">Username</label>
    //             <Input
    //               type="text"
    //               className="form-control"
    //               name="username"
    //               value={username}
    //               onChange={onChangeUsername}
    //               validations={[required, vusername]}
    //             />
    //           </div>

    //           <div className="form-group">
    //             <label htmlFor="email">Email</label>
    //             <Input
    //               type="text"
    //               className="form-control"
    //               name="email"
    //               value={email}
    //               onChange={onChangeEmail}
    //               validations={[required, validEmail]}
    //             />
    //           </div>

    //           <div className="form-group">
    //             <label htmlFor="phone">Phone</label>
    //             <Input
    //               type="text"
    //               className="form-control"
    //               name="phone"
    //               value={phone}
    //               onChange={onChangePhone}
    //               validations={[required, validPhone]}
    //             />
    //           </div>

    //           <div className="form-group">
    //             <label htmlFor="password">Password</label>
    //             <Input
    //               type="password"
    //               className="form-control"
    //               name="password"
    //               value={password}
    //               onChange={onChangePassword}
    //               validations={[required, vpassword]}
    //             />
    //           </div>

    //           <div className="form-group">
    //             <button className="btn btn-primary btn-block">Sign Up</button>
    //           </div>
    //         </div>
    //       )}

    //       {message && (
    //         <div className="form-group">
    //           <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
    //             {message}
    //           </div>
    //         </div>
    //       )}
    //       <CheckButton style={{ display: "none" }} ref={checkBtn} />
    //     </Form>
    //   </div>
    // </div>
  );
};

export default Register;
