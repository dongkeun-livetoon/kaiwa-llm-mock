'use client';

import { useState } from 'react';
import { mockConversationSessions, mockChatMessages, mockCharacters } from '@/data/mockData';
import { ConversationSession, ChatMessage } from '@/types';

export default function ConversationsPage() {
  const [selectedSession, setSelectedSession] = useState<ConversationSession | null>(null);

  const getSessionMessages = (sessionId: string): ChatMessage[] => {
    return mockChatMessages.filter(m => m.sessionId === sessionId);
  };

  const getEmotionEmoji = (emotion?: string) => {
    switch (emotion) {
      case 'happy': return '😊';
      case 'excited': return '🤩';
      case 'sad': return '😢';
      case 'calm': return '😌';
      case 'shy': return '😳';
      case 'surprised': return '😲';
      default: return '😐';
    }
  };

  return (
    <div className="h-full animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Conversations</h1>
          <p className="text-slate-500">View and analyze chat sessions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search conversations..."
              className="pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl w-64 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            <option>All versions</option>
            <option>v1.5</option>
            <option>v1.4</option>
            <option>v1.3</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-220px)]">
        {/* Session List */}
        <div className="col-span-4 bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Sessions</h2>
            <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
              {mockConversationSessions.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {mockConversationSessions.map((session) => {
              const character = mockCharacters.find(c => c.id === session.characterId);
              return (
                <button
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    selectedSession?.id === session.id
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white shrink-0">
                      🐰
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-slate-800">
                          {new Date(session.startedAt).toLocaleDateString('ja-JP')}
                        </span>
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded text-xs font-medium">
                          {session.promptVersion}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                        {session.firstMessage || '(No messages)'}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{character?.name}</span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {session.messageCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat View */}
        <div className="col-span-8 bg-white rounded-2xl shadow-sm border border-slate-200/60 flex flex-col overflow-hidden">
          {selectedSession ? (
            <>
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-2xl shadow-lg">
                      🐰
                    </div>
                    <div>
                      <h2 className="font-semibold text-slate-800">
                        {new Date(selectedSession.startedAt).toLocaleString('ja-JP')}
                      </h2>
                      <p className="text-sm text-slate-500">
                        {selectedSession.promptVersion} · {selectedSession.messageCount} messages
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-secondary text-sm">Export</button>
                    <button className="btn-secondary text-sm">Replay</button>
                    <button className="px-3 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50/50 to-white">
                {getSessionMessages(selectedSession.id).map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center mr-3 shrink-0 shadow-md">
                        <span className="text-sm">🐰</span>
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                          : 'bg-white border border-slate-200'
                      }`}
                    >
                      {message.role === 'assistant' && message.emotion && (
                        <span className="text-lg mr-2">{getEmotionEmoji(message.emotion)}</span>
                      )}
                      <p className={message.role === 'user' ? 'text-white' : 'text-slate-700'}>{message.content}</p>
                      <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {new Date(message.timestamp).toLocaleTimeString('ja-JP')}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center ml-3 shrink-0 shadow-md">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Stats Footer */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/80">
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Duration</p>
                    <p className="font-semibold text-slate-700 mt-1">
                      {selectedSession.endedAt
                        ? `${Math.round((new Date(selectedSession.endedAt).getTime() - new Date(selectedSession.startedAt).getTime()) / 60000)} min`
                        : 'Ongoing'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Messages</p>
                    <p className="font-semibold text-slate-700 mt-1">{selectedSession.messageCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Prompt</p>
                    <p className="font-semibold text-slate-700 mt-1">{selectedSession.promptVersion}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Status</p>
                    <p className={`font-semibold mt-1 ${selectedSession.endedAt ? 'text-slate-500' : 'text-emerald-600'}`}>
                      {selectedSession.endedAt ? 'Ended' : 'Active'}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-slate-700 font-medium text-lg">Select a conversation</p>
                <p className="text-slate-400 mt-1">Choose a session from the left to view messages</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
