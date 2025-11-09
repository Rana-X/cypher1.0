import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle2, AlertTriangle, Rocket, Calendar, Clock } from 'lucide-react';

interface LaunchConfirmationProps {
  employeeName: string;
  employeeEmail: string;
  selectedScenario: {
    id: number;
    title: string;
    vectors: string[];
  } | null;
  onLaunch: () => void;
  onCancel: () => void;
}

export default function LaunchConfirmation({
  employeeName,
  employeeEmail,
  selectedScenario,
  onLaunch,
  onCancel
}: LaunchConfirmationProps) {
  const [schedule, setSchedule] = useState<'now' | 'later'>('now');

  const vectorNames: Record<string, string> = {
    email: 'Email',
    sms: 'SMS',
    voice: 'Voice Phishing'
  };

  if (!selectedScenario) {
    return null;
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200/60 shadow-sm hover:shadow-xl card-hover gradient-overlay group">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <div className="absolute -inset-1 bg-green-600/20 rounded-full blur-md -z-10"></div>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 tracking-tight">Ready to Launch Training</h3>
      </div>

      <div className="space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
            <div className="text-sm text-slate-600 mb-1 font-medium">Target Employee</div>
            <div className="font-semibold text-slate-900 tracking-tight">{employeeName}</div>
            <div className="text-xs text-slate-500 font-mono">{employeeEmail}</div>
          </div>

          <div className="p-3 bg-gradient-to-br from-emerald-50 to-white rounded-lg border border-emerald-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
            <div className="text-sm text-slate-600 mb-1 font-medium">Selected Scenario</div>
            <div className="font-semibold text-slate-900 tracking-tight">Scenario {selectedScenario.id}</div>
            <div className="text-xs text-slate-500">{selectedScenario.title}</div>
          </div>

          <div className="p-3 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
            <div className="text-sm text-slate-600 mb-1 font-medium">Attack Vectors</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {selectedScenario.vectors.map((vector, idx) => (
                <Badge key={idx} variant="outline" className="bg-purple-100 text-purple-700 border-purple-200 text-xs font-medium shadow-sm">
                  {vectorNames[vector]}
                </Badge>
              ))}
            </div>
          </div>

          <div className="p-3 bg-gradient-to-br from-slate-50 to-white rounded-lg border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <div className="text-sm text-slate-600 mb-1 font-medium">Schedule</div>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => setSchedule('now')}
                className={`flex-1 px-2 py-1.5 text-xs rounded-md transition-all font-medium interactive-scale ${
                  schedule === 'now'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Clock className="w-3 h-3 inline mr-1" />
                Now
              </button>
              <button
                onClick={() => setSchedule('later')}
                className={`flex-1 px-2 py-1.5 text-xs rounded-md transition-all font-medium interactive-scale ${
                  schedule === 'later'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Calendar className="w-3 h-3 inline mr-1" />
                Later
              </button>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="p-4 bg-gradient-to-br from-amber-50 to-white rounded-lg border-2 border-amber-200/60 shadow-sm flex items-start gap-3 relative">
          <div className="absolute -inset-0.5 bg-amber-400/10 rounded-lg blur-sm -z-10 pulse-dot"></div>
          <div className="p-1.5 bg-amber-100 rounded-md">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          </div>
          <div>
            <p className="text-sm text-amber-900 font-semibold mb-1 tracking-tight">
              Important: Realistic Phishing Simulation
            </p>
            <p className="text-sm text-amber-800 font-medium">
              The employee will receive realistic phishing attempts designed to test their security awareness.
              All interactions will be tracked and recorded for training purposes. Results will appear on the
              dashboard in real-time.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="interactive-scale hover:shadow-sm transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={onLaunch}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white gap-2 interactive-scale hover:shadow-lg transition-all"
          >
            <Rocket className="w-4 h-4" />
            Launch Training {schedule === 'now' ? 'Now' : 'Later'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
