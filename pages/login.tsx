import styles from "../styles/Login.module.css";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login: NextPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [remember, setRemember] = useState(false);

  const handdleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }
  const handdlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }
  const handdleRemember = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  }

  const submitForm = async(e: any) => {
    e.preventDefault();
    const loginValues = {
      username: username,
      password: password,
    }
    
    // const loginFetch = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}user/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(loginValues)
    // });
    // const loginJSON = loginFetch.json();
    // console.log(loginJSON);
    

    localStorage.setItem("logedIn", "true");
    router.push('/dashboard');
  }

  return (
    <div className={styles.formPage}>
      <form action="POST" className={styles.formContainer}>
        <div className={styles.formTitle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="193.132"
            height="187.996"
            viewBox="0 0 188 183"
          >
            <path
              className="logo-face-white"
              d="M35,68.714L17,44c3.783-16.266,48.36,3.55,45,18"
            />
            <path
              className="logo-face-white"
              d="M144,71l16.571-27C150.71,33,116.917,53.9,122,59.571"
            />
            <path
              className="logo-face-white"
              d="M36,107v16.571L48,135h85.143L144,123.571V109"
            />
            <path
              className="logo-face-white"
              d="M32.571,82.429V70L46.286,59.571h86.857l13.714,13.714V87"
            />
            <path
              className="logo-face-white"
              d="M50.857,96.143c1.112-.513-41.737-23.989-64-13.714"
            />
            <path
              className="logo-face-white"
              d="M50.857,105.286c0.746-.5-29.6-19.886-58.31-0.746"
            />
            <path
              className="logo-face-white"
              d="M50.857,105.286C52.26,100.45,5.1,103.4.571,119"
            />
            <path
              className="logo-face-white"
              d="M131,96.143c-0.666-.184,39.512-21.083,62.725-14.66a35.984,35.984,0,0,0,7.989.946"
            />
            <path
              className="logo-face-white"
              d="M133.143,103c-0.216-5.618,59.076-11.457,59.428-2.286"
            />
            <path
              className="logo-face-white"
              d="M133.143,103c0.086-.4,49.115-1.653,45.714,14"
            />
            <circle className="logo-eye-white" cx="91.5" cy="97.5" r="29.5" />
          </svg>
          <h3>Bienvenido a Cat Vision</h3>
        </div>
        <div className='inputBox'>
          <input type="text" required onChange={handdleUsername} />
          <span>Correo</span>
        </div>
        <div className='inputBox'>
          <input type="password" required onChange={handdlePassword} />
          <span>Contraseña</span>
        </div>
        <div className={styles.formLinks}>
          <div>
            <label>
              <input type="checkbox" id="remeberMe" onChange={handdleRemember}/> Recuerdame{" "}
            </label>
          </div>
          <a href="">¿Olvidaste la contraseña?</a>
        </div>
        <input type="submit" value="Ingresar" onClick={submitForm}/>
      </form>
    </div>
  );
};

export default Login;
