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
    <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-slate-900">Ready to Launch Training</h3>
      </div>

      <div className="space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Target Employee</div>
            <div className="font-semibold text-slate-900">{employeeName}</div>
            <div className="text-xs text-slate-500">{employeeEmail}</div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Selected Scenario</div>
            <div className="font-semibold text-slate-900">Scenario {selectedScenario.id}</div>
            <div className="text-xs text-slate-500">{selectedScenario.title}</div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Attack Vectors</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {selectedScenario.vectors.map((vector, idx) => (
                <Badge key={idx} variant="outline" className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                  {vectorNames[vector]}
                </Badge>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Schedule</div>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => setSchedule('now')}
                className={`flex-1 px-2 py-1 text-xs rounded ${
                  schedule === 'now'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Clock className="w-3 h-3 inline mr-1" />
                Now
              </button>
              <button
                onClick={() => setSchedule('later')}
                className={`flex-1 px-2 py-1 text-xs rounded ${
                  schedule === 'later'
                    ? 'bg-blue-600 text-white'
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
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm text-amber-900 font-medium mb-1">
              Important: Realistic Phishing Simulation
            </p>
            <p className="text-sm text-amber-800">
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
          >
            Cancel
          </Button>
          <Button
            onClick={onLaunch}
            className="bg-green-600 hover:bg-green-700 text-white gap-2"
          >
            <Rocket className="w-4 h-4" />
            Launch Training {schedule === 'now' ? 'Now' : 'Later'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
