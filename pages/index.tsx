import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { AiFillCheckCircle } from "react-icons/ai";
import anime from "animejs";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  var animateElement = [];
  for (let i = 1; i <= 100; i++) {
    animateElement.push(i);
  }

  useEffect(() => {
    const userT = localStorage.getItem("type");
    if (userT === "company") {
      router.push("/dashboard");
    } else if (userT === "store") {
      router.push("/grocery_stores/providers");
    }

    let dotAll = document.querySelectorAll(".animationElement");
    if (dotAll !== undefined) {
      const animation = anime.timeline({
        targets: dotAll,
        easing: "easeInOutExpo",
        delay: anime.stagger(100, { grid: [10, 10], from: "center" }),
        loop: true,
      });
      animation.add({
        rotateZ: 180,
        translateY: anime.stagger(-20, {
          grid: [10, 10],
          from: "center",
          axis: "y",
        }),
        translateX: anime.stagger(-20, {
          grid: [10, 10],
          from: "center",
          axis: "x",
        }),
        opacity: 1,
      }).add({
        borderRadius: 50,
      }).add({
        scale: 0.2
      })
      animation.add({
        rotateZ: 180,
        translateY: anime.stagger(0, {
          grid: [10, 10],
          from: "center",
          axis: "y",
        }),
        translateX: anime.stagger(0, {
          grid: [10, 10],
          from: "center",
          axis: "x",
        }),
        opacity: 1,
      }).add({
        scale: 1,
        borderRadius: 0,
        opacity: 0.2,
      }).add({
        opacity: 1,
        rotateZ: -90,
      })

    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Cat Vision</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className={styles.homeContainer}>
        <section className={styles.homeInfo} id="inicio">
          <div className={styles.homeTitles}>
            <h1 style={{ fontWeight: "300" }}>Cat Vision</h1>
            <h1>Sencillo, Moderno, Práctico</h1>
            <p style={{ marginTop: "32px" }}>
              Eficienta la interacción con tus clientes usando el poder de la IA
            </p>
          </div>
          <div className={styles.homeAnimation}>
            {animateElement.map((index) => {
              return <div className="animationElement" key={index}></div>;
            })}
          </div>
        </section>

        <section className={styles.productsContainer} id="productos">
          <div className={styles.homeMargin}>
            <h1>Descubre tu plan perfecto</h1>
            <div className={styles.productsCards}>
              <div className={styles.productCard}>
                <div className={styles.productHeader}>
                  <span className={styles.productLicense}>Basico</span>
                  <h2>$20,000 MXN</h2>
                  <span className={styles.productDuration}>/Mes</span>
                  <span><small style={{fontSize: 10}}>*Contrato Anual</small></span>
                  <br />
                  <input type="submit" value="Adquirir" />
                </div>
                <ul className={styles.productFeatures}>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">Tiendas Ilimitadas <small>(23,000 por tienda)</small></a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">15 Usuarios</a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">5 Cuentas de Admin</a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">20 productos</a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">Métricas</a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">Soporte Básico</a>
                  </li>
                </ul>
              </div>

              <div className={styles.productCard}>
                <div className={styles.productHeader}>
                  <span className={styles.productLicense}>Completo</span>
                  <h2>$23,000 MXN</h2>
                  <span className={styles.productDuration}>/Mes</span>
                  <span><small style={{fontSize: 10}}>*Contrato Anual</small></span>
                  <br />
                  <input type="submit" value="Adquirir" />
                </div>
                <ul className={styles.productFeatures}>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">Tiendas ilimitadas <small>(18,000 por tienda)</small></a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">600 Usuarios</a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">20 Cuentas de Admin</a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">50 productos</a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">Métricas</a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">Soporte Extendido</a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">Agregar Nuevas Tiendas</a>
                  </li>
                </ul>
              </div>

              <div className={styles.productCard}>
                <div className={styles.productHeader}>
                  <span className={styles.productLicense}>Pro</span>
                  <h2>$25,000 MXN</h2>
                  <span className={styles.productDuration}>/Mes</span>
                  <span><small style={{fontSize: 10}}>*Contrato Anual</small></span>
                  <br />
                  <input type="submit" value="Adquirir" />
                </div>
                <ul className={styles.productFeatures}>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">Tiendas ilimitadas <small>(15,000 por tienda)</small></a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">1800 Usuarios</a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">60 Cuentas de Admin</a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">150 productos</a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">Métricas</a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">Soporte ilimitado</a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">Agregar Nuevas Tiendas</a>
                  </li>
                  <li>
                    <AiFillCheckCircle />
                    <a href="#">Modificación de Productos</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.teamContainer} id="equipo">
          <div className={styles.teamCard}>
            <div
              style={{
                backgroundColor: "#000",
                width: "100%",
                height: "200px",
                borderRadius: "5px 5px 0 0",
              }}
            ></div>
            <div className={styles.teamInfo}>
              <p style={{ fontWeight: "400" }}>
                Diego Armando Ulibarri Hernández
              </p>
              <p>Front End Developer</p>
            </div>
          </div>
          <div className={styles.teamCard}>
            <div
              style={{
                backgroundColor: "#000",
                width: "100%",
                height: "200px",
                borderRadius: "5px 5px 0 0",
              }}
            ></div>
            <div className={styles.teamInfo}>
              <p style={{ fontWeight: "400" }}>
                María Fernanda Ramírez Barragán
              </p>
              <p>Front End Developer</p>
            </div>
          </div>
          <div className={styles.teamCard}>
            <div
              style={{
                backgroundColor: "#000",
                width: "100%",
                height: "200px",
                borderRadius: "5px 5px 0 0",
              }}
            ></div>
            <div className={styles.teamInfo}>
              <p style={{ fontWeight: "400" }}>David Rodríguez Fragoso</p>
              <p>Back End Developer</p>
            </div>
          </div>
          <div className={styles.teamCard}>
            <div
              style={{
                backgroundColor: "#000",
                width: "100%",
                height: "200px",
                borderRadius: "5px 5px 0 0",
              }}
            ></div>
            <div className={styles.teamInfo}>
              <p style={{ fontWeight: "400" }}>Erick Hernández Silva</p>
              <p>Back End Developer</p>
            </div>
          </div>
          <div className={styles.teamCard}>
            <div
              style={{
                backgroundColor: "#000",
                width: "100%",
                height: "200px",
                borderRadius: "5px 5px 0 0",
              }}
            ></div>
            <div className={styles.teamInfo}>
              <p style={{ fontWeight: "400" }}>Eduardo Rodríguez López</p>
              <p>Back End Developer</p>
            </div>
          </div>
          <div className={styles.teamCard}>
            <div
              style={{
                backgroundColor: "#000",
                width: "100%",
                height: "200px",
                borderRadius: "5px 5px 0 0",
              }}
            ></div>
            <div className={styles.teamInfo}>
              <p style={{ fontWeight: "400" }}>Israel Sánchez Miranda</p>
              <p>Project Manager</p>
            </div>
          </div>
          <div className={styles.teamCard}>
            <div
              style={{
                backgroundColor: "#000",
                width: "100%",
                height: "200px",
                borderRadius: "5px 5px 0 0",
              }}
            ></div>
            <div className={styles.teamInfo}>
              <p style={{ fontWeight: "400" }}>Liam Garay Monroy</p>
              <p>Machine Learning Engineer</p>
            </div>
          </div>
          <div className={styles.teamCard}>
            <div
              style={{
                backgroundColor: "#000",
                width: "100%",
                height: "200px",
                borderRadius: "5px 5px 0 0",
              }}
            ></div>
            <div className={styles.teamInfo}>
              <p style={{ fontWeight: "400" }}>Raúl Youthan Irigoyen Osorio</p>
              <p>Machine Learning Engineer</p>
            </div>
          </div>
          <div className={styles.teamCard}>
            <div
              style={{
                backgroundColor: "#000",
                width: "100%",
                height: "200px",
                borderRadius: "5px 5px 0 0",
              }}
            ></div>
            <div className={styles.teamInfo}>
              <p style={{ fontWeight: "400" }}>
                Octavio Andrick Sánchez Perusquia
              </p>
              <p>Hardware Developer</p>
            </div>
          </div>
          <div className={styles.teamCard}>
            <div
              style={{
                backgroundColor: "#000",
                width: "100%",
                height: "200px",
                borderRadius: "5px 5px 0 0",
              }}
            ></div>
            <div className={styles.teamInfo}>
              <p style={{ fontWeight: "400" }}>Renata de Luna Flores</p>
              <p>Prototype and User developer</p>
            </div>
          </div>
          <div className={styles.teamCard}>
            <div
              style={{
                backgroundColor: "#000",
                width: "100%",
                height: "200px",
                borderRadius: "5px 5px 0 0",
              }}
            ></div>
            <div className={styles.teamInfo}>
              <p style={{ fontWeight: "400" }}>Roberto Valdez Jasso</p>
              <p>Hardware Developer</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
