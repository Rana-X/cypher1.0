import { useState, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Upload, FileText, CheckCircle2, XCircle, Users, Search, Loader2, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export default function EmployeeUpload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isGathering, setIsGathering] = useState(false);
  const [completedSources, setCompletedSources] = useState<string[]>([]);
  const [gatheringComplete, setGatheringComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      setUploadedFile(file);

      // Parse CSV file
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        // Subtract 1 for header row
        const count = lines.length > 0 ? lines.length - 1 : 0;
        setEmployeeCount(count);
        setUploadStatus('success');
      };
      reader.onerror = () => {
        setUploadStatus('error');
      };
      reader.readAsText(file);
    } else {
      setUploadStatus('error');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setEmployeeCount(0);
    setUploadStatus('idle');
    setIsGathering(false);
    setCompletedSources([]);
    setGatheringComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGatherData = async () => {
    setIsGathering(true);
    setCompletedSources([]);
    setGatheringComplete(false);

    const sources = ['LinkedIn', 'Twitter', 'Facebook'];

    // Simulate gathering data from each source with delays
    for (let i = 0; i < sources.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 700)); // 700ms delay between each source
      setCompletedSources(prev => [...prev, sources[i]]);
    }

    // Wait a bit more then show complete
    await new Promise(resolve => setTimeout(resolve, 500));
    setGatheringComplete(true);
    setIsGathering(false);
  };

  // Hardcoded example employee data - Rana Patel
  const exampleEmployeeData = {
    name: "Rana Patel",
    email: "rana.patel@techvision.io",
    phone: "+1 (555) 987-6543",
    jobTitle: "Chief Information Security Officer (CISO)",
    company: "TechVision Solutions",
    location: "Austin, TX",
    linkedIn: {
      connections: 1247,
      recentPosts: [
        "Attending RSA Conference 2024 - excited to discuss zero-trust architecture",
        "Our team just completed SOC 2 Type II certification! Proud of the security culture we've built"
      ],
      skills: ["Cybersecurity Strategy", "Risk Management", "Incident Response", "Cloud Security", "SOC 2 Compliance", "Security Training"]
    },
    twitter: {
      followers: 3421,
      recentTweets: [
        "I'm gonna be at YC VibeCon 2025, come say hi!",
        "Just published a blog post on implementing zero-trust in hybrid cloud environments"
      ]
    },
    facebook: {
      friends: 478,
      interests: ["Cybersecurity", "Technology Leadership", "Hiking", "Chess"]
    }
  };

  return (
    <>
      <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200/60 shadow-sm hover:shadow-xl card-hover gradient-overlay group">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative">
            <Users className="w-5 h-5 text-green-600" />
            <div className="absolute -inset-1 bg-green-600/20 rounded-full blur-md -z-10"></div>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 tracking-tight">Upload Employees</h3>
        </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileSelect}
        className="hidden"
      />

      {!uploadedFile ? (
        <div
          onClick={handleUploadClick}
          className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-400 hover:bg-green-50/50 transition-all"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="p-4 bg-green-100 rounded-full">
              <Upload className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-slate-500">
                CSV file with employee data (name, email, phone)
              </p>
            </div>
            <Button variant="outline" className="mt-2">
              Select CSV File
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* File Info */}
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">{uploadedFile.name}</p>
              <p className="text-xs text-slate-500">
                {(uploadedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
            {uploadStatus === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            )}
            {uploadStatus === 'error' && (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
          </div>

          {/* Employee Count */}
          {uploadStatus === 'success' && !isGathering && !gatheringComplete && (
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200/60 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-900">
                  <span className="font-bold text-green-700 metric-number">{employeeCount}</span>
                  <span className="font-medium"> employee{employeeCount !== 1 ? 's' : ''} found</span>
                </div>
                <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white border-0 shadow-md gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Ready
                </Badge>
              </div>
            </div>
          )}

          {/* Data Gathering Progress */}
          {(isGathering || gatheringComplete) && (
            <div className="p-4 bg-white rounded-lg border border-green-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 mb-2">
                {isGathering && <Loader2 className="w-4 h-4 text-green-600 animate-spin" />}
                {gatheringComplete && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                <span className="text-sm font-semibold text-slate-900">
                  {isGathering ? 'OSINT (Open Source Intelligence)...' : 'OSINT (Open Source Intelligence)'}
                </span>
              </div>

              {/* Sources */}
              <div className="space-y-2">
                {['LinkedIn', 'Twitter', 'Facebook'].map((source) => {
                  const isCompleted = completedSources.includes(source);
                  const isLoading = isGathering && completedSources.length === ['LinkedIn', 'Twitter', 'Facebook'].indexOf(source);

                  return (
                    <div
                      key={source}
                      className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                        isCompleted ? 'bg-green-50' : 'bg-slate-50'
                      }`}
                    >
                      {isLoading && <Loader2 className="w-3 h-3 text-green-600 animate-spin" />}
                      {isCompleted && <CheckCircle2 className="w-3 h-3 text-green-600" />}
                      {!isLoading && !isCompleted && <div className="w-3 h-3 rounded-full border-2 border-slate-300" />}
                      <span className={`text-xs font-medium ${isCompleted ? 'text-green-700' : 'text-slate-500'}`}>
                        {source}
                      </span>
                    </div>
                  );
                })}
              </div>

              {gatheringComplete && (
                <div className="mt-3 p-2 bg-green-100 rounded-lg">
                  <p className="text-xs text-green-800 font-medium text-center">
                    ✓ Data from {completedSources.length} sources collected for {employeeCount} employee{employeeCount !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          )}
          {/* Gather Data Button */}
          {/* {uploadStatus === 'success' && employeeCount > 0 && (
            <Button
              onClick={handleGatherData}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md gap-2"
            >
              <Search className="w-4 h-4" />
              Gather Open Data
            </Button>
          )} */}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleRemoveFile}
              disabled={isGathering}
              className="flex-1 border-slate-300 hover:bg-slate-50"
            >
              Remove
            </Button>
            <Button
              onClick={handleGatherData}
              disabled={isGathering || gatheringComplete}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGathering ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Gathering...
                </>
              ) : gatheringComplete ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Data Gathered
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Gather Open Data
                </>
              )}
            </Button>
          </div>
        </div>
      )}
      </Card>

      {/* Example Employee Data - Show when gathering is complete */}
      {gatheringComplete && (
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200/60 shadow-sm hover:shadow-xl card-hover gradient-overlay group mt-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative">
              <User className="w-5 h-5 text-blue-600" />
              <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur-md -z-10"></div>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 tracking-tight">Example: Gathered Data</h3>
            <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
              Sample Employee
            </Badge>
          </div>

          <div className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-slate-600" />
                  <p className="text-xs font-medium text-slate-600">Name</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">{exampleEmployeeData.name}</p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Mail className="w-4 h-4 text-slate-600" />
                  <p className="text-xs font-medium text-slate-600">Email</p>
                </div>
                <p className="text-sm font-semibold text-slate-900 break-all">{exampleEmployeeData.email}</p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="w-4 h-4 text-slate-600" />
                  <p className="text-xs font-medium text-slate-600">Phone</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">{exampleEmployeeData.phone}</p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-4 h-4 text-slate-600" />
                  <p className="text-xs font-medium text-slate-600">Job Title</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">{exampleEmployeeData.jobTitle}</p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-4 h-4 text-slate-600" />
                  <p className="text-xs font-medium text-slate-600">Company</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">{exampleEmployeeData.company}</p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <p className="text-xs font-medium text-slate-600">Location</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">{exampleEmployeeData.location}</p>
              </div>
            </div>

            {/* Social Media Data */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* LinkedIn */}
              <div className="p-3 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-200/60 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">in</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900">LinkedIn</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-slate-600">
                    <span className="font-semibold text-blue-700">{exampleEmployeeData.linkedIn.connections}</span> connections
                  </p>
                  <div>
                    <p className="text-xs font-medium text-slate-600 mb-1">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {exampleEmployeeData.linkedIn.skills.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} className="bg-blue-100 text-blue-700 border-blue-200 text-[10px] px-1.5 py-0">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Twitter */}
              <div className="p-3 bg-gradient-to-br from-sky-50 to-white rounded-lg border border-sky-200/60 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-sky-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">𝕏</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900">Twitter/X</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-slate-600">
                    <span className="font-semibold text-sky-700">{exampleEmployeeData.twitter.followers}</span> followers
                  </p>
                  <div>
                    <p className="text-xs font-medium text-slate-600 mb-1">Recent:</p>
                    <p className="text-[10px] text-slate-700 italic line-clamp-2">
                      "{exampleEmployeeData.twitter.recentTweets[0]}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Facebook */}
              <div className="p-3 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-200/60 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">f</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900">Facebook</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-slate-600">
                    <span className="font-semibold text-indigo-700">{exampleEmployeeData.facebook.friends}</span> friends
                  </p>
                  <div>
                    <p className="text-xs font-medium text-slate-600 mb-1">Interests:</p>
                    <div className="flex flex-wrap gap-1">
                      {exampleEmployeeData.facebook.interests.slice(0, 3).map((interest, idx) => (
                        <Badge key={idx} className="bg-indigo-100 text-indigo-700 border-indigo-200 text-[10px] px-1.5 py-0">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200/60">
              <p className="text-xs text-slate-700 text-center">
                This is sample data gathered from public sources for <span className="font-semibold">{exampleEmployeeData.name}</span>
              </p>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
