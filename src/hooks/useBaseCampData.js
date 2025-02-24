import { useState, useCallback } from "react";
import { loadData, saveData } from "../utils/storage";

/**
 * Custom hook that manages BaseCamp data state with localStorage persistence.
 * Returns [data, setData] — setData automatically persists to storage.
 */
export default function useBaseCampData() {
  const [data, setDataState] = useState(() => loadData());

  const setData = useCallback((newData) => {
    setDataState(newData);
    saveData(newData);
  }, []);

  return [data, setData];
}
