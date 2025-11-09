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
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-slate-600" />
        <h3 className="text-lg font-semibold text-slate-900">Available Integrations</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {integrations.map((integration) => (
          <button
            key={integration.id}
            onClick={() => toggleIntegration(integration.id)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              integration.enabled
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${
                integration.enabled ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
              }`}>
                {integration.icon}
              </div>
              {integration.enabled && (
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              )}
            </div>

            <h4 className="font-semibold text-slate-900 mb-1">{integration.name}</h4>

            <Badge variant="outline" className={`${getStatusColor(integration.status)} text-xs border`}>
              {integration.description}
            </Badge>

            {integration.enabled && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-3 text-xs"
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

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>{integrations.filter(i => i.enabled).length}</strong> integration
          {integrations.filter(i => i.enabled).length !== 1 ? 's' : ''} enabled
        </p>
      </div>
    </Card>
  );
}
