import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FileText, RefreshCw, Rocket, Mail, Phone, Mic } from 'lucide-react';

interface Scenario {
  id: number;
  title: string;
  vectors: string[];
  description: string;
}

interface ScenarioGeneratorProps {
  selectedVectors: string[];
  onSelectScenario: (scenario: Scenario) => void;
}

const vectorIcons: Record<string, React.ReactNode> = {
  email: <Mail className="w-3 h-3" />,
  sms: <Phone className="w-3 h-3" />,
  voice: <Mic className="w-3 h-3" />
};

const vectorNames: Record<string, string> = {
  email: 'Email',
  sms: 'SMS',
  voice: 'Voice'
};

export default function ScenarioGenerator({ selectedVectors, onSelectScenario }: ScenarioGeneratorProps) {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [selectedScenarioId, setSelectedScenarioId] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateScenarios = () => {
    setIsGenerating(true);
    setSelectedScenarioId(null);

    // Simulate AI generation - Tailored for Rana Patel (CISO)
    setTimeout(() => {
      const mockScenarios: Scenario[] = [
        {
          id: 1,
          title: 'YC Vibe Con Hackathon - Registration Issue',
          vectors: selectedVectors,
          description: 'Technical issue with registration system for Vibe Con Hackathon (November 9-10). Re-confirm your registration through updated portal to secure your participant spot.'
        },
        {
          id: 2,
          title: 'SOC 2 Audit Follow-up',
          vectors: selectedVectors,
          description: 'Post-certification verification needed for your recent SOC 2 Type II achievement. Minor documentation discrepancy requires immediate review of security controls.'
        },
        {
          id: 3,
          title: 'Critical Security Vendor Alert',
          vectors: selectedVectors.filter(v => v !== 'voice'),
          description: 'Urgent: Zero-day vulnerability detected in your cloud security infrastructure. Immediate patch deployment required to maintain compliance posture.'
        },
      ];
      setScenarios(mockScenarios);
      setIsGenerating(false);
    }, 2000);
  };

  useEffect(() => {
    if (selectedVectors.length > 0) {
      generateScenarios();
    }
  }, [selectedVectors]);

  const handleSelectScenario = (scenario: Scenario) => {
    setSelectedScenarioId(scenario.id);
    onSelectScenario(scenario);
  };

  if (isGenerating) {
    return (
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200/60 shadow-sm hover:shadow-xl card-hover gradient-overlay">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative">
            <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
            <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur-md -z-10"></div>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 tracking-tight">Generating Attack Scenarios...</h3>
        </div>
        <div className="text-center py-12">
          <div className="relative inline-block">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute -inset-2 bg-blue-400/20 rounded-full blur-xl -z-10 pulse-dot"></div>
          </div>
          <p className="text-slate-700 font-medium">✨ AI is crafting realistic attack scenarios...</p>
          <p className="text-xs text-slate-500 mt-2">Analyzing attack vectors and generating custom scenarios</p>
        </div>
      </Card>
    );
  }

  if (scenarios.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-emerald-50 to-white border-emerald-200/60 shadow-sm hover:shadow-xl card-hover gradient-overlay group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <FileText className="w-5 h-5 text-emerald-600" />
            <div className="absolute -inset-1 bg-emerald-600/20 rounded-full blur-md -z-10"></div>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 tracking-tight">
            Select Attack Scenario
          </h3>
        </div>
        <Button variant="outline" size="sm" onClick={generateScenarios} className="interactive-scale hover:shadow-sm transition-all">
          <RefreshCw className="w-4 h-4" />
          Regenerate
        </Button>
      </div>

      <div className="space-y-3">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className={`w-full p-4 rounded-lg border-2 transition-all relative cursor-pointer select-none ${
              selectedScenarioId === scenario.id
                ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-white shadow-md hover:shadow-lg'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
            }`}
            onClick={() => handleSelectScenario(scenario)}
          >
            <div className="flex items-start gap-3">
             <div className='w-5 h-5 border border-slate-900 rounded-full flex items-center justify-center'>
              {selectedScenarioId === scenario.id && <div className="w-2 h-2 bg-slate-900 rounded-full"></div>}
             </div>

              {/* Scenario Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 tracking-tight">
                      Scenario {scenario.id}: {scenario.title}
                    </h4>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs text-slate-500 font-medium">Vectors:</span>
                      {scenario.vectors.map((vector, idx) => (
                        <Badge key={idx} variant="outline" className="bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 border-slate-200 gap-1 shadow-sm">
                          {vectorIcons[vector]}
                          {vectorNames[vector]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  "{scenario.description}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedScenarioId && (
        <div className="mt-4 p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200/60 shadow-sm flex items-center justify-between">
          <div className="text-sm text-slate-900">
            <span className="font-bold text-emerald-700">Scenario {selectedScenarioId}</span>
            <span className="font-medium"> selected and ready to launch</span>
          </div>
          <Badge className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white border-0 shadow-md gap-1">
            <Rocket className="w-3 h-3" />
            Ready
          </Badge>
        </div>
      )}
    </Card>
  );
}
