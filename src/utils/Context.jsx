/* eslint-disable react/prop-types */
import  { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const initialState = localStorage.getItem("appState") || "campaign";
  const [state, setState] = useState(initialState);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const metricsFromLocalStorage = localStorage.getItem("metrics");
const [metricNames, setMetricNames] = useState(() => {
  if (metricsFromLocalStorage) {
    return metricsFromLocalStorage.split(",").map((name) => name.trim());
  }
  return [];
});  useEffect(() => {
    localStorage.setItem("metrics", metricNames);
  }, [metricNames]);
  useEffect(() => {
    localStorage.setItem("appState", state);
  }, [state]);

  return (
    <AppContext.Provider
      value={{
        metricNames,
        setMetricNames,
        state,
        setState,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppProvider");
  }
  return context;
}
