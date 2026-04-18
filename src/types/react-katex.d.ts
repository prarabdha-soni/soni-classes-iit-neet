declare module "react-katex" {
  import * as React from "react";
  export interface KatexProps {
    math: string;
    errorColor?: string;
    renderError?: (error: Error) => React.ReactNode;
  }
  export const InlineMath: React.FC<KatexProps>;
  export const BlockMath: React.FC<KatexProps>;
  const _default: {
    InlineMath: React.FC<KatexProps>;
    BlockMath: React.FC<KatexProps>;
  };
  export default _default;
}
