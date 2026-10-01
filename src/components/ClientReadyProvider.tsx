import { useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ClientReadyContext } from "@/lib/clientReady";

/** Marks every page after the landing page as free to use saved preferences. */
const ClientReadyProvider = ({ children }: { children: ReactNode }) => {
  const { key } = useLocation();
  const [landingKey] = useState(key);
  const [navigated, setNavigated] = useState(false);
  // Sticky, so returning to the landing page with Back still counts as in-app.
  if (key !== landingKey && !navigated) setNavigated(true);

  return (
    <ClientReadyContext.Provider value={navigated || key !== landingKey}>
      {children}
    </ClientReadyContext.Provider>
  );
};

export default ClientReadyProvider;
