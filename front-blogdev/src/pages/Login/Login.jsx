import React, { useState, useEffect } from "react";
import { userAuthentication } from "../../hooks/userAuthentication";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const LogoutMessage = ({ onLogout }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onLogout();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [onLogout]);

  return (
    <div className={styles.logoutMessage}>
      <p>Você foi desconectado com sucesso.</p>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const {
    loginUser,
    error: authError,
    loading,
    user,
    logoutUser,
  } = userAuthentication();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const userCredentials = {
      email,
      password,
    };

    const loginSuccess = await loginUser(userCredentials);

    if (loginSuccess) {
      console.log("Login realizado com sucesso.");
      setShowLogoutMessage(false);

      navigate("/");
    } else {
      setError("Email ou senha inválido.");
    }
  };

  const handleLogout = () => {
    setShowLogoutMessage(true);

    setTimeout(() => {
      logoutUser();
      navigate("/");
    }, 3000);
  };

  return (
    <div className={styles.login}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <label>
          <span>Email: </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
        </label>
        <label>
          <span>Senha: </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </label>
        {!loading && <button className="btn">Login</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
      {user && (
        <div className={styles.login}>
          <p>Você está logado como: {user.email}</p>
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      {showLogoutMessage && (
        <LogoutMessage onLogout={() => setShowLogoutMessage(false)} />
      )}
    </div>
  );
};

export default Login;
