import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";

export const useCombinedRefs = (...refs) => {
  const targetRef = useRef();

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Uses the `matchMedia` API to dynamically determine if the document currently
 * matches a particular media query.
 * @param {string} mediaQuery - CSS media query to be tested the document
 * @returns {boolean} indicates if the media
 * query matches the document
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
 */
 export const useMediaQuery = (config) => {
   const { mediaQuery, onChange } = config;
  const mediaQueryList = useRef();
  const [matches, setMatches] = useState(typeof window !== "undefined" && window?.matchMedia(mediaQuery)?.matches);

  const validateQuery = useCallback((e) => {
      if (typeof onChange === 'function') {
          onChange(e);
      }
      setMatches(e?.target?.matches);
  }, [
      onChange,
      setMatches
  ]);

  useEffect(() => {
      mediaQueryList.current = window.matchMedia(mediaQuery);
      setMatches(mediaQueryList.current.matches);
      mediaQueryList.current.onchange = validateQuery;

      return () => mediaQueryList.current.onchange = null;
  }, [mediaQuery, validateQuery]);

  return {
    matches,
    mediaQueryList: mediaQueryList.current,
  };
};