import { db } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";

export const userAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const auth = getAuth();

  async function createUser(data) {
    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);
      setUser(user);

      return user;
    } catch (error) {
      console.error(error.message);
      setLoading(false);
      setError("Ocorreu um erro ao criar o usuário.");
    }
  }

  async function loginUser(credentials) {
    setLoading(true);
    setError(null);

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      setLoading(false);
      setUser(user);

      return user;
    } catch (error) {
      console.error(error.message);
      setLoading(false);
      setError("E-mail ou senha incorretos.");
    }
  }

  async function logoutUser() {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return {
    auth,
    user,
    createUser,
    loginUser,
    logoutUser,
    error,
    loading,
  };
};
