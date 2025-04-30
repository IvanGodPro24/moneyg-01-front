import { useMediaQuery } from "react-responsive";

const useDevice = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1280 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  return { isMobile, isTablet, isDesktop };
};

export default useDevice;
