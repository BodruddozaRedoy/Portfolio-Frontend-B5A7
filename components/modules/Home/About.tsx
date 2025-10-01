export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          About Me
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <div className="w-72 h-72 bg-gray-800 rounded-full flex items-center justify-center text-gray-400">
                Your Photo
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Crafting Digital Experiences
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm a passionate full-stack developer with over 5 years of experience 
              creating web applications that solve real-world problems. I specialize 
              in modern JavaScript frameworks and love working on projects that 
              challenge me to grow.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              When I'm not coding, you can find me contributing to open-source projects, 
              writing technical blogs, or exploring new technologies in the ever-evolving 
              web development landscape.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-gray-300">
                <p><strong className="text-white">Name:</strong> Bodruddoza Redoy</p>
                <p><strong className="text-white">Email:</strong> bodruddozaredoy@gmail.com</p>
                <p><strong className="text-white">Location:</strong> Mirpur, Dhaka, Bangladesh</p>
              </div>
              <div className="text-gray-300">
                <p><strong className="text-white">Learning Experience:</strong> 2+ Years</p>
                <p><strong className="text-white">Professional Experience:</strong> 5+ Months</p>
                <p><strong className="text-white">Available for work: </strong>Hybrid</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}