import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

const reset: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("")
  
  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const resetPassword = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const emailInfo = {
      email: email,
    };
    const reset = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_URL}user/recover-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailInfo),
      }
    );
    const resetJSON = await reset.json()
    if(resetJSON.error){
      toast.error(resetJSON.error)
    }else{
      toast.success("Se envio un correo para recetear su contraseña");
      router.push("/login")
    }
  };

  return (
    <div className="createContainer">
      <form action="POST" className="formContainer">
        <div className="createProduct">
          <div className="inputBox">
            <input
              type="text"
              onChange={handleChange}
              id="subject"
              value={email}
              required
            />
            <span>Correo</span>
          </div>
          <input
            type="submit"
            value="Solicitar contraseña nueva"
            onClick={(e) => resetPassword(e)}
          />
        </div>
      </form>
    </div>
  );
};

export default reset;
