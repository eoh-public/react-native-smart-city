import { useCallback, useState, useRef } from 'react';

const usePopover = () => {
  const [showingPopover, setShowingPopover] = useState(false);
  const [hidingPopoverComplete, setHidingPopoverComplete] = useState(true);
  const childRef = useRef(null);

  const showPopoverWithRef = useCallback(
    (ref) => {
      childRef.current = ref.current;
      setShowingPopover(true);
      setHidingPopoverComplete(false);
    },
    [childRef]
  );
  
  const hidePopover = useCallback(() => {
    childRef.current = null;
    setShowingPopover(false);
  }, [childRef]);
  
  const hidePopoverComplete = useCallback(() => {
    setHidingPopoverComplete(true);
  }, []);

  return { childRef, showingPopover, showPopoverWithRef, hidePopover, hidingPopoverComplete, hidePopoverComplete };
};

export default usePopover;
