import { createContext, useEffect, useState } from "react";
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
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const { axiosPublic } = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const googleProvider = new GoogleAuthProvider();

  const googleSingIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth);
      const user = result.user;
      console.log(user);
      // You can handle the user data or navigate to the desired page here
    } catch (error) {
      console.error(error);
      // Handle errors if necessary
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log("current user", currentUser);

      if (currentUser) {
        //NOTE - get token and store client side
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("accessToken", res.data.token);
          }
        });
      } else {
        // TODO removed token ( if token stored in the client side : Local storage , caching , in memory )
        localStorage.removeItem("accessToken");
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    signInWithGoogle,
    googleSingIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
