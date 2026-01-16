'use client';

import { useState } from 'react';
import { mockPromptVersions, mockCharacters } from '@/data/mockData';

export default function PromptsPage() {
  const [selectedPrompt, setSelectedPrompt] = useState(mockPromptVersions[0]);
  const [editedContent, setEditedContent] = useState(selectedPrompt.content);
  const [isSaving, setIsSaving] = useState(false);

  const handlePromptSelect = (promptId: string) => {
    const prompt = mockPromptVersions.find(p => p.id === promptId);
    if (prompt) {
      setSelectedPrompt(prompt);
      setEditedContent(prompt.content);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Mock save - in real app would call API
    await new Promise(resolve => setTimeout(resolve, 500));
    alert('保存しました（Mock）');
    setIsSaving(false);
  };

  const handleActivate = () => {
    alert(`${selectedPrompt.version} をアクティブにしました（Mock）`);
  };

  const character = mockCharacters.find(c => c.id === selectedPrompt.characterId);

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Prompt Editor</h1>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? '保存中...' : '保存'}
          </button>
          {!selectedPrompt.isActive && (
            <button
              onClick={handleActivate}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Activate
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Prompt List */}
        <div className="col-span-1 bg-white rounded-xl shadow p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Versions</h2>
          <div className="space-y-2">
            {mockPromptVersions.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => handlePromptSelect(prompt.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedPrompt.id === prompt.id
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{prompt.version}</span>
                  {prompt.isActive && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{prompt.description}</p>
              </button>
            ))}
          </div>

          <hr className="my-4" />

          <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors">
            + New Version
          </button>
        </div>

        {/* Editor */}
        <div className="col-span-3 bg-white rounded-xl shadow p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">{selectedPrompt.version}</h2>
              <p className="text-gray-500 text-sm">
                Character: {character?.displayName} · Created: {new Date(selectedPrompt.createdAt).toLocaleString('ja-JP')}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                Preview
              </button>
              <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                Diff
              </button>
              <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">
                Export .md
              </button>
            </div>
          </div>

          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="flex-1 w-full p-4 border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter system prompt..."
          />

          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <span>{editedContent.length} characters</span>
            <span>
              {editedContent !== selectedPrompt.content && (
                <span className="text-orange-500">* Unsaved changes</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
