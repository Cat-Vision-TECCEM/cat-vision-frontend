import styles from "../styles/PageNavigation.module.css";
import Link from "next/link";

function PageNavigation(){
  return(
    <div className={styles.pageNavigate}>
      <div className={styles.pageMainLinks}>
        <Link href="/"><a className="navigationLink">Inicio</a></Link>
        <Link href="/"><a className="navigationLink">Tiendas</a></Link>
        <Link href="/"><a className="navigationLink">Pedidos</a></Link>
        <Link href="/"><a className="navigationLink">Configuracion</a></Link>
      </div>
      <div className={styles.pageMainLinks}>
        <Link href="/"><a className="navigationLink">Agregar Nueva Tienda</a></Link>
        <Link href="/"><a className="navigationLink">Agregar Nuevo Producto</a></Link>
      </div>
    </div>
  )
}

export default PageNavigation