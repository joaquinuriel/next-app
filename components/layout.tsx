import Link from "next/link";
import styles from "../styles/layout.module.sass";

export default function Layout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.header_title}>Joaquinuriel.dev</a>
        </Link>
        <Link href="/profile">Profile</Link>
      </header>
      <main className={styles.main}>{children}</main>
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
