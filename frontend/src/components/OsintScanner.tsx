import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Search, RefreshCw, ExternalLink, Linkedin, Mail, MapPin, AlertTriangle, Globe } from 'lucide-react';

interface OsintScannerProps {
  employeeName: string;
  employeeEmail: string;
}

interface OsintResult {
  socialProfiles: number;
  linkedin: string;
  publicEmail: string;
  location: string;
  riskFactors: string[];
}

export default function OsintScanner({ employeeName, employeeEmail }: OsintScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [results, setResults] = useState<OsintResult | null>(null);

  const runScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setResults(null);

    // Simulate progressive scanning
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          // Mock results
          setResults({
            socialProfiles: 3,
            linkedin: 'Senior Ground Operations Manager',
            publicEmail: `${employeeName.toLowerCase().replace(' ', '.')}.personal@gmail.com`,
            location: 'San Francisco, CA',
            riskFactors: [
              'Posts work schedule publicly on social media',
              'LinkedIn profile reveals detailed job responsibilities',
              'Public email found in data breach databases'
            ]
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-amber-50 to-white border-amber-200/60 shadow-sm hover:shadow-xl card-hover gradient-overlay group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-5 h-5 text-amber-600" />
            <div className="absolute -inset-1 bg-amber-600/20 rounded-full blur-md -z-10"></div>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 tracking-tight">OSINT Intelligence</h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={runScan}
            disabled={isScanning}
            className="interactive-scale hover:shadow-sm transition-all"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                {results ? 'Rescan' : 'Run Scan'}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Scanning State */}
      {isScanning && (
        <div className="space-y-3">
          <p className="text-sm text-slate-600 font-medium">
            Gathering open-source intelligence for {employeeName}...
          </p>
          <Progress value={scanProgress} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-amber-400 [&>div]:to-amber-600 [&>div]:shadow-lg" />
          <div className="text-xs text-amber-700 font-medium">
            {scanProgress < 30 && '🔍 Searching social media profiles...'}
            {scanProgress >= 30 && scanProgress < 60 && '📊 Analyzing public records...'}
            {scanProgress >= 60 && scanProgress < 90 && '🔓 Checking data breach databases...'}
            {scanProgress >= 90 && '✨ Compiling results...'}
          </div>
        </div>
      )}

      {/* Results */}
      {!isScanning && results && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Social Profiles */}
            <div className="p-3 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group/card">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-blue-100 rounded-md group-hover/card:bg-blue-200 transition-colors">
                  <Globe className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-slate-900">Social Media</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 metric-number group-hover/card:scale-105 transition-transform">{results.socialProfiles}</p>
              <p className="text-xs text-slate-500">profiles found</p>
            </div>

            {/* LinkedIn */}
            <div className="p-3 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group/card">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-blue-100 rounded-md group-hover/card:bg-blue-200 transition-colors">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-slate-900">LinkedIn</span>
              </div>
              <p className="text-sm text-slate-700 font-medium">{results.linkedin}</p>
            </div>

            {/* Public Email */}
            <div className="p-3 bg-gradient-to-br from-slate-50 to-white rounded-lg border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group/card">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-slate-100 rounded-md group-hover/card:bg-slate-200 transition-colors">
                  <Mail className="w-4 h-4 text-slate-600" />
                </div>
                <span className="text-sm font-medium text-slate-900">Public Email</span>
              </div>
              <p className="text-xs text-slate-700 truncate font-mono">{results.publicEmail}</p>
            </div>

            {/* Location */}
            <div className="p-3 bg-gradient-to-br from-slate-50 to-white rounded-lg border border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group/card">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-slate-100 rounded-md group-hover/card:bg-slate-200 transition-colors">
                  <MapPin className="w-4 h-4 text-slate-600" />
                </div>
                <span className="text-sm font-medium text-slate-900">Location</span>
              </div>
              <p className="text-sm text-slate-700 font-medium">{results.location}</p>
            </div>
          </div>

          {/* Risk Factors */}
          <div className="p-4 bg-gradient-to-br from-red-50 to-white rounded-lg border-2 border-red-200/60 shadow-sm relative">
            <div className="absolute -inset-0.5 bg-red-400/10 rounded-lg blur-sm -z-10 pulse-dot"></div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 bg-red-100 rounded-md">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <span className="text-sm font-semibold text-red-900 tracking-tight">Risk Factors Identified</span>
            </div>
            <ul className="space-y-2">
              {results.riskFactors.map((factor, index) => (
                <li key={index} className="text-sm text-red-800 flex items-start gap-2 p-2 bg-white/50 rounded-md hover:bg-white transition-colors">
                  <span className="text-red-600 mt-0.5 font-bold">•</span>
                  <span className="font-medium">{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button variant="outline" size="sm" className="w-full interactive-scale hover:shadow-sm transition-all">
            <ExternalLink className="w-4 h-4" />
            View Full Report
          </Button>
        </div>
      )}

      {/* Initial State */}
      {!isScanning && !results && (
        <div className="text-center py-8">
          <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 mb-2">No scan results yet</p>
          <p className="text-sm text-slate-500">
            Run a scan to gather open-source intelligence about {employeeName}
          </p>
        </div>
      )}
    </Card>
  );
}
