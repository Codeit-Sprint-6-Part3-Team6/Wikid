import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { useErrorToast } from "@context/ErrorToastContext";
import { useLoading } from "@context/LoadingContext";

type RequestFuncType<T, U> = (options: U) => Promise<T>;

const useApiRequest = <T, U>(
  requestFunc: RequestFuncType<T, U>,
  options: U | undefined,
  initialExecution: boolean,
  onSuccess?: () => void,
  onError?: () => void,
) => {
  const { showToast, setErrorMessage } = useErrorToast();
  const { setIsLoading } = useLoading();
  const [data, setData] = useState<T | null>(null);
  const [trigger, setTrigger] = useState(initialExecution ? 1 : 0);

  const toggleTrigger = () => {
    setTrigger(Date.now());
  };

  useEffect(() => {
    if (trigger && options) {
      const request = async () => {
        try {
          setIsLoading(true);
          const data = await requestFunc(options);
          setData(data);
          if (onSuccess) onSuccess();
        } catch (error) {
          if (isAxiosError(error) && error.message !== "jwt expired") {
            setErrorMessage(error.message);
            showToast();
            if (onError) onError();
          }
        } finally {
          setIsLoading(false);
        }
      };
      request();
    }
  }, [trigger, options]);

  return { data, toggleTrigger };
};

export default useApiRequest;
