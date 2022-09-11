import React, { createContext, useContext } from "react";
import usePersistedState from "../utils/persistedState";

interface IProps {
  children: React.ReactNode;
}

interface IUserNameContext {
  handleDataUsername: string;
  setHandleDataUsername: (dataUsername: string) => void;
}

const UserNameContext = createContext({} as IUserNameContext);

function UserNameProvider({ children }: IProps) {
  const [handleDataUsername, setHandleDataUsername] = usePersistedState(
    "@Context/DataUsername",
    ""
  );

  return (
    <UserNameContext.Provider
      value={{
        handleDataUsername,
        setHandleDataUsername,
      }}
    >
      {children}
    </UserNameContext.Provider>
  );
}

function useUsernameContext() {
  const context = useContext(UserNameContext);

  return context;
}

export { useUsernameContext, UserNameProvider };
