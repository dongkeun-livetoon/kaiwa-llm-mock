import { mockCharacters, mockPromptVersions, mockConversationSessions } from '@/data/mockData';
import Link from 'next/link';

export default function Dashboard() {
  const activePrompts = mockPromptVersions.filter(p => p.isActive).length;
  const totalSessions = mockConversationSessions.length;
  const totalMessages = mockConversationSessions.reduce((sum, s) => sum + s.messageCount, 0);

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
        <p className="text-slate-500">LLM Character System Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Characters"
          value={mockCharacters.length}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
          gradient="from-violet-500 to-purple-600"
          trend="+2 this week"
        />
        <StatCard
          title="Active Prompts"
          value={activePrompts}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          gradient="from-emerald-500 to-teal-600"
          trend="v1.5 latest"
        />
        <StatCard
          title="Conversations"
          value={totalSessions}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          }
          gradient="from-blue-500 to-indigo-600"
          trend="+5 today"
        />
        <StatCard
          title="Total Messages"
          value={totalMessages}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
          gradient="from-amber-500 to-orange-600"
          trend="avg 13/session"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Conversations */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Recent Conversations</h2>
            <Link href="/conversations" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {mockConversationSessions.slice(0, 4).map((session) => (
              <div key={session.id} className="px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-medium shrink-0">
                      U
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-800 truncate">{session.firstMessage?.slice(0, 40)}...</p>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {new Date(session.startedAt).toLocaleDateString('ja-JP')} · {session.messageCount} messages
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium shrink-0">
                    {session.promptVersion}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prompt Versions */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Prompt Versions</h2>
            <Link href="/prompts" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              Manage →
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {mockPromptVersions.map((prompt) => (
              <div
                key={prompt.id}
                className={`p-4 rounded-xl transition-all cursor-pointer ${
                  prompt.isActive
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200'
                    : 'bg-slate-50 hover:bg-slate-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-800">{prompt.version}</span>
                  {prompt.isActive && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      Active
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500">{prompt.description}</p>
                <p className="text-xs text-slate-400 mt-2">
                  {new Date(prompt.createdAt).toLocaleDateString('ja-JP')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  gradient,
  trend
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  gradient: string;
  trend: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
          <p className="text-xs text-slate-400 mt-2">{trend}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
