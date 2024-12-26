export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
        Welcome to My Blog
      </h1>
      <p className="text-lg text-gray-300 mb-12">
        Hi! I&apos;m a developer sharing my journey and projects. Feel free to explore my work and learn more about me.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#2a2a2a] p-8 rounded-xl shadow-lg border border-white/10 hover:border-blue-500/50 transition-colors">
          <h2 className="text-2xl font-bold mb-4 text-white">About Me</h2>
          <p className="text-gray-300 mb-6">
            Learn more about my background, skills, and interests.
          </p>
          <a 
            href="/about" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            Read More 
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div className="bg-[#2a2a2a] p-8 rounded-xl shadow-lg border border-white/10 hover:border-blue-500/50 transition-colors">
          <h2 className="text-2xl font-bold mb-4 text-white">My Projects</h2>
          <p className="text-gray-300 mb-6">
            Check out some of my recent work and side projects.
          </p>
          <a 
            href="/projects" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            View Projects
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
