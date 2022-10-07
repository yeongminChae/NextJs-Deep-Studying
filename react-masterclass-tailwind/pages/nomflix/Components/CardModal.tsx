import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";

export type CardModalProps = {
  active: boolean;
  closeEvent: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  children?: React.ReactNode;
  actionMsg?: string;
  actionEvent?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

const CardModal = ({
  closeEvent,
  title,
  children,
  actionMsg,
  actionEvent,
  ...rest
}: CardModalProps) => {
  return (
    <>
      <CardModalContainer>
        <h3>{title}</h3>
        <div className="msg">{children}</div>
        <div className="action_box">
          <Button onClick={closeEvent} theme="tertiary">
            닫기
          </Button>
          <Button theme="secondary" onClick={actionEvent}></Button>
        </div>
      </CardModalContainer>
    </>
  );
};

CardModal.defaultProps = {
  active: false,
};

const CardModalContainer = styled.div``;

export default CardModal;
