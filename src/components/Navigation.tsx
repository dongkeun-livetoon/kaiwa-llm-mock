'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/prompts', label: 'Prompts', icon: '📝' },
  { href: '/characters', label: 'Characters', icon: '🎭' },
  { href: '/prompt-history', label: 'Prompt History', icon: '📜' },
  { href: '/conversations', label: 'Conversations', icon: '💬' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Kaiwa LLM Mock</h1>
        <p className="text-gray-400 text-sm">管理ダッシュボード</p>
      </div>
      <ul className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
