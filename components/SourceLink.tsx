import React from 'react';
import { Source } from '../types';

interface SourceLinkProps {
  source: Source;
  index: number;
}

const SourceLink: React.FC<SourceLinkProps> = ({ source, index }) => {
  const domain = new URL(source.uri).hostname;

  return (
    <a
      href={source.uri}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-sm"
    >
      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-gray-600 text-gray-300 rounded-full font-semibold">
        {index + 1}
      </div>
      <div className="flex-grow min-w-0">
        <p className="text-gray-100 font-medium truncate" title={source.title}>
          {source.title}
        </p>
        <p className="text-gray-400 text-xs truncate" title={domain}>
          {domain}
        </p>
      </div>
    </a>
  );
};

export default SourceLink;
