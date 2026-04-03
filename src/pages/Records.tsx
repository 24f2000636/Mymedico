import { useState } from 'react';
import { FileText, Upload, Download, Search, Eye, Filter, MoreVertical, CheckCircle, FileImage, File } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Records() {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');

  const records = [
    {
      id: 1,
      title: 'Complete Blood Count (CBC)',
      type: 'Lab Report',
      date: 'Oct 20, 2026',
      doctor: 'Dr. Sarah Smith',
      size: '2.4 MB',
      fileType: 'pdf',
      status: 'verified'
    },
    {
      id: 2,
      title: 'Chest X-Ray Results',
      type: 'Imaging',
      date: 'Sep 12, 2026',
      doctor: 'Dr. Marcus Johnson',
      size: '5.1 MB',
      fileType: 'image',
      status: 'verified'
    },
    {
      id: 3,
      title: 'Annual Wellness Summary',
      type: 'Clinical Note',
      date: 'Jan 05, 2026',
      doctor: 'Dr. Emily Chen',
      size: '1.2 MB',
      fileType: 'doc',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Lipid Panel',
      type: 'Lab Report',
      date: 'Nov 15, 2025',
      doctor: 'Dr. Sarah Smith',
      size: '1.8 MB',
      fileType: 'pdf',
      status: 'verified'
    }
  ];

  const filteredRecords = records.filter(record => 
    record.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    record.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'pdf': return <FileText className="w-8 h-8 text-red-500" />;
      case 'image': return <FileImage className="w-8 h-8 text-blue-500" />;
      default: return <File className="w-8 h-8 text-slate-500" />;
    }
  };

  return (
    <div className="h-full max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 font-poppins">Medical Records</h1>
          <p className="text-slate-500 mt-2">Access and manage your health documents securely</p>
        </div>
        
        {user?.role === 'patient' && (
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md hover:border-primary-300 transition-all flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary-500" />
            Upload New Record
          </button>
        )}
      </div>

      <div className="glass-card p-4 flex flex-col md:flex-row gap-4 justify-between items-center border-slate-200/60 z-10 relative">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search records, types, or doctors..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-medium text-sm flex-1 md:flex-none justify-center shadow-sm">
            <Filter className="w-4 h-4" /> Filter by Type
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-medium text-sm flex-1 md:flex-none justify-center shadow-sm">
            Sort by Date
          </button>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200/50">
                <th className="p-4 font-semibold">Document Name</th>
                <th className="p-4 font-semibold">Type</th>
                <th className="p-4 font-semibold">Date Uploaded</th>
                <th className="p-4 font-semibold">Uploaded By</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 shadow-sm">
                          {getFileIcon(record.fileType)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{record.title}</p>
                          <p className="text-xs text-slate-500">{record.size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200">
                        {record.type}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 font-medium">{record.date}</td>
                    <td className="p-4 text-slate-600">{record.doctor}</td>
                    <td className="p-4">
                      {record.status === 'verified' ? (
                        <div className="flex items-center gap-1.5 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-xs font-semibold">Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-600">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                          <span className="text-xs font-semibold">Pending Review</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="View">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-secondary-600 hover:bg-secondary-50 rounded-lg transition-colors" title="Download">
                          <Download className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No medical records found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Cloud Storage Integration Note */}
      <div className="mt-8 p-4 bg-secondary-50 border border-secondary-200 rounded-2xl flex items-start gap-4 shadow-sm">
        <div className="p-3 bg-white rounded-xl shadow-sm">
          <img src="https://www.gstatic.com/devrel-devsite/prod/v2.10.1/firebase/images/touchicon-180.png" alt="Firebase" className="w-6 h-6 object-contain" />
        </div>
        <div>
          <h4 className="font-semibold text-secondary-900">Google Cloud Storage Integration</h4>
          <p className="text-sm text-secondary-700 mt-1">All medical records are securely encrypted and stored using Google Cloud Storage, ensuring HIPAA compliance and high availability.</p>
        </div>
      </div>
    </div>
  );
}
