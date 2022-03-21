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

/**
 * Keeps count within a component without
 * causing re-renders. Helpful for internal
 * logic that does not require an update to
 * state.
 */
export const useCount = (initialCount = 0) => {
  const count = useRef(initialCount);
  return {
    getCount: () => count.current,
    setCount: (num) => (count.current = num),
    increment: () => (count.current += 1),
    decrement: () => (count.current -= 1),
    resetCount: () => (count.current = 0)
  };
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
  }, [opts]);
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

/**
 * An implementation of the useIntersectionObserver
 * that is pre-configured for infinite scrolling in
 * a list.
 */
export const useInfiniteScroll = (config) => {
  const {onScroll, ...observerConfig} = config;
  const scrollTriggerRef = useIntersectionObserver(({inView,entry}) => {
    if (!inView) {
      return;
    }
    onScroll(entry);
  }, {
    triggerOnce: true,
    ...observerConfig,
  });

  return scrollTriggerRef;
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

/**
 * Tracks the presence of a DOM node
 * given configuration options supplied
 * to an Intersection Observer
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#parameters
 */
export const useOnScreen = (config) => {
  const {cache, onEnter, onExit, ...observerConfig} = config;
  const o = useRef();
  const intersectionCount = useCount();
  const [isOnScreen, setIsOnScreen] = useState(
    intersectionCount.getCount() > 0
  );

  const handleIntersection = (entry) => {
    intersectionCount.increment();
    setIsOnScreen(true);
    if (typeof onEnter === "function") {
      onEnter(entry);
    }
  };

  const handleTargetExit = (entry) => {
    setIsOnScreen(false);
    if (typeof onExit === "function") {
      onExit(entry);
    }
  };

  const observer = useIntersectionObserver(
    ([entry]) => {
      const {isIntersecting, target} = entry;
      const hasIntersectedOnce = intersectionCount.getCount() > 0;
      if (cache && hasIntersectedOnce) {
        observer.unobserve(target);
        return;
      }

      isIntersecting ? handleIntersection(entry) : handleTargetExit(entry);
    },
    {...observerConfig}
  );

  const callbackRef = (incomingRef) => {
    if (!incomingRef) {
      observer.unobserve(o.current);
      return;
    }

    o.current = incomingRef;
    observer.observe(incomingRef);
  };

  const targetProps = {
    ref: callbackRef
  };

  const target = {
    onScreenCount: intersectionCount.getCount(),
    isOnScreen,
    getTargetProps: () => targetProps
  };

  return target;
};
