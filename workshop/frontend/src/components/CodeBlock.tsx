import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden border border-github-border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-github-bg border-b border-github-border">
        <span className="text-xs text-github-muted font-mono">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-github-muted hover:text-github-text transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-github-green" />
              <span className="text-github-green">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language === 'csharp' ? 'csharp' : language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: '#0d1117',
          fontSize: '0.8125rem',
          lineHeight: '1.6',
        }}
        showLineNumbers
        lineNumberStyle={{ color: '#30363d', fontSize: '0.75rem' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
