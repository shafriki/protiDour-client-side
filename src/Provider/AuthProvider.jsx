import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";

const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // google sign-in
  const googlePopup = () => {
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  // create user with email and password
  const createUser = (email, password, displayName, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
        updateProfile(currentUser, {
          displayName,
          photoURL,
        });
        setUser({ ...currentUser, displayName, photoURL });
        return currentUser;
      })
      .catch((error) => {
        // console.error("Registration Error:", error.message);
        throw error;
      })
      .finally(() => setLoading(false));
  };

  // login user with email and password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        return userCredential.user;
      })
      .catch((error) => {
        // console.error("Login Error:", error.message);
        throw error;
      })
      .finally(() => setLoading(false));
  };

  // log out the user
  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setUser(null);
        document.cookie = "token=; max-age=0"; // Clear JWT token cookie
      })
      .catch((error) => {
        // console.error("Sign-Out Error:", error.message);
      })
      .finally(() => setLoading(false));
  };

  // authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
        axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true })
          .then((res) => {
            // console.log(res.data);
          });
      }
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    loading,
    createUser,
    googlePopup,
    signIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
