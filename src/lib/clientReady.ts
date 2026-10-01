import { createContext, useContext } from "react";

/**
 * False for the page the visitor landed on, which has to render exactly like
 * its prerendered HTML (dark, English) until hydration is over. True for pages
 * opened afterwards by in-app navigation, which can start from the visitor's
 * saved preferences straight away.
 */
export const ClientReadyContext = createContext(false);

export const useClientReady = () => useContext(ClientReadyContext);
