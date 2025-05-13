import { createContext, useState } from "react";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [isHeaderFooterShown, setisHeaderFooterShown] = useState(true);

  return (
    <MyContext.Provider value={{ isHeaderFooterShown, setisHeaderFooterShown }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
