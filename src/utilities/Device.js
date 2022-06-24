import React from 'react';

function useDevice() {
  const device = React.useMemo(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    const isAndroid = /android/i.test(userAgent);
    const isAppleMobile = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isDesktop = !isAndroid && !isAppleMobile;

    return {
      isAndroid,
      isAppleMobile,
      isDesktop
    };
  }, []);
  

  return device;
}

export {useDevice};