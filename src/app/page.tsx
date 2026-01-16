import { mockCharacters, mockPromptVersions, mockConversationSessions } from '@/data/mockData';

export default function Dashboard() {
  const activePrompts = mockPromptVersions.filter(p => p.isActive).length;
  const totalSessions = mockConversationSessions.length;
  const totalMessages = mockConversationSessions.reduce((sum, s) => sum + s.messageCount, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Characters"
          value={mockCharacters.length}
          icon="🎭"
          color="blue"
        />
        <StatCard
          title="Active Prompts"
          value={activePrompts}
          icon="📝"
          color="green"
        />
        <StatCard
          title="Conversations"
          value={totalSessions}
          icon="💬"
          color="purple"
        />
        <StatCard
          title="Total Messages"
          value={totalMessages}
          icon="📨"
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Conversations</h2>
          <div className="space-y-3">
            {mockConversationSessions.slice(0, 3).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{session.firstMessage?.slice(0, 30)}...</p>
                  <p className="text-sm text-gray-500">
                    {new Date(session.startedAt).toLocaleString('ja-JP')} · {session.messageCount} messages
                  </p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                  {session.promptVersion}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Prompt Versions</h2>
          <div className="space-y-3">
            {mockPromptVersions.map((prompt) => (
              <div key={prompt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{prompt.version}</p>
                  <p className="text-sm text-gray-500">{prompt.description}</p>
                </div>
                {prompt.isActive && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                    Active
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: number; icon: string; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`w-12 h-12 ${colorClasses[color as keyof typeof colorClasses]} rounded-full flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
