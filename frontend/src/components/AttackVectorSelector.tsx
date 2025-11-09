import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Target, Mail, Phone, Mic, Video, CheckCircle2 } from 'lucide-react';

interface AttackVector {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  enabled: boolean;
  comingSoon?: boolean;
}

interface AttackVectorSelectorProps {
  onGenerate: (selectedVectors: string[]) => void;
}

export default function AttackVectorSelector({ onGenerate }: AttackVectorSelectorProps) {
  const [vectors, setVectors] = useState<AttackVector[]>([
    {
      id: 'email',
      name: 'Email Phishing',
      icon: <Mail className="w-5 h-5" />,
      description: 'Craft convincing emails impersonating executives',
      enabled: false
    },
    {
      id: 'sms',
      name: 'SMS/Text Phishing',
      icon: <Phone className="w-5 h-5" />,
      description: 'Send urgent text messages requiring immediate action',
      enabled: false
    },
    {
      id: 'voice',
      name: 'Voice Phishing (Vishing)',
      icon: <Mic className="w-5 h-5" />,
      description: 'AI-generated voice calls from "IT Support"',
      enabled: false
    },
    {
      id: 'deepfake',
      name: 'Deepfake Video',
      icon: <Video className="w-5 h-5" />,
      description: 'Video calls with AI-generated faces',
      enabled: false,
      comingSoon: true
    }
  ]);

  const toggleVector = (id: string) => {
    setVectors(prev =>
      prev.map(vector =>
        vector.id === id && !vector.comingSoon
          ? { ...vector, enabled: !vector.enabled }
          : vector
      )
    );
  };

  const selectedCount = vectors.filter(v => v.enabled).length;

  const handleGenerate = () => {
    const selectedIds = vectors.filter(v => v.enabled).map(v => v.id);
    onGenerate(selectedIds);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-red-50 to-white border-red-200/60 shadow-sm hover:shadow-xl card-hover gradient-overlay group">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative">
          <Target className="w-5 h-5 text-red-600" />
          <div className="absolute -inset-1 bg-red-600/20 rounded-full blur-md -z-10"></div>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 tracking-tight">Select Attack Vectors</h3>
      </div>

      <div className="space-y-3">
        {vectors.map((vector) => (
          <button
            key={vector.id}
            onClick={() => toggleVector(vector.id)}
            disabled={vector.comingSoon}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left relative ${
              vector.comingSoon
                ? 'border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed'
                : vector.enabled
                ? 'border-red-500 bg-gradient-to-br from-red-50 to-white shadow-md hover:shadow-lg interactive-scale'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm interactive-scale'
            }`}
          >
            {vector.enabled && !vector.comingSoon && (
              <div className="absolute -inset-0.5 bg-red-400/20 rounded-lg blur-md -z-10"></div>
            )}
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg mt-0.5 transition-all ${
                vector.comingSoon
                  ? 'bg-slate-200 text-slate-400'
                  : vector.enabled
                  ? 'bg-red-100 text-red-600 shadow-sm group-hover:scale-110'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {vector.icon}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-slate-900 tracking-tight">{vector.name}</h4>
                  {vector.comingSoon && (
                    <Badge className="bg-slate-200 text-slate-700 border-0 text-xs font-medium">
                      COMING SOON
                    </Badge>
                  )}
                  {vector.enabled && !vector.comingSoon && (
                    <CheckCircle2 className="w-5 h-5 text-red-600 ml-auto animate-in fade-in zoom-in duration-200" />
                  )}
                </div>
                <p className="text-sm text-slate-600">{vector.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200/60 shadow-sm">
        <div className="text-sm text-slate-900">
          <span className="font-bold text-red-700 metric-number">{selectedCount}</span>
          <span className="font-medium"> vector{selectedCount !== 1 ? 's' : ''} selected</span>
        </div>
        <Button
          onClick={handleGenerate}
          disabled={selectedCount === 0}
          className="gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 interactive-scale hover:shadow-lg transition-all disabled:opacity-50"
        >
          Generate Attack Scenarios
          <Target className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
