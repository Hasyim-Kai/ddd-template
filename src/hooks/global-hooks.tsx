import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";

export default function useGlobalHooks() {
  const searchInitialValue = null
  const navigate = useNavigate();
  const [searchInputValue, setSearchInputValue] = useState<string | null>(searchInitialValue);
  const [searchParams, setSearchParams] = useSearchParams('');
  // setSearchParams(    createSearchParams({ search: `` })  );

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchInputValue(e.target.value)
  }

  // USE DEBOUNCE FOR SEARCH
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInputValue !== searchInitialValue) {
        setSearchParams(createSearchParams({ search: searchInputValue }));
      }
    }, 1600);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInputValue]);

  return {
    navigate,
    searchParams, setSearchParams,
    handleSearch,
  };
}
