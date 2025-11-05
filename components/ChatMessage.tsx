import React, { useState } from 'react';
import { marked } from 'marked';
import { ChatMessage as ChatMessageType, Sender } from '../types';
import { BotIcon, SpeakerIcon } from './icons';
import SourceLink from './SourceLink';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === Sender.Bot;
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(message.text);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };
  
  const rawMarkup = marked.parse(message.text, { breaks: true, gfm: true });

  return (
    <div className={`flex items-start gap-4 my-6 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isBot ? 'bg-indigo-500' : 'bg-blue-500'
        }`}
      >
        {isBot ? (
          <BotIcon className="w-6 h-6 text-white" />
        ) : (
          <span className="text-xl font-bold text-white">U</span>
        )}
      </div>
      <div className={`max-w-xl w-full px-5 py-4 rounded-2xl ${isBot ? 'bg-gray-800 text-gray-200' : 'bg-blue-600 text-white'}`}>
        <div 
          className="prose prose-invert prose-p:my-2 prose-headings:my-3 prose-ul:my-2" 
          dangerouslySetInnerHTML={{ __html: rawMarkup as string }}
        />
        {isBot && message.sources && message.sources.length > 0 && (
          <div className="mt-4 border-t border-gray-700 pt-4">
            <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Sources</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {message.sources.map((source, index) => (
                <SourceLink key={source.uri} source={source} index={index} />
              ))}
            </div>
          </div>
        )}
        {isBot && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={handleSpeak}
              className={`p-1.5 rounded-full transition-colors ${isSpeaking ? 'bg-green-500/30 text-green-400' : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'}`}
              aria-label={isSpeaking ? "Stop speaking" : "Speak message"}
            >
              <SpeakerIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
