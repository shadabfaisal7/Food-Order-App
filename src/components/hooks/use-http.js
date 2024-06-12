import { useCallback, useEffect, useState } from "react";

async function sendHttpRequestOnDemand(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json(); //Even if this has errors - you'll get error mesaage data - check BE

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }
  return resData;
}
const useHttp = (url, config, initialData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(initialData);

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async (body) => {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequestOnDemand(url, { ...config, body });
        setData(resData);
      } catch (error) {
        console.log(error);
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    isLoading,
    error,
    data,
    sendRequest,
    clearData,
  };
};

export default useHttp;
