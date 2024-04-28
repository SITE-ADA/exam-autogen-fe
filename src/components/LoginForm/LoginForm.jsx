import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { login } from "../../Services/ms_auth/UserService";
const LoginForm = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("23234")
      const response = await login(username, password);
      if(response.status === "401" || response.status === "400"){
    }
      else {
      console.log(response.data);

      const { token } = response.data; // Assuming the response includes only the token
      localStorage.setItem("token", token); // Storing the token in localStorage

      const { user } = response.data;
      const user_type_id = user.userTypeId;
      localStorage.setItem("user", JSON.stringify(response.data));

      if (user_type_id === 2) {
        window.location.href = "/InstitutionRepresentative";
      } else if(user_type_id === 1){
        window.location.href = "/Admin";
      } else if(user_type_id === 5){
        window.location.href = "/Instructor/QuestionPools";
      } else if(user_type_id === 4){
        window.location.href = "/Student";
      }
      
    }
      // Add more conditions for other user types if needed
    } catch (error) {
      toast.error('Username or password entered is incorrect', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    }); 
    }
  };

  return (
    <main className={styles.body_login}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className={styles.input_box}>
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUserAlt className={styles.icon} />
          </div>
          <div className={styles.input_box}>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className={styles.icon}/>
          </div>

          <div className={styles.remember_forgot}>
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
        </form>

      </div>
      <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
    </main>
  );
};

export default LoginForm;
