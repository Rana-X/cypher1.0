import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Rocket,
  AlertTriangle,
  TrendingUp,
  Mail,
  Phone,
  Video,
  Shield,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Progress } from './ui/progress';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleAssignTraining = (employeeName: string) => {
    const employeeId = employeeName.toLowerCase().replace(/ /g, '-');
    navigate(`/training/assign/${employeeId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <div className="px-8 py-6">
      {/* Logo Header */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-900">Cypher</h1>
        </div>
      </motion.div>

      <div className="space-y-6">
        {/* Main Metrics */}
      <motion.div
        className="grid grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Risk Score */}
        <motion.div variants={itemVariants}>
        <Card className="p-6 bg-white border-slate-200/60 shadow-sm hover:shadow-md card-hover">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wide text-slate-500 font-medium">Company Risk Score</span>
            <Shield className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mb-4">
            <div className="metric-number text-5xl text-[#0066FF] mb-2">
              72<span className="text-2xl text-slate-500">/100</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-sm text-emerald-600 font-medium">+8 from last month</span>
            </div>
          </div>
          <Progress value={72} className="h-1 rounded-full" />
          <p className="text-xs text-slate-500 mt-3">Higher is better</p>
        </Card>
        </motion.div>

        {/* Active Campaigns */}
        <motion.div variants={itemVariants}>
        <Card className="p-6 bg-white border-slate-200/60 shadow-sm hover:shadow-md card-hover">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wide text-slate-500 font-medium">Active Campaigns</span>
            <Rocket className="w-4 h-4 text-slate-400" />
          </div>
          <div className="metric-number text-5xl text-slate-900 mb-4">3</div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-100 text-emerald-700 border-0 px-2 py-0.5 text-xs">LIVE</Badge>
              <span className="text-sm text-slate-700">IROP Chaos Simulation</span>
            </div>
            <div className="text-sm text-slate-500">347 employees targeted</div>
          </div>
        </Card>
        </motion.div>

        {/* Compromised Rate */}
        <motion.div variants={itemVariants}>
        <Card className="p-6 bg-white border-slate-200/60 shadow-sm hover:shadow-md card-hover">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wide text-slate-500 font-medium">Compromised (24h)</span>
            <AlertTriangle className="w-4 h-4 text-slate-400" />
          </div>
          <div className="metric-number text-5xl text-[#EF4444] mb-4">47%</div>
          <div className="space-y-1.5">
            <div className="text-sm text-slate-700">163 of 347 employees</div>
            <div className="text-xs text-slate-500">Industry avg: 52%</div>
          </div>
        </Card>
        </motion.div>

        {/* Training Completion */}
        <motion.div variants={itemVariants}>
        <Card className="p-6 bg-white border-slate-200/60 shadow-sm hover:shadow-md card-hover">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wide text-slate-500 font-medium">Training Complete</span>
            <CheckCircle2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="metric-number text-5xl text-[#10B981] mb-4">89%</div>
          <div className="space-y-1.5">
            <div className="text-sm text-slate-700">145 of 163 completed</div>
            <div className="text-xs text-slate-500">Avg time: 3.2 min</div>
          </div>
        </Card>
        </motion.div>
      </motion.div>

      {/* Live Attack Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
      <Card className="p-6 bg-white border-slate-200/60 shadow-sm hover:shadow-md card-hover">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-semibold text-slate-900">Live Attack Feed</h3>
              <Badge className="bg-red-600 text-white border-0 animate-pulse text-xs px-2 py-0.5">LIVE</Badge>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">View All</Button>
          </div>

          <div className="space-y-3">
            <AttackEvent
              name="Rana"
              action="clicked phishing link"
              vector="email"
              time="2 seconds ago"
              status="compromised"
            />
            <AttackEvent 
              name="James Rodriguez"
              action="completed training module"
              vector="email"
              time="12 seconds ago"
              status="trained"
            />
            <AttackEvent 
              name="Emily Chen"
              action="opened suspicious email"
              vector="email"
              time="23 seconds ago"
              status="opened"
            />
            <AttackEvent 
              name="Marcus Johnson"
              action="entered credentials on fake portal"
              vector="sms"
              time="41 seconds ago"
              status="compromised"
            />
            <AttackEvent 
              name="Lisa Park"
              action="reported phishing attempt"
              vector="email"
              time="1 minute ago"
              status="reported"
            />
            <AttackEvent 
              name="David Brown"
              action="clicked malicious SMS link"
              vector="sms"
              time="2 minutes ago"
              status="compromised"
            />
            <AttackEvent 
              name="Anna Williams"
              action="completed training module"
              vector="voice"
              time="3 minutes ago"
              status="trained"
            />
          </div>
        </Card>
      </motion.div>

      {/* Vulnerable Employees Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
      <Card className="p-6 bg-white border-slate-200/60 shadow-sm hover:shadow-md card-hover">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-1">Most Vulnerable Employees</h3>
            <p className="text-sm text-slate-600">Employees who need additional training</p>
          </div>
          <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50">Export List</Button>
        </div>

        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-slate-50/80 sticky top-0 z-10">
                  <tr className="border-y border-slate-200">
                    <th className="text-left py-3 px-6 text-xs uppercase tracking-wider text-slate-600 font-medium">Rank</th>
                    <th className="text-left py-3 px-6 text-xs uppercase tracking-wider text-slate-600 font-medium">Employee</th>
                    <th className="text-left py-3 px-6 text-xs uppercase tracking-wider text-slate-600 font-medium">Department</th>
                    <th className="text-left py-3 px-6 text-xs uppercase tracking-wider text-slate-600 font-medium">Risk Score</th>
                    <th className="text-left py-3 px-6 text-xs uppercase tracking-wider text-slate-600 font-medium">Failed Attempts</th>
                    <th className="text-left py-3 px-6 text-xs uppercase tracking-wider text-slate-600 font-medium">Last Training</th>
                    <th className="text-left py-3 px-6 text-xs uppercase tracking-wider text-slate-600 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
              <EmployeeRow
                rank={1}
                name="Rana"
                email="rana@airline.com"
                department="Ground Ops"
                riskScore={94}
                failedAttempts={7}
                lastTraining="Never"
                onAssignTraining={handleAssignTraining}
              />
              <EmployeeRow
                rank={2}
                name="Jennifer Lee"
                email="j.lee@airline.com"
                department="Customer Service"
                riskScore={89}
                failedAttempts={6}
                lastTraining="3 months ago"
                onAssignTraining={handleAssignTraining}
              />
              <EmployeeRow
                rank={3}
                name="Robert Kim"
                email="r.kim@airline.com"
                department="Flight Crew"
                riskScore={86}
                failedAttempts={5}
                lastTraining="1 month ago"
                onAssignTraining={handleAssignTraining}
              />
              <EmployeeRow
                rank={4}
                name="Amanda Garcia"
                email="a.garcia@airline.com"
                department="Ground Ops"
                riskScore={82}
                failedAttempts={5}
                lastTraining="2 weeks ago"
                onAssignTraining={handleAssignTraining}
              />
              <EmployeeRow
                rank={5}
                name="Chris Anderson"
                email="c.anderson@airline.com"
                department="Maintenance"
                riskScore={78}
                failedAttempts={4}
                lastTraining="1 week ago"
                onAssignTraining={handleAssignTraining}
              />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
      </motion.div>
      </div>
    </div>
  );
}

// Helper Components
function AttackEvent({ name, action, vector, time, status }: {
  name: string;
  action: string;
  vector: 'email' | 'sms' | 'voice' | 'video';
  time: string;
  status: 'compromised' | 'trained' | 'opened' | 'reported';
}) {
  const vectorIcons = {
    email: <Mail className="w-2.5 h-2.5" />,
    sms: <Phone className="w-2.5 h-2.5" />,
    voice: <Phone className="w-2.5 h-2.5" />,
    video: <Video className="w-2.5 h-2.5" />
  };

  const statusColors = {
    compromised: 'bg-red-100 text-red-700 border-red-200',
    trained: 'bg-green-100 text-green-700 border-green-200',
    opened: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    reported: 'bg-blue-100 text-blue-700 border-blue-200'
  };

  const statusIcons = {
    compromised: <XCircle className="size-2" />,
    trained: <CheckCircle2 className="size-2" />,
    opened: <AlertTriangle className="size-2" />,
    reported: <Shield className="size-2" />
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
        {vectorIcons[vector]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-slate-900">{name}</div>
        <div className="text-sm text-slate-600">{action}</div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className={statusColors[status] + ' gap-1 border'}>
          {statusIcons[status]}
          {status}
        </Badge>
        <div className="text-xs text-slate-500 whitespace-nowrap flex items-center gap-1">
          <Clock className="size-2" />
          {time}
        </div>
      </div>
    </div>
  );
}

function EmployeeRow({ rank, name, email, department, riskScore, failedAttempts, lastTraining, onAssignTraining }: {
  rank: number;
  name: string;
  email: string;
  department: string;
  riskScore: number;
  failedAttempts: number;
  lastTraining: string;
  onAssignTraining: (name: string) => void;
}) {
  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600 bg-red-50 border-red-100';
    if (score >= 60) return 'text-orange-600 bg-orange-50 border-orange-100';
    return 'text-yellow-600 bg-yellow-50 border-yellow-100';
  };

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="py-4 px-6">
        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-sm font-medium text-slate-700 group-hover:bg-slate-200 transition-colors">
          {rank}
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="text-sm font-medium text-slate-900">{name}</div>
        <div className="text-xs text-slate-500 mt-0.5">{email}</div>
      </td>
      <td className="py-4 px-6 text-sm text-slate-700">{department}</td>
      <td className="py-4 px-6">
        <Badge className={`${getRiskColor(riskScore)} border font-medium`}>
          {riskScore}/100
        </Badge>
      </td>
      <td className="py-4 px-6">
        <span className="text-sm font-medium text-slate-900">{failedAttempts}</span>
      </td>
      <td className="py-4 px-6">
        <span className="text-sm text-slate-600">{lastTraining}</span>
      </td>
      <td className="py-4 px-6">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onAssignTraining(name)}
          className="border-slate-300 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        >
          Assign Training
        </Button>
      </td>
    </tr>
  );
}
