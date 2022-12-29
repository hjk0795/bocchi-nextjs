import styles from "../styles/layout.module.css"
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return <div className={styles.container}>{children}</div>;
}

export default Layout;