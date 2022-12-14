import styles from "../styles/Navbar.module.css";
import { FaRegUser, FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function Navbar() {
  const [menuClosed, setMenuClosed] = useState(true);
  const [logedIn, setLogedIn] = useState(false);
  const [admin, setAdmin] = useState<boolean>(false);
  const [loginPopoverClosed, setLoginPopoverClosed] = useState(true);
  const router = useRouter();

  const menuToggle = () => {
    const menu = document.querySelector<HTMLElement>(
      ".Navbar_navbarNavigation__EeG5G"
    );

    if (menuClosed) {
      menu ? (menu.style.display = "flex") : console.log("menu error");
      setMenuClosed(false);
    } else if (!menuClosed) {
      menu ? (menu.style.display = "none") : console.log("menu error");
      setMenuClosed(true);
    }
  };

  const Logout = () => {
    localStorage.clear();
    router.push("/");
  };

  const NewUser = () => {
    localStorage.setItem("aLink", "");
    router.push("/user/create");
  };

  const reportBug = () => {
    localStorage.setItem("aLink", "");
    router.push("/user/bugs");
  };

  const loginToggle = () => {
    const loginPopover = document.querySelector<HTMLElement>(
      ".Navbar_navbarLogginPopover__pn4wB"
    );

    if (loginPopoverClosed) {
      loginPopover
        ? (loginPopover.style.display = "block")
        : console.log("login popover error");
      setLoginPopoverClosed(false);
    } else if (!loginPopoverClosed) {
      loginPopover
        ? (loginPopover.style.display = "none")
        : console.log("login popover error");
      setLoginPopoverClosed(true);
    }
  };

  useEffect(() => {
    const loginState = localStorage.getItem("logedIn") === "true";
    const getAdmin = localStorage.getItem("admin") === "true";
    setAdmin(getAdmin);
    setLogedIn(loginState);
  });

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <div>
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
          <h3>Cat Vision</h3>
        </div>
        {!logedIn && (
          <div className={styles.navbarNavigation}>
            <p>|</p>
            <a className="navigationLink" href="/#inicio">
              Inicio
            </a>
            <a className="navigationLink" href="/#productos">
              Productos
            </a>
            <a className="navigationLink" href="/#equipo">
              Equipo
            </a>
          </div>
        )}
      </div>
      {!logedIn && (
        <div className={styles.navbarRight}>
          <FaRegUser className={styles.logginIcon} />
          <Link href="/login">
            <a className="navigationLink">Iniciar Sesi??n</a>
          </Link>
          <GiHamburgerMenu
            className={styles.menuToggle}
            onClick={() => menuToggle()}
          />
        </div>
      )}
      {logedIn && (
        <div className={styles.navbarLogedIn}>
          <FaUserCircle
            className={styles.logginIcon}
            style={{
              fontSize: "28px",
              marginRight: "48px",
              cursor: "pointer",
              color: "#fff",
            }}
            onClick={loginToggle}
          />
          <div className={styles.navbarLogginPopover}>
            <ul>
              <li>Configuraci??n</li>
              {admin && <li onClick={NewUser}>Nuevo Usuario</li>}
              <li onClick={reportBug}>Reportar Error</li>
              <li onClick={Logout}>Cerrar Sesi??n</li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
