import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import { Music } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900">
        <nav className="bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3 flex items-center">
            <div className="flex items-center space-x-2">
              <Music className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">Funk Vault</h1>
            </div>
          </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/:token" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}