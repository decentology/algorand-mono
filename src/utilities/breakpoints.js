const breakpoints = {
  mobile: '@media (max-width: 926px)', // iPhone 13 Pro Max
  desktop: '@media (min-width: 1025px)', // Desktop
};

function doesMatchBreakpoint(breakpoint) {
  const mediaQueryList = window.matchMedia(
    breakpoint.replace('@media ', '')
  );

  return mediaQueryList.matches === true;
}

export {
  breakpoints,
  doesMatchBreakpoint
};