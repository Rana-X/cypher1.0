import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import {
  Search,
  User,
  Shield,
  Rocket,
  AlertTriangle,
  Settings,
  FileText,
  Download,
  TrendingUp
} from 'lucide-react';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => onOpenChange(false)}
      />
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4">
        <Command className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center border-b border-slate-200 px-4 py-3">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Type a command or search..."
              className="flex-1 outline-none text-sm text-slate-900 placeholder:text-slate-400 bg-transparent"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600">
              <span className="text-xs">ESC</span>
            </kbd>
          </div>

          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-slate-500">
              No results found.
            </Command.Empty>

            <Command.Group heading="Quick Actions" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500">
              <Command.Item
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-100 aria-selected:bg-slate-100 transition-colors"
                onSelect={() => runCommand(() => navigate('/'))}
              >
                <div className="p-1.5 bg-blue-100 rounded-md">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900">View Dashboard</div>
                  <div className="text-xs text-slate-500">Go to main dashboard</div>
                </div>
              </Command.Item>

              <Command.Item
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-100 aria-selected:bg-slate-100 transition-colors"
                onSelect={() => runCommand(() => navigate('/training/assign/rana'))}
              >
                <div className="p-1.5 bg-emerald-100 rounded-md">
                  <Rocket className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900">Launch Training Campaign</div>
                  <div className="text-xs text-slate-500">Create new phishing simulation</div>
                </div>
              </Command.Item>

              <Command.Item
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-100 aria-selected:bg-slate-100 transition-colors"
                onSelect={() => runCommand(() => alert('Exporting employee list...'))}
              >
                <div className="p-1.5 bg-purple-100 rounded-md">
                  <Download className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900">Export Employee List</div>
                  <div className="text-xs text-slate-500">Download vulnerable employees CSV</div>
                </div>
              </Command.Item>
            </Command.Group>

            <Command.Separator className="h-px bg-slate-200 my-2" />

            <Command.Group heading="Employees" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500">
              {['Rana', 'Jennifer Lee', 'Robert Kim', 'Amanda Garcia', 'Chris Anderson'].map((name) => (
                <Command.Item
                  key={name}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-100 aria-selected:bg-slate-100 transition-colors"
                  onSelect={() => runCommand(() => navigate(`/training/assign/${name.toLowerCase().replace(/ /g, '-')}`))}
                >
                  <div className="p-1.5 bg-slate-100 rounded-md">
                    <User className="w-4 h-4 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">{name}</div>
                    <div className="text-xs text-slate-500">Assign training</div>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator className="h-px bg-slate-200 my-2" />

            <Command.Group heading="Reports" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500">
              <Command.Item
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-100 aria-selected:bg-slate-100 transition-colors"
                onSelect={() => runCommand(() => alert('Opening risk report...'))}
              >
                <div className="p-1.5 bg-red-100 rounded-md">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900">Risk Assessment Report</div>
                  <div className="text-xs text-slate-500">View detailed risk analysis</div>
                </div>
              </Command.Item>

              <Command.Item
                className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-slate-100 aria-selected:bg-slate-100 transition-colors"
                onSelect={() => runCommand(() => alert('Opening analytics...'))}
              >
                <div className="p-1.5 bg-blue-100 rounded-md">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900">Campaign Analytics</div>
                  <div className="text-xs text-slate-500">View performance metrics</div>
                </div>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="border-t border-slate-200 px-4 py-2 flex items-center gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">↓</kbd>
              <span>to navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">↵</kbd>
              <span>to select</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">ESC</kbd>
              <span>to close</span>
            </div>
          </div>
        </Command>
      </div>
    </>
  );
}
