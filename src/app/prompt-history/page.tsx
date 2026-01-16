'use client';

import { useState } from 'react';
import { mockPromptHistory } from '@/data/mockData';
import { PromptHistory } from '@/types';

export default function PromptHistoryPage() {
  const [selectedHistory, setSelectedHistory] = useState<PromptHistory | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredHistory = filterType === 'all'
    ? mockPromptHistory
    : mockPromptHistory.filter(h => h.changeType === filterType);

  const getChangeTypeStyle = (type: string) => {
    switch (type) {
      case 'create': return { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500', gradient: 'from-emerald-500 to-teal-500' };
      case 'update': return { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500', gradient: 'from-blue-500 to-indigo-500' };
      case 'rollback': return { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500', gradient: 'from-amber-500 to-orange-500' };
      default: return { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-500', gradient: 'from-slate-500 to-slate-600' };
    }
  };

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case 'create': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      );
      case 'update': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      );
      case 'rollback': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      );
      default: return null;
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Prompt History</h1>
          <p className="text-slate-500">Track all prompt changes and versions</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Changes</option>
            <option value="create">Created</option>
            <option value="update">Updated</option>
            <option value="rollback">Rollback</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Timeline */}
        <div className="col-span-5 bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 overflow-y-auto max-h-[calc(100vh-220px)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Timeline</h2>
            <span className="text-xs text-slate-400">{filteredHistory.length} entries</span>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200"></div>

            <div className="space-y-4">
              {filteredHistory.map((history) => {
                const style = getChangeTypeStyle(history.changeType);
                return (
                  <div key={history.id} className="relative pl-12">
                    {/* Timeline dot */}
                    <div className={`absolute left-3 w-5 h-5 rounded-full bg-gradient-to-br ${style.gradient} flex items-center justify-center text-white shadow-lg`}>
                      {getChangeTypeIcon(history.changeType)}
                    </div>

                    <button
                      onClick={() => setSelectedHistory(history)}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedHistory?.id === history.id
                          ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-800">{history.version}</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
                          {history.changeType}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2 mb-2">{history.changeSummary}</p>
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {new Date(history.createdAt).toLocaleDateString('ja-JP')}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {history.createdBy}
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Detail View */}
        <div className="col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          {selectedHistory ? (
            <>
              {/* Header */}
              <div className={`p-6 bg-gradient-to-r ${getChangeTypeStyle(selectedHistory.changeType).gradient}`}>
                <div className="flex items-center justify-between">
                  <div className="text-white">
                    <h2 className="text-xl font-bold mb-1">{selectedHistory.version}</h2>
                    <p className="text-white/80 text-sm">{selectedHistory.changeSummary}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors text-sm">
                      Compare
                    </button>
                    <button className="px-4 py-2 bg-white text-slate-700 rounded-lg hover:bg-white/90 transition-colors text-sm font-medium">
                      Rollback
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Meta Info */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Change Type</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getChangeTypeStyle(selectedHistory.changeType).bg} ${getChangeTypeStyle(selectedHistory.changeType).text}`}>
                      {getChangeTypeIcon(selectedHistory.changeType)}
                      {selectedHistory.changeType}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Created At</p>
                    <p className="font-medium text-slate-700">{new Date(selectedHistory.createdAt).toLocaleString('ja-JP')}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl">
                    <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Author</p>
                    <p className="font-medium text-slate-700">{selectedHistory.createdBy}</p>
                  </div>
                </div>

                {/* Content Preview */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Content
                  </label>
                  <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl overflow-auto max-h-80 text-sm font-mono leading-relaxed">
                    {selectedHistory.newContent}
                  </pre>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center p-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-slate-500 font-medium">Select a history entry</p>
                <p className="text-slate-400 text-sm mt-1">Click on an item to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
