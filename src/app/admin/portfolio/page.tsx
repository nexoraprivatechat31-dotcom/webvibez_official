"use client";

import React, { useEffect, useState } from "react";
import { Plus, Eye, Edit3, Globe, Smartphone, LayoutTemplate, Trash2, AlertTriangle, Inbox } from "lucide-react";

interface Project {
  id: string;
  title: string;
  type: string;
  tech_stack: string;
  image_url: string | null;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/portfolio");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      } else {
        setError(data.error || "Failed to load projects");
      }
    } catch (err) {
      setError("Network error loading projects");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/portfolio?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter(p => p.id !== id));
      } else {
        alert("Failed to delete project");
      }
    } catch (err) {
      alert("Error deleting project");
    }
  };

  const getIcon = (type: string) => {
    if (type.toLowerCase().includes("mobile")) return <Smartphone className="w-6 h-6 text-emerald-500" />;
    if (type.toLowerCase().includes("software")) return <LayoutTemplate className="w-6 h-6 text-purple-500" />;
    return <Globe className="w-6 h-6 text-[#0066FF]" />;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">Portfolio Projects</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Manage and showcase your best software development work.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0066FF] hover:bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 transition-all duration-300">
          <Plus className="w-5 h-5" /> Add New Project
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 text-slate-400">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-bold">Loading Projects...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-32 text-rose-500">
          <AlertTriangle className="w-8 h-8 mb-4" />
          <p className="font-bold">{error}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-slate-400">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Inbox className="w-8 h-8" />
          </div>
          <p className="font-bold text-slate-600 dark:text-slate-300">No projects found</p>
          <p className="text-sm mt-1">Click 'Add New Project' to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group bg-white dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-2xl hover:shadow-[#0066FF]/5 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col relative cursor-default">
              {/* Subtle Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="h-44 bg-slate-100 dark:bg-slate-950/50 relative overflow-hidden flex items-center justify-center">
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10" />
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center relative z-20 group-hover:scale-110 transition-transform duration-500 border border-slate-200/50 dark:border-slate-700/50">
                      {getIcon(project.type)}
                    </div>
                  </>
                )}
                
                {/* Delete Button overlaid on image hover */}
                <button 
                  onClick={() => deleteProject(project.id)}
                  className="absolute top-4 right-4 z-30 p-2 bg-red-500 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 hover:bg-red-600 active:scale-90 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-6 flex-1 flex flex-col relative z-10">
                <span className="inline-block px-2.5 py-1 bg-blue-50 text-[#0066FF] dark:bg-blue-900/30 dark:text-[#38BDF8] rounded-md text-[10px] uppercase font-bold tracking-widest w-fit mb-3">{project.type}</span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display mb-1.5 leading-tight">{project.title}</h3>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-6 flex-1 leading-relaxed line-clamp-2">{project.tech_stack}</p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <button className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600">
                    <Edit3 className="w-4 h-4" /> Edit
                  </button>
                  <button className="flex-1 py-2.5 bg-[#0066FF]/5 hover:bg-[#0066FF]/10 dark:bg-[#0066FF]/10 dark:hover:bg-[#0066FF]/20 text-[#0066FF] dark:text-[#38BDF8] rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all border border-transparent">
                    <Eye className="w-4 h-4" /> View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
