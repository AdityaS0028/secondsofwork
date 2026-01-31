import React, { useState } from 'react';
import { FileText, Save, FolderOpen, Scissors, Copy, ClipboardPaste, Search, Printer } from 'lucide-react';

export const Notepad: React.FC = () => {
  const [content, setContent] = useState('Welcome to SimpleText!\n\nThis is a basic text editor inspired by the classic Mac OS SimpleText application.\n\nYou can type here, but saving and opening files is simulated for this demo.\n\nFeatures:\n- Plain text editing\n- Word wrap\n- Classic Mac OS styling\n\nEnjoy! 📝');
  const [saved, setSaved] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    // In a real app, this would save to localStorage or a file
    alert('Document saved! (Simulation)');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-1 border-b border-[#808080] bg-[#E8E8E8]">
        <button className="p-1 hover:bg-[#D0D0D0]" title="New">
          <FileText className="w-4 h-4" />
        </button>
        <button 
          onClick={handleSave}
          className="p-1 hover:bg-[#D0D0D0]" 
          title="Save"
        >
          <Save className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-[#D0D0D0]" title="Open">
          <FolderOpen className="w-4 h-4" />
        </button>
        <div className="mac-separator my-0 h-4" />
        <button className="p-1 hover:bg-[#D0D0D0]" title="Cut">
          <Scissors className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-[#D0D0D0]" title="Copy">
          <Copy className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-[#D0D0D0]" title="Paste">
          <ClipboardPaste className="w-4 h-4" />
        </button>
        <div className="mac-separator my-0 h-4" />
        <button className="p-1 hover:bg-[#D0D0D0]" title="Find">
          <Search className="w-4 h-4" />
        </button>
        <button className="p-1 hover:bg-[#D0D0D0]" title="Print">
          <Printer className="w-4 h-4" />
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 p-2">
        <textarea
          value={content}
          onChange={handleChange}
          className="w-full h-full mac-input resize-none font-mono text-sm leading-relaxed"
          spellCheck={false}
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between p-1 border-t border-[#808080] bg-[#E8E8E8] text-xs">
        <div className="flex items-center gap-2">
          <span>{saved ? 'Saved' : 'Modified'}</span>
          <span>|</span>
          <span>{content.length} characters</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Wrap: On</span>
          <span>|</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
};
