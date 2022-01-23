type StorageType = "session" | "local";
type UseStorageReturnValue = {
  getItemFromStorage: (key: string, type?: StorageType) => string;
  setItemToStorage: (key: string, value: string, type?: StorageType) => boolean;
  removeItemFromStorage: (key: string, type?: StorageType) => void;
};

const useStorage = (): UseStorageReturnValue => {
  const storageType = (type?: StorageType): "localStorage" | "sessionStorage" =>
    `${type ?? "session"}Storage`;

  const isBrowser: boolean = ((): boolean => typeof window !== "undefined")();

  const getItemFromStorage = (key: string, type?: StorageType): string => {
    return isBrowser ? window[storageType(type)][key] : "";
  };

  const setItemToStorage = (
    key: string,
    value: string,
    type?: StorageType
  ): boolean => {
    if (isBrowser) {
      window[storageType(type)].setItem(key, value);
      return true;
    }

    return false;
  };

  const removeItemFromStorage = (key: string, type?: StorageType): void => {
    window[storageType(type)].removeItem(key);
  };

  return {
    getItemFromStorage,
    setItemToStorage,
    removeItemFromStorage,
  };
};

export default useStorage;
