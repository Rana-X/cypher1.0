import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FileText, RefreshCw, Eye, Edit, Rocket, Mail, Phone, Mic } from 'lucide-react';

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

    // Simulate AI generation
    setTimeout(() => {
      const mockScenarios: Scenario[] = [
        {
          id: 1,
          title: 'IROP Emergency Response',
          vectors: selectedVectors,
          description: 'Urgent: Gate change needed for Flight 237. Call this number immediately to confirm crew availability and operational status.'
        },
        {
          id: 2,
          title: 'IT Security Update Required',
          vectors: selectedVectors.filter(v => v !== 'voice'),
          description: 'Your VPN certificate expires in 1 hour. Click here to renew and avoid account lockout. Immediate action required.'
        },
        {
          id: 3,
          title: 'Executive Request',
          vectors: selectedVectors,
          description: 'This is the CEO\'s assistant. We need the Ground Ops report for the board meeting in 30 minutes. Please send immediately.'
        }
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
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
          <h3 className="text-lg font-semibold text-slate-900">Generating Attack Scenarios...</h3>
        </div>
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">AI is creating realistic attack scenarios...</p>
        </div>
      </Card>
    );
  }

  if (scenarios.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900">
            Generated Attack Scenarios ({scenarios.length})
          </h3>
        </div>
        <Button variant="outline" size="sm" onClick={generateScenarios}>
          <RefreshCw className="w-4 h-4" />
          Regenerate
        </Button>
      </div>

      <div className="space-y-3">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => handleSelectScenario(scenario)}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              selectedScenarioId === scenario.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Radio Button */}
              <div className="mt-1">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedScenarioId === scenario.id
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-slate-300 bg-white'
                }`}>
                  {selectedScenarioId === scenario.id && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
              </div>

              {/* Scenario Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">
                      Scenario {scenario.id}: {scenario.title}
                    </h4>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs text-slate-500">Vectors:</span>
                      {scenario.vectors.map((vector, idx) => (
                        <Badge key={idx} variant="outline" className="bg-slate-100 text-slate-700 border-slate-200 gap-1">
                          {vectorIcons[vector]}
                          {vectorNames[vector]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                  "{scenario.description}"
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle edit
                    }}
                  >
                    <Edit className="w-3 h-3" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle preview
                    }}
                  >
                    <Eye className="w-3 h-3" />
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedScenarioId && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200 flex items-center justify-between">
          <div className="text-sm text-green-900">
            <strong>Scenario {selectedScenarioId}</strong> selected and ready to launch
          </div>
          <Badge className="bg-green-600 text-white border-0">
            <Rocket className="w-3 h-3" />
            Ready
          </Badge>
        </div>
      )}
    </Card>
  );
}
