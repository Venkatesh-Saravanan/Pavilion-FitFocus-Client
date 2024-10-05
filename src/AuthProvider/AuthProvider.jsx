import {
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import { createContext, useEffect, useState } from "react";
   
  

  import PropTypes from 'prop-types';
import auth from "../Firebase/Firebase.config";
import useAxiosSecure from "../Hook/useAxiosSecure";
  
  export const AuthContext = createContext(null);
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(true);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    //PROVIDER
    const googleProvider = new GoogleAuthProvider();
    const GithubProvider = new GithubAuthProvider();
  

    const [theme, setTheme] = useState("light");
    const handleTheme = (e) => {
      const check = e.target.checked;
      check ? setTheme("dark") : setTheme("light");
      console.log(theme);
    };
  
    useEffect(() => {
      localStorage.setItem('theme', theme);
      const localTheme = localStorage.getItem('theme');
      document.querySelector('html').setAttribute('data-theme', localTheme)
  
    }, [theme])
  
    //createUserWithEmailAndPassword
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
  
    //updateProfile
    const updateUserProfile = (name, image) => {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: image,
      });
    };
  
  
    //signInWithEmailAndPassword
    const signinUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };
  
  
    //googleLogin
    const googleLogin = () => { 
      setLoading(true)
      return signInWithPopup(auth, googleProvider);
    };
  
  
    //githubLogin
    const githubLogin = () => {
      setLoading(true)
      return signInWithPopup(auth, GithubProvider);
    };
  
  //logOut
    const logOut = () => {
      setLoading(false);
      return signOut(auth);
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
        if (user) {
          // get token and store client
          const userInfo = { email: user.email };
          axiosSecure.post('/jwt', userInfo)
              .then(res => {
                  if (res.data.token) {
                      localStorage.setItem('access-token', res.data.token);
                      setLoading(false);
                  }
              })
      }
      else {
        
        localStorage.removeItem('access-token');
        setLoading(false);
    }
      });
      return () => {
        unsubscribe();
      };
    }, [axiosSecure]);
  
    const values = {
      loading,
      setUser,
      user,
      setLoading,
      createUser,
      signinUser,
      googleLogin,
      githubLogin,
      logOut,
      updateUserProfile,
      handleTheme,
      theme
    };
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
  };
  
  
  AuthProvider.propTypes = {
    children: PropTypes.children
  };
  export default AuthProvider;