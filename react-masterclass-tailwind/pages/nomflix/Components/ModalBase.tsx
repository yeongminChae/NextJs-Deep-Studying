import React, { useEffect, useState } from "react";
import styled from "styled-components";

export type ModalBaseProps = {
  active: boolean;
  closeEvent?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
};

const ModalBaseContainer = styled.div<{ active: boolean }>``;

const ModalBase = ({ active, closeEvent, children }: ModalBaseProps) => {
  const [closed, setClosed] = useState(true);
  useEffect(() => {
    document.body.style.overflowY = active ? "hidden" : "initial";

    let timeoutId: any;
    if (active) {
      setClosed(false);
    } else {
      timeoutId = setTimeout(() => {
        setClosed(true);
      }, 200);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [active]);

  useEffect(() => {
    return () => {
      document.body.style.overflowY = "initial";
    };
  }, []);

  if (!active && closed) return null;

  return (
    <>
      <ModalBaseContainer
        className="absolute top-10 left-0 right-0 z-10 m-auto h-[80vh] w-[40vw] bg-red-200 "
        active={active}
      >
        <div className="modal_back" onClick={closeEvent} />
        <div className="modal_content">{children}</div>
      </ModalBaseContainer>
    </>
  );
};

ModalBase.defaultProps = {
  active: false,
};

export default ModalBase;
