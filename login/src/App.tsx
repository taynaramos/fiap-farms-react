import { useState } from "react";
import CreateAccount from "./presentation/pages/CreateAccount";
import Login from "./presentation/pages/Login";

export default () => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);

  return (
    <div>
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
