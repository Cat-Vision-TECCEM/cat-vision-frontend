import styles from "../styles/PageNavigation.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

function PageNavigation() {
  const [pageLink, setPageLink] = useState("Inicio");
  
  const newPageLink = (lname: string) => {
    setPageLink(lname);
    localStorage.setItem("aLink", lname);
  };

  const mainLinks = [
    {
      lname: "Inicio",
      url: "/dashboard",
    },
    {
      lname: "Tiendas",
      url: "/dashboard/stores",
    },
  ];

  const secondaryLinks = [
    {
      lname: "Agregar Nueva Tienda",
      url: "/dashboard/newStore",
    },
    {
      lname: "Agregar Nuevo Producto",
      url: "/dashboard/newProduct",
    },
  ];

  useEffect(() => {
    setPageLink(localStorage.getItem("aLink") || "Inicio")
  })

  return (
    <div className={styles.pageNavigate}>
      <div className={styles.pageMainLinks}>
        {mainLinks.map((link, index) => {
          return (
            <Link href={link.url} key={index}>
              <a
                className={
                  pageLink === link.lname ? styles.activeLink : "navigationLink"
                }
                onClick={() => newPageLink(link.lname)}
              >
                {link.lname}
              </a>
            </Link>
          );
        })}
      </div>
      <div className={styles.pageMainLinks}>
        {secondaryLinks.map((link, index) => {
          return (
            <Link href={link.url} key={index}>
              <a
                className={
                  pageLink === link.lname ? styles.activeLink : "navigationLink"
                }
                onClick={() => newPageLink(link.lname)}
              >
                {link.lname}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default PageNavigation;
