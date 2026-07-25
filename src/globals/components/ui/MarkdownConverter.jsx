import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownConverter({ children }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p>{children}</p>,
        strong: ({ children }) => <strong>{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        ul: ({ children }) => (
          <ul className="list-disc ml-4 my-4">{children}</ul>
        ),
        ol: ({ children }) => <ol className="ml-4 list-decimal">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
      }}
    >
      {children}
    </Markdown>
  );
}
