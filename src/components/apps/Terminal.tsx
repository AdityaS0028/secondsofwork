import React, { useState, useRef, useEffect } from 'react';

interface TerminalCommand {
  input: string;
  output: string;
  isError?: boolean;
}

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalCommand[]>([
    { input: '', output: 'Mac OS Terminal\nVersion 1.0\nType "help" for available commands.' }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    let output = '';
    let isError = false;

    switch (command) {
      case 'help':
        output = `Available commands:
  help       - Show this help message
  clear      - Clear terminal
  date       - Show current date and time
  whoami     - Show current user
  ls         - List files
  pwd        - Show current directory
  echo       - Print text
  calc       - Simple calculator
  about      - About this system
  reboot     - Restart the system`;
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'date':
        output = new Date().toString();
        break;

      case 'whoami':
        output = 'user';
        break;

      case 'ls':
        output = `Applications/
Desktop Folder/
Documents/
Downloads/
Library/
System Folder/
 Utilities/
  Calculator.app
  Terminal.app
  About.app
  Projects.app
  Contact.app`;
        break;

      case 'pwd':
        output = '/Users/user';
        break;

      case 'echo':
        output = args.join(' ') || '';
        break;

      case 'calc':
        try {
          const expression = args.join(' ');
          if (!expression) {
            output = 'Usage: calc <expression>\nExample: calc 2 + 2';
          } else {
            // Simple safe evaluation
            const sanitized = expression.replace(/[^0-9+\-*/.() ]/g, '');
            output = eval(sanitized).toString();
          }
        } catch (e) {
          output = 'Error: Invalid expression';
          isError = true;
        }
        break;

      case 'about':
        output = `Mac OS Classic Web
A retro operating system simulation
Built with React, TypeScript, and nostalgia
Version 1.0 - 2024`;
        break;

      case 'reboot':
        output = 'Rebooting system...\n(Close this window and refresh to restart)';
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        break;

      case '':
        output = '';
        break;

      default:
        output = `Command not found: ${command}\nType "help" for available commands.`;
        isError = true;
    }

    setHistory(prev => [...prev, { input: cmd, output, isError }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      executeCommand(currentInput);
      setCurrentInput('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commands = history.filter(h => h.input).map(h => h.input);
      if (commands.length > 0) {
        const newIndex = Math.min(historyIndex + 1, commands.length - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commands[commands.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const commands = history.filter(h => h.input).map(h => h.input);
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commands[commands.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  return (
    <div className="bg-black text-green-500 font-mono text-sm h-full flex flex-col p-2">
      <div className="flex-1 overflow-auto whitespace-pre-wrap">
        {history.map((entry, i) => (
          <div key={i}>
            {entry.input && (
              <div className="flex">
                <span className="text-green-400">user@mac:~$ </span>
                <span>{entry.input}</span>
              </div>
            )}
            {entry.output && (
              <div className={entry.isError ? 'text-red-400' : ''}>
                {entry.output}
              </div>
            )}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400">user@mac:~$ </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-green-500 ml-1 font-mono"
            autoFocus
            spellCheck={false}
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
