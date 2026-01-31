import React, { useState } from 'react';
import { Folder, FileText, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  type: 'folder' | 'file';
  description: string;
  tech: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: '1',
    name: 'Mac OS Classic Web',
    type: 'folder',
    description: 'A fully functional vintage Mac OS simulation in the browser',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    link: '#',
    github: '#'
  },
  {
    id: '2',
    name: 'Retro Terminal',
    type: 'file',
    description: 'A working terminal emulator with retro aesthetics',
    tech: ['JavaScript', 'CSS3', 'HTML5'],
    link: '#',
    github: '#'
  },
  {
    id: '3',
    name: 'Pixel Art Editor',
    type: 'folder',
    description: '1-bit and 8-bit pixel art creation tool',
    tech: ['Canvas API', 'React', 'WebGL'],
    link: '#',
    github: '#'
  },
  {
    id: '4',
    name: 'Synth Wave Audio',
    type: 'file',
    description: 'Web Audio API synthesizer with retro wave aesthetics',
    tech: ['Web Audio API', 'React', 'TypeScript'],
    link: '#',
    github: '#'
  }
];

export const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'icon' | 'list'>('icon');

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center gap-2 p-2 border-b border-[#808080] bg-[#E8E8E8]">
          <button className="mac-button text-xs py-0.5 px-2">Back</button>
          <div className="mac-separator my-0 h-4" />
          <span className="text-xs">Projects</span>
          <div className="flex-1" />
          <button 
            onClick={() => setViewMode('icon')}
            className={`text-xs px-2 py-0.5 border border-[#808080] ${viewMode === 'icon' ? 'bg-white' : 'bg-[#E8E8E8]'}`}
          >
            Icon
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`text-xs px-2 py-0.5 border border-[#808080] ${viewMode === 'list' ? 'bg-white' : 'bg-[#E8E8E8]'}`}
          >
            List
          </button>
        </div>

        {/* Projects Grid/List */}
        <div className="flex-1 p-4 overflow-auto">
          {viewMode === 'icon' ? (
            <div className="grid grid-cols-4 gap-4">
              {projects.map(project => (
                <div
                  key={project.id}
                  onClick={() => setSelectedId(project.id)}
                  className={`flex flex-col items-center p-2 cursor-pointer ${
                    selectedId === project.id ? 'bg-[#316AC5] text-white' : ''
                  }`}
                >
                  {project.type === 'folder' ? (
                    <Folder className={`w-10 h-10 ${selectedId === project.id ? 'text-white' : 'text-[#F0C040]'}`} />
                  ) : (
                    <FileText className={`w-10 h-10 ${selectedId === project.id ? 'text-white' : 'text-[#404040]'}`} />
                  )}
                  <span className="text-xs text-center mt-1">{project.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mac-list h-full">
              {projects.map(project => (
                <div
                  key={project.id}
                  onClick={() => setSelectedId(project.id)}
                  className={`mac-list-item flex items-center gap-2 ${
                    selectedId === project.id ? 'selected' : ''
                  }`}
                >
                  {project.type === 'folder' ? (
                    <Folder className="w-4 h-4 text-[#F0C040]" />
                  ) : (
                    <FileText className="w-4 h-4 text-[#404040]" />
                  )}
                  <span>{project.name}</span>
                  <span className="text-xs text-gray-500 ml-4">{project.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview Pane */}
      {selectedProject && (
        <div className="w-48 border-l border-[#808080] bg-[#E8E8E8] p-3">
          <div className="flex flex-col items-center mb-4">
            {selectedProject.type === 'folder' ? (
              <Folder className="w-16 h-16 text-[#F0C040]" />
            ) : (
              <FileText className="w-16 h-16 text-[#404040]" />
            )}
            <span className="text-xs font-bold mt-2 text-center">{selectedProject.name}</span>
          </div>

          <div className="mac-separator" />

          <div className="space-y-3 mt-3">
            <div>
              <div className="text-xs font-bold">Description:</div>
              <div className="text-xs">{selectedProject.description}</div>
            </div>

            <div>
              <div className="text-xs font-bold">Tech Stack:</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedProject.tech.map(tech => (
                  <span key={tech} className="text-xs bg-[#D0D0D0] px-1.5 py-0.5 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              {selectedProject.link && (
                <button 
                  onClick={() => window.open(selectedProject.link, '_blank')}
                  className="mac-button text-xs flex items-center justify-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Live
                </button>
              )}
              {selectedProject.github && (
                <button 
                  onClick={() => window.open(selectedProject.github, '_blank')}
                  className="mac-button text-xs flex items-center justify-center gap-1"
                >
                  <Github className="w-3 h-3" />
                  GitHub
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
