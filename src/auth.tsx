import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import firebase from "firebase/app";
import "firebase/auth";

// Add your Firebase credentials
if (!firebase.apps.length)
  firebase.initializeApp({
    apiKey: "AIzaSyB_UscU9rpZrYs5TVhmW6eYkBav8D3UWHk",
    authDomain: "my-next-web-app.firebaseapp.com",
    projectId: "my-next-web-app",
    storageBucket: "my-next-web-app.appspot.com",
    messagingSenderId: "911767797854",
    appId: "1:911767797854:web:bbb332db41628adfbe34cf",
    measurementId: "G-W7DBQQ1TS7",
  });

interface context {
  user: firebase.User | null;
  signin: (email: string, password: string) => Promise<firebase.User | null>;
  signout: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  confirmPasswordReset: (code: string, password: string) => Promise<void>;
}

const initialContext: context = {
  user: null,
  signin: async () => null,
  signout: async () => {},
  sendPasswordResetEmail: async () => {},
  confirmPasswordReset: async () => {},
};

const auth = firebase.auth();
const authContext = createContext(initialContext);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(authContext);

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(auth.currentUser);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.

  const signin = async (email: string, password: string) => {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    setUser(user);
    return user;
  };

  const signup = async (email: string, password: string) => {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    setUser(user);
    return user;
  };

  const signout = async () => {
    await auth.signOut();
    return setUser(null);
  };

  const sendPasswordResetEmail = (email: string) => {
    return auth.sendPasswordResetEmail(email);
    //   .then(() => true);
  };

  const confirmPasswordReset = (code: string, password: string) => {
    return auth.confirmPasswordReset(code, password);
    //   .then(() => true);
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
