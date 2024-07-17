import { useLocalStorage } from './useLocalStorage';

const parser = (rawValue: string) => rawValue === 'true';

export const useFirstClick = (key: string) => {
  const [wasClickedBefore, setWasClickedBefore] = useLocalStorage<boolean>(false, key, parser);

  const handleClick = () => {
    if (!wasClickedBefore) {
      setWasClickedBefore(true);
    }
  };

  return { wasClickedBefore, handleClick };
};
