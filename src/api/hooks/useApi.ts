import { useState, useEffect } from 'react';

export const useApi = <T>(): { data: T | null, isLoading: boolean, error: Error | null } => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // transform csv data
      } catch (error: any) {
        setError(error);
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return { data, isLoading, error };
}