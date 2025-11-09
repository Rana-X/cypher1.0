import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import EmployeeProfile from './EmployeeProfile';
import OsintScanner from './OsintScanner';
import Integrations from './Integrations';
import AttackVectorSelector from './AttackVectorSelector';
import ScenarioGenerator from './ScenarioGenerator';
import LaunchConfirmation from './LaunchConfirmation';
import { motion } from 'framer-motion';

// Mock employee data - in real app, this would come from API/context
const employeeData: Record<string, any> = {
  rana: {
    name: 'Rana',
    email: 'rana@airline.com',
    department: 'Ground Ops',
    riskScore: 94,
    failedAttempts: 7,
    lastTraining: 'Never',
    location: 'SFO'
  },
  'jennifer-lee': {
    name: 'Jennifer Lee',
    email: 'j.lee@airline.com',
    department: 'Customer Service',
    riskScore: 89,
    failedAttempts: 6,
    lastTraining: '3 months ago',
    location: 'LAX'
  }
};

export default function TrainingAssignment() {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [selectedVectors, setSelectedVectors] = useState<string[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<any>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const employee = employeeData[employeeId || 'rana'] || employeeData.rana;

  const handleVectorGenerate = (vectors: string[]) => {
    setSelectedVectors(vectors);
    setShowConfirmation(false);
    setSelectedScenario(null);
  };

  const handleScenarioSelect = (scenario: any) => {
    setSelectedScenario(scenario);
    setShowConfirmation(true);
  };

  const handleLaunch = () => {
    // In real app, this would send data to backend
    alert(`Training launched for ${employee.name}!\n\nScenario: ${selectedScenario.title}\nVectors: ${selectedScenario.vectors.join(', ')}`);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <div className="px-8 py-6 relative z-10">
        {/* Logo Header - Same as Dashboard */}
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-2 bg-white rounded-lg shadow-sm border border-blue-200/60">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="absolute -inset-1 bg-blue-600/30 rounded-lg blur-lg -z-10"></div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cypher</h1>
            <div className="flex items-center gap-1.5 ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full pulse-dot"></div>
              Live
            </div>
          </div>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 interactive-scale"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="border-l border-slate-300 h-4"></div>
          <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
            Assign Training — {employee.name}
          </h2>
        </div>

        {/* Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Employee Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
          <EmployeeProfile
            name={employee.name}
            email={employee.email}
            department={employee.department}
            riskScore={employee.riskScore}
            failedAttempts={employee.failedAttempts}
            lastTraining={employee.lastTraining}
            location={employee.location}
          />
          </motion.div>

          {/* OSINT Scanner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
          <OsintScanner
            employeeName={employee.name}
            employeeEmail={employee.email}
          />
          </motion.div>

          {/* Integrations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
          <Integrations />
          </motion.div>

          {/* Attack Vector Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
          <AttackVectorSelector onGenerate={handleVectorGenerate} />
          </motion.div>

          {/* Scenario Generator */}
          {selectedVectors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
            <ScenarioGenerator
              selectedVectors={selectedVectors}
              onSelectScenario={handleScenarioSelect}
            />
            </motion.div>
          )}

          {/* Launch Confirmation */}
          {showConfirmation && selectedScenario && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
            <LaunchConfirmation
              employeeName={employee.name}
              employeeEmail={employee.email}
              selectedScenario={selectedScenario}
              onLaunch={handleLaunch}
              onCancel={() => setShowConfirmation(false)}
            />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
