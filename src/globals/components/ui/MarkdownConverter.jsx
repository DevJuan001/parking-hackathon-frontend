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
          <ul className="list-disc ml-5 my-4">{children}</ul>
        ),
        ol: ({ children }) => <ol className="ml-5 list-decimal">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        table: ({ children }) => (
          <table
            className="inline-block w-fit border-separate border-spacing-0 border border-[#E4E2E5] rounded-2xl bg-white overflow-hidden
            dark:bg-black dark:border-[#202022]"
          >
            {children}
          </table>
        ),
        th: ({ children }) => (
          <th
            className="py-2 px-3 text-start border border-[#E4E2E5] rounded-[inherit]
            dark:border-[#202022]"
          >
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td
            className="py-2 px-3 font-normal border border-[#E4E2E5] rounded-[inherit]
            dark:border-[#202022]"
          >
            {children}
          </td>
        ),
      }}
    >
      {children}
    </Markdown>
  );
}
