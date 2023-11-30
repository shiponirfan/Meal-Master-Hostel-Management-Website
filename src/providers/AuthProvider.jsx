import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import useAxiosPublic from "./../hooks/useAxiosPublic";
import { HelmetProvider } from "react-helmet-async";
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();
  const [homeSearchInput, setHomeSearchInput] = useState('');

  const userSignUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userLogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(true);
      // JWT Token
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      if (userEmail) {
        axiosPublic.post("/auth/access-token", loggedUser).then(() => {
          setLoading(false);
        });
      } 
      else {
        axiosPublic.post("/auth/access-cancel", loggedUser).then(() => {
          userLogOut();
          setLoading(false);
        });
      }
    });
    return () => {
      unSubscribe();
    };
  }, [axiosPublic, user?.email]);

  const authInfo = {
    user,
    loading,
    userSignUp,
    userLogin,
    userLogOut,
    googleLogin,
    updateUserProfile,
    setHomeSearchInput,
    homeSearchInput,
  };
  return (
    <HelmetProvider>
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </HelmetProvider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
