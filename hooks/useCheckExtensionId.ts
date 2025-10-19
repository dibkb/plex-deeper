import { useState, useEffect } from "react";

export const useCheckExtensionId = (): boolean => {
  const [hasExtensionId, setHasExtensionId] = useState<boolean>(false);

  useEffect(() => {
    const checkExtensionId = () => {
      try {
        const extensionId = localStorage.getItem("QUERY_X_EXTENION_ID");
        const isValid = extensionId !== null && extensionId.trim() !== "";
        setHasExtensionId(isValid);
      } catch (error) {
        console.error("Error checking extension ID in localStorage:", error);
        setHasExtensionId(false);
      }
    };
    checkExtensionId();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "QUERY_X_EXTENION_ID") {
        checkExtensionId();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return hasExtensionId;
};
