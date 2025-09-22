'use client';

import { type BlockerItem } from '../../types/blockers';
import blockersData from '../../data/blockers.json';
import { useState } from 'react';

const blockersJson = blockersData as unknown as { items: BlockerItem[] };

export default function CurrentBlockersPage() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [editNotesText, setEditNotesText] = useState('');

  const saveChanges = async (newItems: BlockerItem[]) => {
    try {
      const response = await fetch('/api/blockers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItems),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
    }
  };
  const [items, setItems] = useState<BlockerItem[]>(blockersJson.items);
  const [newItemText, setNewItemText] = useState('');
  
  const activeItems = items.filter(item => !item.completed);
  const completedItems = items.filter(item => item.completed);
  
  const handleStartEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = async (id: string) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, text: editText.trim() } : item
    );
    setItems(newItems);
    setEditingId(null);
    await saveChanges(newItems);
  };

  const handleStartEditNotes = (id: string, notes: string) => {
    setEditingNotes(id);
    setEditNotesText(notes);
  };

  const handleSaveNotes = async (id: string) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, notes: editNotesText.trim() } : item
    );
    setItems(newItems);
    setEditingNotes(null);
    await saveChanges(newItems);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setEditingNotes(null);
    setEditNotesText('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    await saveChanges(newItems);
  };

  const handleToggle = async (id: string) => {
    const newItems = items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(newItems);
    await saveChanges(newItems);
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    
    const newItem = {
      id: String(items.length + 1),
      text: newItemText.trim(),
      notes: '',
      completed: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    const newItems = [...items, newItem];
    setItems(newItems);
    setNewItemText('');
    await saveChanges(newItems);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            Current Blockers
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track and manage your current blockers. Click items to toggle their status.
          </p>
        </div>
        
        <div className="space-y-6">
          {/* Add New Item Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <form onSubmit={handleAddItem} className="flex gap-3">
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder="Add a new blocker..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Item
              </button>
            </form>
          </div>

          {/* Active Items */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              Active Blockers
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                ({activeItems.length})
              </span>
            </h2>
            <div className="space-y-3">
              {activeItems.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg group"
                >
                    {editingId === item.id ? (
                      <div className="flex-1 flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full flex-shrink-0" />
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1 px-2 py-1 bg-white dark:bg-gray-700 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit(item.id);
                            if (e.key === 'Escape') handleCancelEdit();
                          }}
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveEdit(item.id)}
                            className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                            title="Save changes"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            title="Cancel editing"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="flex-1 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg p-1 group/item"
                      >
                        <button
                          onClick={() => handleToggle(item.id)}
                          className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full flex-shrink-0 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                        />
                        <div className="flex-1 flex flex-col">
                          <div 
                            className="text-gray-700 dark:text-gray-300 text-left group-hover/item:text-gray-900 dark:group-hover/item:text-gray-200"
                          >
                            <span
                              className="cursor-text"
                              onClick={() => handleStartEdit(item.id, item.text)}
                            >
                              {item.text}
                            </span>
                          </div>
                          {item.notes ? (
                            <div 
                              className="mt-1 inline-flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm rounded-full cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30"
                              onClick={() => handleStartEditNotes(item.id, item.notes || '')}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                              <span>{item.notes}</span>
                            </div>
                          ) : (
                            <div
                              onClick={() => handleStartEditNotes(item.id, '')}
                              className="mt-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 cursor-pointer"
                            >
                              + Add notes
                            </div>
                          )}
                          {editingNotes === item.id && (
                            <div className="mt-2 flex items-center gap-2">
                              <input
                                type="text"
                                value={editNotesText}
                                onChange={(e) => setEditNotesText(e.target.value)}
                                placeholder="Add notes..."
                                className="flex-1 px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveNotes(item.id);
                                  if (e.key === 'Escape') handleCancelEdit();
                                }}
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveNotes(item.id)}
                                className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                                title="Save notes"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                title="Cancel editing"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                        <span className="ml-auto text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                          {item.createdAt}
                        </span>
                      </div>
                    )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                    title="Delete item"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Items */}
          {completedItems.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                Completed
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  ({completedItems.length})
                </span>
              </h2>
              <div className="space-y-3">
                {completedItems.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg group"
                  >
                    {editingId === item.id ? (
                      <div className="flex-1 flex items-center gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1 px-2 py-1 bg-white dark:bg-gray-700 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit(item.id);
                            if (e.key === 'Escape') handleCancelEdit();
                          }}
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveEdit(item.id)}
                            className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                            title="Save changes"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            title="Cancel editing"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        className="flex-1 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg p-1 group/item"
                      >
                        <button
                          onClick={() => handleToggle(item.id)}
                          className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
                        >
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <div className="flex-1 flex flex-col">
                          <div 
                            className="text-gray-500 dark:text-gray-400 text-left group-hover/item:text-gray-600 dark:group-hover/item:text-gray-300"
                          >
                            <span
                              className="cursor-text line-through"
                              onClick={() => handleStartEdit(item.id, item.text)}
                            >
                              {item.text}
                            </span>
                          </div>
                          {item.notes ? (
                            <div 
                              className="mt-1 inline-flex items-center gap-1 px-2 py-1 bg-blue-50/50 dark:bg-blue-900/10 text-blue-500/70 dark:text-blue-400/70 text-sm rounded-full cursor-pointer hover:bg-blue-100/50 dark:hover:bg-blue-900/20"
                              onClick={() => handleStartEditNotes(item.id, item.notes || '')}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                              <span className="line-through">{item.notes}</span>
                            </div>
                          ) : (
                            <div
                              onClick={() => handleStartEditNotes(item.id, '')}
                              className="mt-1 text-sm text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 cursor-pointer"
                            >
                              + Add notes
                            </div>
                          )}
                          {editingNotes === item.id && (
                            <div className="mt-2 flex items-center gap-2">
                              <input
                                type="text"
                                value={editNotesText}
                                onChange={(e) => setEditNotesText(e.target.value)}
                                placeholder="Add notes..."
                                className="flex-1 px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveNotes(item.id);
                                  if (e.key === 'Escape') handleCancelEdit();
                                }}
                                autoFocus
                              />
                              <button
                                onClick={() => handleSaveNotes(item.id)}
                                className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                                title="Save notes"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                title="Cancel editing"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                        <span className="ml-auto text-sm text-gray-400 dark:text-gray-500 flex-shrink-0">
                          {item.createdAt}
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                      title="Delete item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
