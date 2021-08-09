import Image from "next/image";
import { createRef, FormEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Layout from "../components/layout";
import styles from "../styles/chat.module.sass";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyB_UscU9rpZrYs5TVhmW6eYkBav8D3UWHk",
    authDomain: "my-next-web-app.firebaseapp.com",
    projectId: "my-next-web-app",
    storageBucket: "my-next-web-app.appspot.com",
    messagingSenderId: "911767797854",
    appId: "1:911767797854:web:bbb332db41628adfbe34cf",
    measurementId: "G-W7DBQQ1TS7",
  });
}

const auth = firebase.auth();
const store = firebase.firestore();

const collection = store.collection("messages");
const query = collection.orderBy("date").limit(25);

export default function Chat() {
  const [user, loading, error] = useAuthState(auth);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [text, setText] = useState("");
  const span = createRef<HTMLSpanElement>();
  const send = (e: FormEvent) => {
    e.preventDefault();
    const { uid, photoURL } = user!;
    const date = new Date();
    setText("");
    text && store.collection("messages").add({ text, date, uid, photoURL });
    span.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (user) {
    return (
      <Layout>
        <h1>Hello {user.displayName}</h1>
        <div className={styles.chatbox}>
          {messages?.map((msg) => (
            <div
              key={msg.id}
              className={msg.uid === user.uid ? styles.sent : styles.received}
            >
              <p>{msg.text}</p>
              {/* <img src={msg.photoURL} alt="" /> */}
              <Image src={msg.photoURL} width="36px" height="36px"></Image>
            </div>
          ))}
          <span ref={span}></span>
        </div>
        <form onSubmit={send}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">&rarr;</button>
        </form>
      </Layout>
    );
  }

  return loading ? (
    <Layout>
      <p>Loading...</p>
    </Layout>
  ) : error ? (
    <Layout>
      <p>Loading...</p>
    </Layout>
  ) : (
    <Layout>
      <p>You are not signed in</p>
      <button>Sign in</button>
    </Layout>
  );
}
