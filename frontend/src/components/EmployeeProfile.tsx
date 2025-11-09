import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';

interface EmployeeProfileProps {
  name: string;
  email: string;
  department: string;
  riskScore: number;
  failedAttempts: number;
  lastTraining: string;
  location?: string;
}

export default function EmployeeProfile({
  name,
  email,
  department,
  riskScore,
  failedAttempts,
  lastTraining,
  location = 'SFO'
}: EmployeeProfileProps) {
  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-50 border-red-100';
    if (score >= 60) return 'text-orange-600 bg-orange-50 border-orange-100';
    return 'text-yellow-600 bg-yellow-50 border-yellow-100';
  };

  const getRiskLabel = (score: number) => {
    if (score >= 80) return 'High Risk';
    if (score >= 60) return 'Medium Risk';
    return 'Low Risk';
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200/60 shadow-sm hover:shadow-xl card-hover gradient-overlay group">
      <div className="flex items-start gap-4">
        {/* Avatar with Gradient */}
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="absolute -inset-0.5 bg-blue-400/20 rounded-full blur-md -z-10"></div>
        </div>

        {/* Employee Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{name}</h2>
              <p className="text-slate-700 font-medium">{department}</p>
              <p className="text-sm text-slate-500">{email}</p>
            </div>

            {/* Risk Score Badge with Sparkline */}
            <div className="text-right">
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-1 font-medium">Risk Score</div>
              <div className="flex items-center gap-2">
                <Badge className={`${getRiskColor(riskScore)} border font-semibold shadow-sm badge-glow text-base px-3 py-1`}>
                  <span className="metric-number">{riskScore}/100</span>
                </Badge>
                {/* Mini Sparkline */}
                <div className="flex gap-0.5 items-end h-6">
                  {[4, 6, 5, 7, 8].map((height, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all ${riskScore >= 80 ? 'bg-red-400' : 'bg-orange-400'}`}
                      style={{ height: `${height * 2.5}px` }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="text-xs text-slate-500 mt-1">{getRiskLabel(riskScore)}</div>
            </div>
          </div>

          {/* Stats Row with Hover Effects */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-700 px-2 py-1 rounded-lg hover:bg-white/50 transition-colors cursor-pointer group/stat">
              <div className="p-1.5 bg-red-50 rounded-md group-hover/stat:bg-red-100 transition-colors">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              </div>
              <span><span className="font-semibold text-slate-900">{failedAttempts}</span> Failed Attempts</span>
            </div>
            <div className="border-l border-slate-300 h-4"></div>
            <div className="flex items-center gap-2 text-slate-700 px-2 py-1 rounded-lg hover:bg-white/50 transition-colors cursor-pointer group/stat">
              <div className="p-1.5 bg-slate-100 rounded-md group-hover/stat:bg-slate-200 transition-colors">
                <Clock className="w-3.5 h-3.5 text-slate-600" />
              </div>
              <span>Last Training: <span className={`font-semibold ${lastTraining === 'Never' ? 'text-red-600' : 'text-slate-900'}`}>{lastTraining}</span></span>
            </div>
            <div className="border-l border-slate-300 h-4"></div>
            <div className="flex items-center gap-2 text-slate-700 px-2 py-1 rounded-lg hover:bg-white/50 transition-colors cursor-pointer group/stat">
              <div className="p-1.5 bg-blue-50 rounded-md group-hover/stat:bg-blue-100 transition-colors">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="font-medium">{location}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
