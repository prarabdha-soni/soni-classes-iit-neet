import pkg from "react-katex";
import "katex/dist/katex.min.css";

const { InlineMath, BlockMath } = pkg;

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
  if (latex && latex.trim().length > 0) {
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
