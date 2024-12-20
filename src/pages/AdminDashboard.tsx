import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Upload } from 'lucide-react';

export default function AdminDashboard() {
  const { token } = useParams();
  const isValidToken = token === sessionStorage.getItem('adminToken');

  if (!isValidToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h2>
        <p className="text-purple-200 mb-4">
          Use the CLI command to upload songs. This page serves as a verification that your admin access is working.
        </p>
        
        <div className="bg-black/30 rounded-lg p-4 text-purple-300">
          <code>npm run admin</code>
        </div>

        <div className="mt-8 flex items-center justify-center p-8 border-2 border-dashed border-purple-500/50 rounded-lg">
          <div className="text-center">
            <Upload className="w-12 h-12 text-purple-400 mx-auto mb-2" />
            <p className="text-purple-200">Use the CLI to upload songs</p>
          </div>
        </div>
      </div>
    </div>
  );
}