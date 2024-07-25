import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { useLoading } from "@context/LoadingContext";
import { useToast } from "@context/ToastContext";

const useApiRequest = <T, U, V = undefined>(
  requestFunc: T,
  options: V | undefined,
  initialExecution: boolean,
  onSuccess?: () => void,
  onError?: () => void,
) => {
  const { showToast, setToastMessage } = useToast();
  const { setIsLoading } = useLoading();
  const [data, setData] = useState<U | null>(null);
  const [trigger, setTrigger] = useState(initialExecution ? 1 : 0);

  const toggleTrigger = () => {
    setTrigger(Date.now());
  };

  useEffect(() => {
    if (trigger) {
      const request = async () => {
        try {
          setIsLoading(true);
          let data = null;
          if (typeof requestFunc === "function") {
            data = await requestFunc(options);
          }
          setData(data);
        } catch (error) {
          if (isAxiosError(error) && error.response?.data.message !== "jwt expired") {
            setToastMessage(error.response?.data.message);
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

  useEffect(() => {
    if (trigger && data && onSuccess) {
      onSuccess();
    }
  }, [data]);

  return { data, toggleTrigger };
};

export default useApiRequest;
