import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle2, AlertTriangle, Rocket, Calendar, Clock, Loader2, Mail, Phone, MessageSquare } from 'lucide-react';

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
  isLaunching?: boolean;
}

export default function LaunchConfirmation({
  employeeName,
  employeeEmail,
  selectedScenario,
  onLaunch,
  onCancel,
  isLaunching = false
}: LaunchConfirmationProps) {
  const [schedule, setSchedule] = useState<'now' | 'later'>('now');
  const [messagesGenerated, setMessagesGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const vectorNames: Record<string, string> = {
    email: 'Email',
    sms: 'SMS',
    voice: 'Voice Phishing'
  };

  // Hardcoded templates - Tailored for Rana Patel (CISO)
  const emailTemplate = {
    subject: "Vibe Con Hackathon - Registration Re-confirmation Required",
    body: `Hi Rana,

Hope you're doing well! This is Sarah from the Y Combinator Events Team.

I wanted to reach out personally regarding your registration for Vibe Con Hackathon (November 9-10). We've encountered a technical issue with our registration system that accidentally enrolled several duplicate participants, and unfortunately your registration was affected.

To ensure you can participate without any issues this weekend, we're asking attendees to re-confirm their registration through our updated portal. This should only take a minute.

Please click here to verify your registration:
https://rana-x.github.io/cypher1.0/phishing-training

Once you log in with your email, your spot will be secured and you'll receive a new confirmation with your updated participant badge.

Sorry for the inconvenience! We're working to make sure everyone has a smooth experience at the hackathon. Let me know if you run into any trouble with the re-registration process.

Looking forward to seeing you there!

Best,
Sarah
Events Coordinator
Y Combinator Events Team`
  };

  const voiceTemplate = {
    scenario: "SOC 2 Audit Follow-up Scam",
    script: `Hello, this is Michael Chen from the SOC 2 audit certification team at ComplianceFirst Partners. We're following up on your recent SOC 2 Type II certification that was completed for TechVision Solutions. Congratulations on achieving this, by the way. We have a minor discrepancy in our records regarding one of your security controls documentation. It's nothing major, but we need to verify some information to finalize your certification report. Do you have a few minutes? I'll need to confirm your role as CISO and verify a couple of the security protocols you have in place. This is just standard post-audit verification to close out the file.`,
    objectives: [
      "Leverage recent SOC 2 certification achievement to establish credibility",
      "Create false sense of legitimacy through compliance terminology",
      "Exploit professional pride in security accomplishments",
      "Test CISO's verification of external audit contacts",
      "Assess response to requests for sensitive security control information"
    ]
  };

  const handleGenerateMessages = () => {
    setIsGenerating(true);
    // Simulate API call with timeout
    setTimeout(() => {
      setIsGenerating(false);
      setMessagesGenerated(true);
    }, 2000);
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
          {/* <div className="p-3 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
            <div className="text-sm text-slate-600 mb-1 font-medium">Target Employee</div>
            <div className="font-semibold text-slate-900 tracking-tight">{employeeName}</div>
            <div className="text-xs text-slate-500 font-mono">{employeeEmail}</div>
          </div> */}

          <div className="p-3 bg-gradient-to-br from-emerald-50 to-white rounded-lg border border-emerald-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
            <div className="text-sm text-slate-600 mb-1 font-medium">Selected Scenario</div>
            <div className="font-semibold text-slate-900 tracking-tight">Scenario {selectedScenario.id}</div>
            <div className="text-xs text-slate-500">{selectedScenario.title}</div>
          </div>

          <div className="p-3 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
            <div className="text-sm text-slate-600 mb-1 font-medium">Attack Vectors</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {selectedScenario.vectors.map((vector, idx) => (
                <Badge key={idx} variant="outline" className="bg-green-100 text-green-700 border-green-200 text-xs font-medium shadow-sm">
                  {vectorNames[vector]}
                </Badge>
              ))}
            </div>
          </div>

          {/* <div className="p-3 bg-gradient-to-br from-slate-50 to-white rounded-lg border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
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
          </div> */}
        </div>

        {/* Generate Messages Button - Show if messages not generated */}
        {!messagesGenerated && !isGenerating && (
          <div className="flex justify-center pt-2">
            <Button
              onClick={handleGenerateMessages}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white gap-2 interactive-scale hover:shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Generate Attack Messages
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isGenerating && (
          <div className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-200/60 shadow-sm">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-900">Generating Attack Messages...</p>
                <p className="text-xs text-slate-600 mt-1">Creating realistic phishing scenarios</p>
              </div>
            </div>
          </div>
        )}

        {/* Templates Display - Show after generation */}
        {messagesGenerated && (
          <>
            {/* Email/SMS Template */}
            {(selectedScenario.vectors.includes('email') || selectedScenario.vectors.includes('sms')) && (
              <div className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-200/60 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-slate-900">Email Phishing Template</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-slate-600 mb-1">Subject:</p>
                    <p className="text-sm font-semibold text-slate-900 bg-white p-2 rounded border border-slate-200">
                      {emailTemplate.subject}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-600 mb-1">Body:</p>
                    <div className="text-sm text-slate-800 bg-white p-3 rounded border border-slate-200 whitespace-pre-wrap font-mono text-xs">
                      {emailTemplate.body}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Voice Phishing Template */}
            {selectedScenario.vectors.includes('voice') && (
              <div className="p-4 bg-gradient-to-br from-purple-50 to-white rounded-lg border border-purple-200/60 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-slate-900">Voice Phishing Scenario</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-slate-600 mb-1">Scenario Type:</p>
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                      {voiceTemplate.scenario}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-600 mb-1">Call Script:</p>
                    <div className="text-sm text-slate-800 bg-white p-3 rounded border border-slate-200 italic">
                      {voiceTemplate.script}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-600 mb-1">Training Objectives:</p>
                    <ul className="text-sm text-slate-800 bg-white p-3 rounded border border-slate-200 space-y-1">
                      {voiceTemplate.objectives.map((objective, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-purple-600 mt-0.5">•</span>
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Warning */}
            <div className="p-4 bg-gradient-to-br from-amber-50 to-white rounded-lg border-2 border-amber-200/60 shadow-sm flex items-start gap-3 relative">
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
                disabled={isLaunching}
                className="interactive-scale hover:shadow-sm transition-all"
              >
                Cancel
              </Button>
              <Button
                onClick={onLaunch}
                disabled={isLaunching}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white gap-2 interactive-scale hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLaunching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Launching Call...
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" />
                    Create Training Bot
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
