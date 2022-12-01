import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageNavigation from "../../components/PageNavigation";
import toast from "react-hot-toast";

const bugs: NextPage = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState("");
  const [subject, setSubject] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [error, setError] = useState<string>("");

  const reportBug = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reportingBug = toast.loading("Creando Producto...");
    const bug = {
      company_id: companyId,
      body: error,
      status: "open",
      username: user,
      subject: subject,
    };
    const reportBugFetch = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}ticket/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bug),
    });
    console.log(JSON.stringify(bug));
    
    const reportBugJSON = await reportBugFetch.json();

    toast.dismiss(reportingBug);
    if (reportBugJSON.error) {
      toast.error(reportBugJSON.error);
    } else {
      toast.success(reportBugJSON.success);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "error") {
      setError(e.target.value);
    } else if (e.target.id === "subject") {
      setSubject(e.target.value);
    }
  };

  useEffect(() => {
    const userT = localStorage.getItem("type");
    setUser(localStorage.getItem("user") || "");
    setCompanyId(localStorage.getItem("company_id") || "");

    setUserType(userT ? userT : "");
    if (userT === "company") {
    } else {
      router.push("/login");
    }
  }, []);

  if (userType === "company") {
    return (
      <div className="createContainer">
        <PageNavigation />
        <form action="POST" className="formContainer">
          <div className="createProduct">
            <div className="inputBox">
              <input
                type="text"
                onChange={handleChange}
                id="subject"
                value={subject}
                required
              />
              <span>Titulo</span>
            </div>
            <textarea
              onChange={(e) => handleChange(e)}
              name="Text1"
              id="error"
              rows={10}
              placeholder="Describe el error"
              style={{ width: "75%" }}
            ></textarea>
            <input
              type="submit"
              value="Reportar Error"
              onClick={(e: React.MouseEvent<HTMLInputElement>) => reportBug(e)}
            />
          </div>
        </form>
      </div>
    );
  } else {
    return <p>No tienes los permisos!</p>;
  }
};

export default bugs;
