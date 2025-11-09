import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Mic, FileText, MessageSquare, Mail, CheckCircle2, Settings } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  enabled: boolean;
  status: 'connected' | 'disconnected' | 'ready';
}

export default function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'voice-cloning',
      name: 'Voice Cloning',
      icon: <Mic className="w-6 h-6" />,
      description: 'ElevenLabs Ready',
      enabled: true,
      status: 'ready'
    },
    {
      id: 'documents',
      name: 'Documents',
      icon: <FileText className="w-6 h-6" />,
      description: 'Templates Ready',
      enabled: true,
      status: 'ready'
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'Connected',
      enabled: true,
      status: 'connected'
    },
    {
      id: 'email',
      name: 'Email',
      icon: <Mail className="w-6 h-6" />,
      description: 'Not Connected',
      enabled: false,
      status: 'disconnected'
    }
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations(prev =>
      prev.map(int =>
        int.id === id ? { ...int, enabled: !int.enabled } : int
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'ready':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'disconnected':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-200/60 shadow-sm hover:shadow-xl card-hover gradient-overlay group">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative">
          <Settings className="w-5 h-5 text-purple-600" />
          <div className="absolute -inset-1 bg-purple-600/20 rounded-full blur-md -z-10"></div>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 tracking-tight">Available Integrations</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {integrations.map((integration) => (
          <button
            key={integration.id}
            onClick={() => toggleIntegration(integration.id)}
            className={`p-4 rounded-lg border-2 transition-all text-left interactive-scale relative ${
              integration.enabled
                ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-white shadow-md hover:shadow-lg'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
            }`}
          >
            {integration.enabled && (
              <div className="absolute -inset-0.5 bg-purple-400/20 rounded-lg blur-md -z-10"></div>
            )}
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg transition-all ${
                integration.enabled ? 'bg-purple-100 text-purple-600 shadow-sm' : 'bg-slate-100 text-slate-400'
              }`}>
                {integration.icon}
              </div>
              {integration.enabled && (
                <CheckCircle2 className="w-5 h-5 text-purple-600 animate-in fade-in zoom-in duration-200" />
              )}
            </div>

            <h4 className="font-semibold text-slate-900 mb-2 tracking-tight">{integration.name}</h4>

            <div className="flex items-center gap-1.5">
              {(integration.status === 'connected' || integration.status === 'ready') && (
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full pulse-dot"></div>
              )}
              <Badge variant="outline" className={`${getStatusColor(integration.status)} text-xs border font-medium`}>
                {integration.description}
              </Badge>
            </div>

            {integration.enabled && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-3 text-xs interactive-scale hover:bg-purple-100"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle configure
                }}
              >
                Configure
              </Button>
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200/60 shadow-sm">
        <p className="text-sm text-slate-900">
          <span className="font-bold text-purple-700 metric-number">{integrations.filter(i => i.enabled).length}</span>
          <span className="font-medium"> integration{integrations.filter(i => i.enabled).length !== 1 ? 's' : ''} enabled</span>
        </p>
      </div>
    </Card>
  );
}
