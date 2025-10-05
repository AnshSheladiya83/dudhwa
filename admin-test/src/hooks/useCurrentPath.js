import { useLocation } from "react-router-dom";

    const useCurrentPath = () => {
      const location = useLocation();
      const pathname = location.pathname;
      const pathSegments = pathname.split("/").filter((x) => x);
    
      return { pathname, pathSegments };
    };
    
    export default useCurrentPath;
    