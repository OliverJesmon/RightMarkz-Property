import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


function ScrollToTop() {
    const loc = useLocation();
  useEffect(() => {
    window.scrollTo(0,0);
  },[loc]);
  return null;
}

export default ScrollToTop;