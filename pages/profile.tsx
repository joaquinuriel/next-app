import { ChangeEvent, ChangeEventHandler, EventHandler, useState } from "react";
// import { GetServerSideProps } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

export default function Profile() {
  const app =
    firebase.apps[0] ||
    firebase.initializeApp({
      apiKey: "AIzaSyB_UscU9rpZrYs5TVhmW6eYkBav8D3UWHk",
      authDomain: "my-next-web-app.firebaseapp.com",
      projectId: "my-next-web-app",
      storageBucket: "my-next-web-app.appspot.com",
      messagingSenderId: "911767797854",
      appId: "1:911767797854:web:bbb332db41628adfbe34cf",
      measurementId: "G-W7DBQQ1TS7",
    });

  const auth = app.auth();
  const ref = firebase.storage().ref("images");
  const [user, loading, error] = useAuthState(auth);
  console.log(user, loading, error);

  const signInWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const [progress, setProgress] = useState(0);
  const upload = ({ target }: ChangeEvent<HTMLInputElement>) => {
    target.files
      ? [...target.files].forEach((file) => {
          let task = ref.child(file.name).put(file);
          task.on("state_changed", (snap) => {
            setProgress(snap.bytesTransferred / snap.totalBytes);
          });
          task.then(console.log, console.log);
        })
      : alert("no files");
  };

  const List = () => {
    const [content, setContent] = useState<JSX.Element | null>(null);
    const promise = ref.list();
    promise.then(({ items }) => {
      setContent(
        <ol>
          {items.map((item) => (
            <li key={item.name}>{item.name} </li>
          ))}
        </ol>
      );
    });
    return content || <p>Loading the list</p>;
  };

  if (user)
    return (
      <div
        style={{
          margin: "120px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Hello {user.displayName} </h1>
        <input type="file" onChange={upload} />
        <progress value={progress}></progress>
        <List />
      </div>
    );

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>There was en error</h1>;

  return (
    <div>
      <h1>You are not signed in</h1>
      <button onClick={signInWithGoogle}>Sign in</button>
    </div>
  );
}
