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
    if (score >= 80) return 'bg-red-600';
    if (score >= 60) return 'bg-orange-600';
    return 'bg-yellow-600';
  };

  const getRiskLabel = (score: number) => {
    if (score >= 80) return 'High Risk';
    if (score >= 60) return 'Medium Risk';
    return 'Low Risk';
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
          {name.charAt(0).toUpperCase()}
        </div>

        {/* Employee Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{name}</h2>
              <p className="text-slate-600">{department}</p>
              <p className="text-sm text-slate-500">{email}</p>
            </div>

            {/* Risk Score Badge */}
            <div className="text-right">
              <div className="text-sm text-slate-600 mb-1">Risk Score</div>
              <Badge className={`${getRiskColor(riskScore)} text-white border-0 text-lg px-3 py-1`}>
                {riskScore}/100
              </Badge>
              <div className="text-xs text-slate-500 mt-1">{getRiskLabel(riskScore)}</div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-slate-700">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span><strong>{failedAttempts}</strong> Failed Attempts</span>
            </div>
            <div className="border-l border-slate-300 h-4"></div>
            <div className="flex items-center gap-2 text-slate-700">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Last Training: <strong>{lastTraining}</strong></span>
            </div>
            <div className="border-l border-slate-300 h-4"></div>
            <div className="flex items-center gap-2 text-slate-700">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
