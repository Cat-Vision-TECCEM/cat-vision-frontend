import styles from "../styles/PageNavigation.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import {MdShoppingCart} from 'react-icons/md';


function GroceriesNavigation() {
  const [pageLink, setPageLink] = useState("Proveedores");
  
  const newPageLink = (lname: string) => {
    setPageLink(lname);
    localStorage.setItem("aLink", lname);
  };

  const mainLinksGroceries = [
    {
      lname: "Proveedores",
      url: "/grocery_stores/providers"
    },
  ];



  useEffect(() => {
    setPageLink(localStorage.getItem("aLink") || "Inicio")
  })

  return (
    <div className={styles.pageNavigate}>
      <div className={styles.pageMainLinks}>
        {mainLinksGroceries.map((link, index) => {
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
      <div>
        <Link href="/grocery_stores/cart">
          <MdShoppingCart className={styles.cart}/>
        </Link>
      </div>
    </div>
  );
}

export default GroceriesNavigation;
