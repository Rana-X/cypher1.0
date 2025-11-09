import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, X, Rocket, Shield } from 'lucide-react';
import EmployeeProfile from './EmployeeProfile';
import OsintScanner from './OsintScanner';
import Integrations from './Integrations';
import AttackVectorSelector from './AttackVectorSelector';
import ScenarioGenerator from './ScenarioGenerator';
import LaunchConfirmation from './LaunchConfirmation';

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
    <div className="min-h-screen bg-slate-50">
      <div className="px-8 py-6">
        {/* Logo Header - Same as Dashboard */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900">Cypher</h1>
          </div>
        </div>

        {/* Page Navigation & Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="border-l border-slate-300 h-4"></div>
            <h2 className="text-lg font-semibold text-slate-900">
              Assign Training — {employee.name}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={!selectedScenario}
              onClick={() => setShowConfirmation(true)}
            >
              <Rocket className="w-4 h-4" />
              Launch Training
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Employee Profile */}
          <EmployeeProfile
            name={employee.name}
            email={employee.email}
            department={employee.department}
            riskScore={employee.riskScore}
            failedAttempts={employee.failedAttempts}
            lastTraining={employee.lastTraining}
            location={employee.location}
          />

          {/* OSINT Scanner */}
          <OsintScanner
            employeeName={employee.name}
            employeeEmail={employee.email}
          />

          {/* Integrations */}
          <Integrations />

          {/* Attack Vector Selection */}
          <AttackVectorSelector onGenerate={handleVectorGenerate} />

          {/* Scenario Generator */}
          {selectedVectors.length > 0 && (
            <ScenarioGenerator
              selectedVectors={selectedVectors}
              onSelectScenario={handleScenarioSelect}
            />
          )}

          {/* Launch Confirmation */}
          {showConfirmation && selectedScenario && (
            <LaunchConfirmation
              employeeName={employee.name}
              employeeEmail={employee.email}
              selectedScenario={selectedScenario}
              onLaunch={handleLaunch}
              onCancel={() => setShowConfirmation(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
