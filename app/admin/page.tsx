'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Project>({
    id: '',
    title: '',
    description: '',
    technologies: [],
    link: '',
  });
  const [techInput, setTechInput] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError('Error loading projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!newProject.title || !newProject.description) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) throw new Error('Failed to create project');

      const createdProject = await response.json();
      setProjects([createdProject, ...projects]);
      
      // Reset form
      setNewProject({
        id: '',
        title: '',
        description: '',
        technologies: [],
        link: '',
      });
      
      // Show success message
      setSuccessMessage('Project added successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Error creating project');
      console.error(err);
    }
  };

  const handleAddTechnology = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, techInput.trim()]
      });
      setTechInput('');
    }
  };

  const removeTechnology = (indexToRemove: number) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((_, index) => index !== indexToRemove)
    });
  };

  const removeProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete project');

      setProjects(projects.filter(project => project.id !== id));
      setSuccessMessage('Project removed successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Error deleting project');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-gray-700 rounded w-3/4"></div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-700 rounded-xl p-6 space-y-4">
                <div className="h-6 bg-gray-600 rounded w-1/2"></div>
                <div className="h-4 bg-gray-600 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
          Admin Dashboard
        </h1>
        <button
          onClick={() => router.push('/projects')}
          className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
        >
          Back to Projects
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400">
          {successMessage}
        </div>
      )}

      <div className="bg-[#2a2a2a] rounded-xl border border-white/10 overflow-hidden">
        <div className="flex border-b border-white/10">
          <button
            className={`px-6 py-4 ${
              activeTab === 'projects'
                ? 'bg-blue-500/20 text-blue-400'
                : 'text-gray-400 hover:text-white'
            } transition-colors`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={`px-6 py-4 ${
              activeTab === 'skills'
                ? 'bg-blue-500/20 text-blue-400'
                : 'text-gray-400 hover:text-white'
            } transition-colors`}
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </button>
          <button
            className={`px-6 py-4 ${
              activeTab === 'about'
                ? 'bg-blue-500/20 text-blue-400'
                : 'text-gray-400 hover:text-white'
            } transition-colors`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'projects' && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Current Projects</h2>
                {projects.map((project) => (
                  <div 
                    key={project.id}
                    className="bg-black/30 p-4 rounded-lg border border-white/10 flex justify-between items-start"
                  >
                    <div>
                      <h3 className="text-white font-semibold">{project.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{project.technologies.join(', ')}</p>
                    </div>
                    <button
                      onClick={() => removeProject(project.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddProject} className="space-y-6">
                <h2 className="text-xl font-bold text-white">Add New Project</h2>
                <div>
                  <label className="block text-white mb-2">Project Title</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full px-4 py-2 bg-black/30 rounded-lg border border-white/10 
                             focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20
                             text-white placeholder-gray-500"
                    placeholder="Enter project title"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full px-4 py-2 bg-black/30 rounded-lg border border-white/10 
                             focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20
                             text-white placeholder-gray-500 h-32"
                    placeholder="Enter project description"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2">Technologies (Press Enter to add)</label>
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={handleAddTechnology}
                    className="w-full px-4 py-2 bg-black/30 rounded-lg border border-white/10 
                             focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20
                             text-white placeholder-gray-500"
                    placeholder="Enter technology and press Enter"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(index)}
                          className="ml-2 hover:text-blue-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white mb-2">Project Link</label>
                  <input
                    type="text"
                    value={newProject.link}
                    onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                    className="w-full px-4 py-2 bg-black/30 rounded-lg border border-white/10 
                             focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20
                             text-white placeholder-gray-500"
                    placeholder="Enter project link"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 
                           transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  Add Project
                </button>
              </form>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="text-gray-300">
              Skills management section coming soon...
            </div>
          )}

          {activeTab === 'about' && (
            <div className="text-gray-300">
              About section management coming soon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 