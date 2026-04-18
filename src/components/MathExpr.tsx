import * as ReactKatex from "react-katex";
import "katex/dist/katex.min.css";

// react-katex is a CommonJS module in some bundling paths and ESM in others.
// Using namespace import works for both: named exports land on ReactKatex,
// and a CJS interop default lands on ReactKatex.default.
const InlineMath =
  (ReactKatex as { InlineMath?: typeof ReactKatex.InlineMath }).InlineMath ??
  (ReactKatex as unknown as { default: { InlineMath: typeof ReactKatex.InlineMath } }).default
    ?.InlineMath;
const BlockMath =
  (ReactKatex as { BlockMath?: typeof ReactKatex.BlockMath }).BlockMath ??
  (ReactKatex as unknown as { default: { BlockMath: typeof ReactKatex.BlockMath } }).default
    ?.BlockMath;

/**
 * Renders a math expression. If `latex` is provided, render it via KaTeX.
 * Otherwise gracefully fall back to the plain-text `expression` in mono.
 */
export function MathExpr({
  latex,
  expression,
  block = false,
  className = "",
}: {
  latex?: string;
  expression: string;
  block?: boolean;
  className?: string;
}) {
  if (latex && latex.trim().length > 0 && InlineMath && BlockMath) {
    try {
      return (
        <span className={className}>
          {block ? <BlockMath math={latex} /> : <InlineMath math={latex} />}
        </span>
      );
    } catch {
      // fall through to text
    }
  }
  return <span className={`font-mono ${className}`}>{expression}</span>;
}
