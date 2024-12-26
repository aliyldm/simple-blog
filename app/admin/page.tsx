'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
          Admin Dashboard
        </h1>
        <button
          onClick={() => router.push('/projects')}
          className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
        >
          Back to Projects
        </button>
      </div>

      <div className="bg-[#2a2a2a] rounded-xl border border-white/10 overflow-hidden">
        <div className="flex border-b border-white/10">
          <button
            className={`px-6 py-4 ${
              activeTab === 'projects'
                ? 'bg-blue-500/20 text-blue-400'
                : 'text-gray-400 hover:text-white'
            } transition-colors`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={`px-6 py-4 ${
              activeTab === 'skills'
                ? 'bg-blue-500/20 text-blue-400'
                : 'text-gray-400 hover:text-white'
            } transition-colors`}
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </button>
          <button
            className={`px-6 py-4 ${
              activeTab === 'about'
                ? 'bg-blue-500/20 text-blue-400'
                : 'text-gray-400 hover:text-white'
            } transition-colors`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
        </div>

        <div className="p-6">
          <div className="text-center text-gray-400">
            <p>Admin functionality is currently disabled.</p>
            <p className="mt-2">Edit the content directly in the source files.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 