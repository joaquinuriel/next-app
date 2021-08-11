import { ReactNode } from "react";
import Link from "next/link";
import styles from "styles/layout.module.sass";
// import Modal from "components/modal"
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.header_title}>Joaquinuriel.dev</a>
        </Link>
        <Link href="/profile">Profile</Link>
      </header>
      <main className={styles.main}>{children}</main>
      {/* <Modal /> */}
      <footer className={styles.footer}>
        <Link href="/about">
          <a className={styles.footer_title}>
            Made with<span>&nbsp; &#60;3 &nbsp;</span>by Joaquin Uriel
          </a>
        </Link>
      </footer>
    </>
  );
}
