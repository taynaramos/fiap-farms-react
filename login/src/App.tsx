import { useState } from "react";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";

export default () => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  console.log(import.meta.env.VITE_FIREBASE_APP_ID);

  return (
    <div
      style={{
        background: "#1f2124",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)",
        borderRadius: "5px",
        margin: "20px 20px 20px 20px",
        width: "250px",
        padding: "20px",
        textAlign: "center",
        color: "white",
        float: "left",
      }}
    >
      {!isCreateAccount && (
        <>
          <Login />
          <button onClick={() => setIsCreateAccount(!isCreateAccount)}>
            Criar nova conta
          </button>
        </>
      )}
      {isCreateAccount && <CreateAccount />}
    </div>
  );
};
