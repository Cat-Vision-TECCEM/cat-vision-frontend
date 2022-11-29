import React from 'react'
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageNavigation from "../../components/PageNavigation";
import toast from "react-hot-toast";


const create: NextPage = () => {
  const router = useRouter();
  const [companyId, setCompanyId] = useState("");
  const [admin, setAdmin] = useState<boolean>(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const createUser = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const creatingUser = toast.loading("Creando Usuario...");

    const userData = {
      store_or_company_id: companyId,
      username: username,
      email: email,
      password: password,
      is_admin: isAdmin,
      type: "company"
    }
    console.log(JSON.stringify(userData));
    
    const newUser = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const jsonNewUser = await newUser.json();
    toast.dismiss(creatingUser);
    if(jsonNewUser.error){
      toast.error(
        jsonNewUser.error
      );
    }else{
      toast.success(jsonNewUser.success);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "username") {
      setUsername(e.target.value);
    } else if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }else if (e.target.id === "isAdmin") {
      setIsAdmin(e.target.checked);
    }
  };

  useEffect(() => {
    const getCompanyId = localStorage.getItem("company_id")
    const getAdmin = localStorage.getItem("admin") === "true";
    const token = localStorage.getItem("token");
    setCompanyId(localStorage.getItem("company_id") || "2");
    setAdmin(getAdmin)
    setToken(token || "");
    if (!getAdmin) {
      router.push("/login");
    }
  }, []);

  if(admin){
    return (
      <div className='createContainer'>
        <PageNavigation />
        <form action="POST" className="formContainer">
          <div className="createProduct">
            <h1 style={{ color: "white" }}>Crea un nuevo Usuario</h1>
            <div className="inputBox">
              <input
                type="text"
                required
                id="username"
                onChange={handleChange}
                value={username}
              />
              <span>Usuario</span>
            </div>
            <div className="inputBox">
              <input
                type="text"
                required
                id="email"
                onChange={handleChange}
                value={email}
              />
              <span>Correo</span>
            </div>
            <div className="inputBox">
              <input
                type="password"
                required
                id="password"
                onChange={handleChange}
                value={password}
              />
              <span>Contraseña</span>
            </div>
            <div>
              <input
                type="checkbox"
                id="isAdmin"
                onChange={handleChange}
                required
              />{" "}
              Administrador
            </div>
            <input
              type="submit"
              value="Crear Usuario"
              onClick={(e: React.MouseEvent<HTMLInputElement>) =>
                createUser(e)
              }
            />
          </div>
        </form>
      </div>
    )
  }else {
    return <p>No tienes los permisos!</p>
  }
}

export default create