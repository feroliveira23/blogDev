import React from "react";
import styles from "./Home.module.css";
import { userAuthentication } from "../../hooks/userAuthentication";

const Home = () => {
  const { user } = userAuthentication();

  return (
    <div className={styles.home}>
      {user ? (
        <div>
          <h2>Bem-vindo, {user.email}!</h2>
        </div>
      ) : (
        <div>
          <h2>Bem-vindo à nossa aplicação!</h2>
          <p>Por favor, faça o login para explorar todo o conteúdo.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
