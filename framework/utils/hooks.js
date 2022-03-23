import {useCallback, useMemo, useEffect, useLayoutEffect, useRef, useState} from "react";

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

const isValidThreshold = (threshold) => {
  if (!threshold || threshold < 1 && threshold > 0) {
    return true;
  }
  return false;
};

/**
 * Creates an instance of an IntersectionObserver
 * to be used between renders
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */
const defaultConfig = {
  triggerOnce: false
};
export const useIntersectionObserver = (cb, config = defaultConfig) => {
  const {triggerOnce = false, ...opts} = config;
  const validatedThreshold = useMemo(() => {
    const isValid = isValidThreshold(opts.threshold);
    if (!isValid) {
      console.warn('Invalid threshold used for intersection observer. Please ues "null" or a number between 0 and 1. Using default threshold value "null" instead.');
      return null;
    }
    return opts.threshold;
  }, [opts?.threshold]);
  const observerConfig = useMemo(() => {
    return {
      ...opts,
      threshold: validatedThreshold
    };
  }, [opts, validatedThreshold]);
  const intersectionCount = useRef(0);
  const targetRef = useRef();
  const observerRef = useRef();

  const isTargetBeingObserved = targetRef.current && observerRef.current;

  const handleChange = ([entry]) => {
    if (triggerOnce && intersectionCount.current === 1) {
      return;
    }
    if (entry.isIntersecting) {
      intersectionCount.current += 1;
    }
    if (typeof cb === "function") {
      cb({inView: entry.isIntersecting, entry, });
    }
  };

  const resetObserver = () => {
    if (isTargetBeingObserved) {
      observerRef.current.unobserve(targetRef.current);
      observerRef.current.disconnect();
    }
    observerRef.current = new IntersectionObserver(handleChange, observerConfig);
  };

  const observeNode = (node) => {
    if (targetRef.current !== node) {
      intersectionCount.current = 0;
    }
    targetRef.current = node;
    observerRef.current = new IntersectionObserver(handleChange, observerConfig);
    observerRef.current.observe(node);
  };

  const unobserveNode = (node) => {
    if (!isTargetBeingObserved) {
      return;
    }

    // Disconnect observer since we will just be creating a new
    // one each mount
    observerRef.current.unobserve(node);
    observerRef.current.disconnect();
  };

  const callbackRef = (node) => {
    resetObserver(observerRef.current);
    node ? observeNode(node) : unobserveNode(targetRef.current);
  };

  return callbackRef;
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
  const {mediaQuery, onChange} = config;
  const mediaQueryList = useRef();
  const [matches, setMatches] = useState(
    typeof window !== "undefined" && window?.matchMedia(mediaQuery)?.matches
  );

  const validateQuery = useCallback(
    (e) => {
      if (typeof onChange === "function") {
        onChange(e);
      }
      setMatches(e?.target?.matches);
    },
    [onChange, setMatches]
  );

  useEffect(() => {
    mediaQueryList.current = window.matchMedia(mediaQuery);
    setMatches(mediaQueryList.current.matches);
    mediaQueryList.current.onchange = validateQuery;

    return () => (mediaQueryList.current.onchange = null);
  }, [mediaQuery, validateQuery]);

  return {
    matches,
    mediaQueryList: mediaQueryList.current
  };
};
