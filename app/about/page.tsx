export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-12 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
        About Me
      </h1>
      
      <div className="space-y-12">
        <section className="bg-[#2a2a2a] p-8 rounded-xl border border-white/10">
          <h2 className="text-2xl font-bold mb-4 text-white">Introduction</h2>
          <p className="text-gray-300">
            Welcome to my blog! I&apos;m a passionate developer who loves to create and learn new things.
            [Edit this section to tell your story]
          </p>
        </section>

        <section className="bg-[#2a2a2a] p-8 rounded-xl border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-white">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/5 hover:border-blue-500/50 transition-colors">
              Web Development
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/5 hover:border-blue-500/50 transition-colors">
              JavaScript/TypeScript
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/5 hover:border-blue-500/50 transition-colors">
              React & Next.js
            </div>
          </div>
        </section>

        <section className="bg-[#2a2a2a] p-8 rounded-xl border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-white">Experience</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500/50 pl-6 hover:border-blue-400 transition-colors">
              <h3 className="text-xl font-semibold text-white">Your Current Role</h3>
              <p className="text-gray-300 mt-2">
                [Add your experience details here]
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#2a2a2a] p-8 rounded-xl border border-white/10">
          <h2 className="text-2xl font-bold mb-4 text-white">Contact</h2>
          <p className="text-gray-300">
            Feel free to reach out to me at [your contact information]
          </p>
        </section>
      </div>
    </div>
  );
} 