import React, { useRef, useEffect } from "react";

import Styles from "./PopUp.module.css";

function PopUp({ ContentComp, isOpen, closeFun, isClosable = true }) {
  const primaryWrapperRef = useRef(123);
  const timeOutRef = useRef(1234);

  function handleKeyDowns(e) {
    if (isOpen) {
      if (e.key == "Escape") {
        if (isClosable && closeFun) {
          closeFun();
        }
      }
    }
  }

  useEffect(() => {
    if (primaryWrapperRef.current.style) {

      if (isOpen) {
        primaryWrapperRef.current.style.display = "flex";
        setTimeout(() => {
          primaryWrapperRef.current.style.opacity = 1;
          primaryWrapperRef.current.style.pointerEvents = "all";

          primaryWrapperRef.current.childNodes[0].style.transform = "scale(1)";
          primaryWrapperRef.current.childNodes[0].style.opacity = 1;
        }, 10);
      } else {
        primaryWrapperRef.current.style.opacity = 0;
        primaryWrapperRef.current.childNodes[0].style.transform = "scale(0.7)";
        primaryWrapperRef.current.childNodes[0].style.opacity = 0.5;

        clearTimeout(timeOutRef.current);
        timeOutRef.current = setTimeout(() => {
          primaryWrapperRef.current.style.display = "none";
          primaryWrapperRef.current.style.pointerEvents = "none";
        }, 250);
      }
    }
  }, [isOpen]);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDowns);

    return () => {
      document.removeEventListener("keydown", handleKeyDowns);
    };
  }, [isOpen, isClosable]);

  return (
    <div
      className={Styles.Wrapper}
      ref={primaryWrapperRef}
      onClick={(e) => {
        if (isClosable && e.target === primaryWrapperRef.current && closeFun) {
          closeFun();
        }
      }}
    >
      <div className={Styles.Container}>{ContentComp ? ContentComp : null}</div>
    </div>
  );
}

export default PopUp;
