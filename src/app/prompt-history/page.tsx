'use client';

import { useState } from 'react';
import { mockPromptHistory, mockPromptVersions } from '@/data/mockData';
import { PromptHistory } from '@/types';

export default function PromptHistoryPage() {
  const [selectedHistory, setSelectedHistory] = useState<PromptHistory | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredHistory = filterType === 'all'
    ? mockPromptHistory
    : mockPromptHistory.filter(h => h.changeType === filterType);

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case 'create': return 'bg-green-100 text-green-700';
      case 'update': return 'bg-blue-100 text-blue-700';
      case 'rollback': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case 'create': return '+';
      case 'update': return '~';
      case 'rollback': return '↩';
      default: return '•';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Prompt History</h1>
        <div className="flex items-center gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="all">All Changes</option>
            <option value="create">Created</option>
            <option value="update">Updated</option>
            <option value="rollback">Rollback</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* History Timeline */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Change History</h2>
          <div className="space-y-4">
            {filteredHistory.map((history, idx) => (
              <div
                key={history.id}
                className={`relative pl-8 pb-4 ${idx !== filteredHistory.length - 1 ? 'border-l-2 border-gray-200' : ''}`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-0 -translate-x-1/2 w-6 h-6 rounded-full ${getChangeTypeColor(history.changeType)} flex items-center justify-center text-sm font-bold`}>
                  {getChangeTypeIcon(history.changeType)}
                </div>

                <button
                  onClick={() => setSelectedHistory(history)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedHistory?.id === history.id
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{history.version}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${getChangeTypeColor(history.changeType)}`}>
                      {history.changeType}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{history.changeSummary}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{new Date(history.createdAt).toLocaleString('ja-JP')}</span>
                    <span>by {history.createdBy}</span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Detail View */}
        <div className="bg-white rounded-xl shadow p-6">
          {selectedHistory ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Change Detail</h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                    Compare
                  </button>
                  <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600">
                    Rollback to this
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Version</label>
                    <p className="font-medium">{selectedHistory.version}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Change Type</label>
                    <p className={`inline-block px-2 py-0.5 rounded text-sm ${getChangeTypeColor(selectedHistory.changeType)}`}>
                      {selectedHistory.changeType}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Created At</label>
                    <p className="font-medium">{new Date(selectedHistory.createdAt).toLocaleString('ja-JP')}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Created By</label>
                    <p className="font-medium">{selectedHistory.createdBy}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Summary</label>
                  <p className="mt-1 p-3 bg-gray-50 rounded-lg">{selectedHistory.changeSummary}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Content</label>
                  <pre className="mt-1 p-3 bg-gray-900 text-gray-100 rounded-lg overflow-auto max-h-64 text-sm">
                    {selectedHistory.newContent}
                  </pre>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <p>Select a history entry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
