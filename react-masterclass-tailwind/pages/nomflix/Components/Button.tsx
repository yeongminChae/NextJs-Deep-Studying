import * as React from "react";
import styled, { css } from "styled-components";

type ColorType =
  | "teal"
  | "gray"
  | "darkGray"
  | "lightGray"
  | "transparent"
  | "red";
type ButtonSize = "medium" | "large";

const ButtonBlock = styled.button<{}>``;

interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, "size"> {
  color?: ColorType;
  inline?: boolean;
  size?: ButtonSize;
  responsive?: boolean;
  theme: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  ref,
  color = "teal",
  inline,
  size = "medium",
  theme,
  responsive = false,
  ...rest
}) => {
  const htmlProps = rest as any;
  return (
    <ButtonBlock
      color={color}
      inline={inline}
      size={size}
      theme={theme}
      responsive={responsive}
      {...htmlProps}
      onClick={(e) => {
        if (htmlProps.onClick) {
          htmlProps.onClick(e);
        }
        (e.target as HTMLButtonElement).blur();
      }}
    >
      {children}
    </ButtonBlock>
  );
};

export default Button;
