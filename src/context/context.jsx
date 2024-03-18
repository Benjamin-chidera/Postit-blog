import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({children}) => {

  const [showSignUp, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  // const [userInfo, setUserInfo] = useState([])

  // console.log(userInfo.length);

  return (
    <AppContext.Provider
      value={{
        showLogin,
        showSignUp,
        setShowLogin,
        setShowSignUp,
        userEmail,
        setUserEmail,
        // setUserInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
