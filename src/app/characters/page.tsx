'use client';

import { useState } from 'react';
import { mockCharacters } from '@/data/mockData';
import { Character } from '@/types';

export default function CharactersPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(mockCharacters[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(selectedCharacter);

  const handleSave = () => {
    alert('保存しました（Mock）');
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Character Settings</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + New Character
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Character List */}
        <div className="col-span-1 bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Characters</h2>
          <div className="space-y-2">
            {mockCharacters.map((char) => (
              <button
                key={char.id}
                onClick={() => {
                  setSelectedCharacter(char);
                  setEditForm(char);
                  setIsEditing(false);
                }}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  selectedCharacter.id === char.id
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                    🎭
                  </div>
                  <div>
                    <p className="font-medium">{char.displayName}</p>
                    <p className="text-sm text-gray-500">{char.name}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Character Detail */}
        <div className="col-span-2 bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-4xl">
                🎭
              </div>
              <div>
                <h2 className="text-2xl font-bold">{selectedCharacter.displayName}</h2>
                <p className="text-gray-500">@{selectedCharacter.name}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              {isEditing ? (
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                />
              ) : (
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedCharacter.description}</p>
              )}
            </div>

            {/* Personality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personality Traits
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedCharacter.personality.map((trait, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {trait}
                  </span>
                ))}
                {isEditing && (
                  <button className="px-3 py-1 border-2 border-dashed border-gray-300 rounded-full text-sm text-gray-500 hover:border-purple-400">
                    + Add
                  </button>
                )}
              </div>
            </div>

            {/* Speech Patterns */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speech Patterns (口癖)
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedCharacter.speechPatterns.map((pattern, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-mono"
                  >
                    {pattern}
                  </span>
                ))}
                {isEditing && (
                  <button className="px-3 py-1 border-2 border-dashed border-gray-300 rounded-full text-sm text-gray-500 hover:border-blue-400">
                    + Add
                  </button>
                )}
              </div>
            </div>

            {/* Emotions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Emotions
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedCharacter.emotions.map((emotion, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    {emotion}
                  </span>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <div className="pt-4 border-t">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Created:</span>
                  <span className="ml-2">{new Date(selectedCharacter.createdAt).toLocaleString('ja-JP')}</span>
                </div>
                <div>
                  <span className="text-gray-500">Updated:</span>
                  <span className="ml-2">{new Date(selectedCharacter.updatedAt).toLocaleString('ja-JP')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
