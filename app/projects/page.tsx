'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

// Static project data
const projectsData: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Chat Application',
    description: 'A real-time chat application with AI-powered features like message translation, sentiment analysis, and smart replies.',
    technologies: ['React', 'TypeScript', 'WebSocket', 'Natural Language Processing'],
    link: 'https://github.com/yourusername/chat-app'
  },
  {
    id: '2',
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform with features like product search, cart management, and secure payment processing.',
    technologies: ['Next.js', 'Tailwind CSS', 'Stripe', 'Redux'],
    link: 'https://github.com/yourusername/ecommerce'
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A weather dashboard that shows current conditions and forecasts for multiple locations with interactive maps.',
    technologies: ['React', 'OpenWeather API', 'Mapbox', 'Chart.js'],
    link: 'https://github.com/yourusername/weather-app'
  }
];

export default function Projects() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Handle admin navigation
  if (searchQuery.toLowerCase() === 'admin') {
    router.push('/admin');
    return null;
  }

  // Filter projects based on search query
  const filteredProjects = projectsData.filter(project => {
    const searchTerm = searchQuery.toLowerCase();
    if (searchTerm === 'admin') return false;
    return (
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-12 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
        My Projects
      </h1>

      <div className="relative mb-12 group">
        <input
          type="text"
          placeholder="Search projects by name, description, or technology..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-4 bg-[#2a2a2a]/50 rounded-xl border border-white/10 
                   focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20
                   text-white placeholder-gray-400 transition-all duration-300"
        />
        <svg 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      
      <div className="grid gap-8">
        {filteredProjects.length === 0 && searchQuery.toLowerCase() !== 'admin' ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found matching your search criteria.</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-[#2a2a2a] p-8 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/10"
            >
              <h2 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                {project.title}
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-white">Technologies Used:</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-white/5 px-4 py-2 rounded-lg text-sm border border-white/5 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={project.link}
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group-hover:translate-x-2 duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 