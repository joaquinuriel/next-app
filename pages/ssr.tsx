import Layout from "../components/layout";
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";

interface Props {
  //   firebase: typeof firebase;
}

export default function Ssr(props: Props) {
  console.log(props);
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
  const [user, setUser] = useState(auth.currentUser);
  auth.onAuthStateChanged(setUser);
  console.log(user);

  return (
    <Layout>
      <h1>Server side rendering</h1>
    </Layout>
  );
}

// export async function getServerSideProps() {
//   if (!firebase.apps.length) {
//     firebase.initializeApp({
//       apiKey: "AIzaSyB_UscU9rpZrYs5TVhmW6eYkBav8D3UWHk",
//       authDomain: "my-next-web-app.firebaseapp.com",
//       projectId: "my-next-web-app",
//       storageBucket: "my-next-web-app.appspot.com",
//       messagingSenderId: "911767797854",
//       appId: "1:911767797854:web:bbb332db41628adfbe34cf",
//       measurementId: "G-W7DBQQ1TS7",
//     });
//   }
//   const auth = firebase.auth();
//   const user = auth.currentUser;
//   return { props: { user } };
// }
