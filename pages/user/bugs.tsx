import React from 'react'
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PageNavigation from "../../components/PageNavigation";

const bugs: NextPage = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const userT = localStorage.getItem("type");

    setUserType(userT ? userT : "");
    if (userT) {
      router.push("/login");
    }
  }, []);

  if(userType){
    return (
      <div>bugs</div>
    )
  }else {
    return <p>No tienes los permisos!</p>
  }
}

export default bugs