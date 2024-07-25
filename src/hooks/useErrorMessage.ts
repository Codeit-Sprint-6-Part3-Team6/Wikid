import { useState } from "react";

function useErrorMessage() {
  const [errorMessage, setErrorMessage] = useState("");

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  return { errorMessage, setErrorMessage, clearErrorMessage };
}

export default useErrorMessage;
