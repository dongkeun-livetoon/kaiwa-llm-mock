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
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Conversation History</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search conversations..."
            className="px-4 py-2 border rounded-lg w-64"
          />
          <select className="px-4 py-2 border rounded-lg bg-white">
            <option>All versions</option>
            <option>v1.5</option>
            <option>v1.4</option>
            <option>v1.3</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Session List */}
        <div className="col-span-1 bg-white rounded-xl shadow p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Sessions ({mockConversationSessions.length})</h2>
          <div className="space-y-3">
            {mockConversationSessions.map((session) => {
              const character = mockCharacters.find(c => c.id === session.characterId);
              return (
                <button
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedSession?.id === session.id
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">
                      {new Date(session.startedAt).toLocaleDateString('ja-JP')}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                      {session.promptVersion}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {session.firstMessage || '(No messages)'}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{character?.name}</span>
                    <span>{session.messageCount} messages</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat View */}
        <div className="col-span-2 bg-white rounded-xl shadow flex flex-col">
          {selectedSession ? (
            <>
              {/* Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">
                      Session: {new Date(selectedSession.startedAt).toLocaleString('ja-JP')}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Prompt {selectedSession.promptVersion} · {selectedSession.messageCount} messages
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                      Export
                    </button>
                    <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                      Replay
                    </button>
                    <button className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50">
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {getSessionMessages(selectedSession.id).map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-4 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.role === 'assistant' && message.emotion && (
                        <span className="text-lg mr-2">{getEmotionEmoji(message.emotion)}</span>
                      )}
                      <p>{message.content}</p>
                      <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                        {new Date(message.timestamp).toLocaleTimeString('ja-JP')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="p-4 border-t bg-gray-50">
                <div className="grid grid-cols-4 gap-4 text-center text-sm">
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium">
                      {selectedSession.endedAt
                        ? `${Math.round((new Date(selectedSession.endedAt).getTime() - new Date(selectedSession.startedAt).getTime()) / 60000)} min`
                        : 'Ongoing'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Messages</p>
                    <p className="font-medium">{selectedSession.messageCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Prompt</p>
                    <p className="font-medium">{selectedSession.promptVersion}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className={`font-medium ${selectedSession.endedAt ? 'text-gray-500' : 'text-green-600'}`}>
                      {selectedSession.endedAt ? 'Ended' : 'Active'}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="text-6xl mb-4">💬</p>
                <p>Select a session to view conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
