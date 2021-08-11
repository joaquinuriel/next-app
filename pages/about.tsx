import { FC, ReactNode, useEffect, useRef, createRef, RefObject } from "react";
import Layout from "../components/layout";
import styles from "../styles/about.module.sass";

const animator = createRef<HTMLDivElement>();
function Animator({ children }: { children: ReactNode }) {
  useEffect(() => {
    const keyframes: Keyframe[] = [
      // { transform: "translateY(100px)", opacity: 0 },
      { transform: "translateY(0px)", opacity: 1 },
      ];
      const callback: IntersectionObserverCallback = (entries) => {
        entries.forEach(({ isIntersecting, target }, index) => {
          setTimeout(() => {
            isIntersecting &&
            (target.classList.add("no-offset"), observer.unobserve(target));
          }, 250 * index);
        });
      };
      // const callback: IntersectionObserverCallback = (entries) => {
      //   entries.forEach(({ isIntersecting, target }, index) => {
        //     setTimeout(() => {
      //       isIntersecting &&
      //         target.animate(keyframes, {
        //           duration: 500,
      //           easing: "ease-out",
      //           fill: "forwards",
      //         }) &&
      //         observer.unobserve(target);
      //     }, 250 * index);
      //   });
      // };
      const options: IntersectionObserverInit = { rootMargin: "120px" };
      const observer = new IntersectionObserver(callback, options);
      const node = animator.current;
      node &&
      node.childNodes &&
      node.childNodes.forEach((el) => {
        observer.observe(el as Element);
      });
    });
    return (
      <div className={styles.animator} ref={animator}>
        {children}
      </div>
    );
  }
  
  export default function About() {
  return (
    <Layout>
      <Animator>
        <h1>About</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
          asperiores officia inventore. Adipisci officia quaerat dolor incidunt
          possimus atque sint beatae illo eum aliquid vero tempore mollitia
          quidem, eligendi facilis?
        </p>
        <div className={styles.quote}>
          <span>&ldquo;</span>
          <p>Design is intelligence made visible.</p>
          <span>&rdquo;</span>
        </div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
          asperiores officia inventore. Adipisci officia quaerat dolor incidunt
          possimus atque sint beatae illo eum aliquid vero tempore mollitia
          quidem, eligendi facilis?
        </p>
      </Animator>
    </Layout>
  );
}
