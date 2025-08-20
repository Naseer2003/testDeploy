import React, { createContext } from "react";
import type { ReactNode } from "react";

interface UserContextProps {
  serverUrl: string;
}

export const UserDataContext = createContext<UserContextProps | undefined>(
  undefined
);

interface ProviderProps {
  children: ReactNode;
}

const UserContext: React.FC<ProviderProps> = ({ children }) => {
  const serverUrl = "http://localhost:5000";

  const value: UserContextProps = {
    serverUrl,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;