import { useState, useEffect, useRef } from 'react';
import { Send, User, Shield, MessageSquare } from 'lucide-react';
import { formatRelativeTime } from '../lib/utils';

export default function TaskChat({
  taskId,
  messages = [],
  senderRole = 'requester',
  userAlias = 'User',
  onSendMessage,
  onTypingStart,
  onTypingStop,
  isOtherTyping = false,
}) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const typingTimerRef = useRef(null);

  const taskMessages = messages.filter((m) => m.taskId === taskId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [taskMessages.length, isOtherTyping]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (onTypingStart) onTypingStart();

    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      if (onTypingStop) onTypingStop();
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (onSendMessage) onSendMessage(inputText.trim());
    setInputText('');
    if (onTypingStop) onTypingStop();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-soft flex flex-col h-[480px] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary-600" />
          <h3 className="font-semibold text-sm text-slate-800">Anonymous Task Chat</h3>
        </div>
        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 font-medium border border-teal-200">
          Chatting as {senderRole === 'requester' ? 'Poster' : 'Helper'}
        </span>
      </div>

      {/* Messages List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
        {taskMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs">
            <Shield className="w-8 h-8 text-slate-300 mb-1" />
            <p>End-to-end anonymous communication.</p>
            <p className="text-[11px] text-slate-400">Say hello to coordinate details!</p>
          </div>
        ) : (
          taskMessages.map((msg, index) => {
            const isMe = msg.sender === senderRole;
            return (
              <div
                key={msg.id || index}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1 mb-1 text-[10px] text-slate-400 font-medium">
                  <span>{msg.sender === 'requester' ? 'Poster' : 'Helper'}</span>
                  <span>·</span>
                  <span>{formatRelativeTime(msg.timestamp)}</span>
                </div>
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-primary-600 text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })
        )}

        {/* Typing indicator bubble */}
        {isOtherTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 w-fit shadow-2xs animate-pulse">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-ping" />
            <span>{senderRole === 'requester' ? 'Helper' : 'Poster'} is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type an anonymous message..."
          className="flex-1 px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-xs cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
