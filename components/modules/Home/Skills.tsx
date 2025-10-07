import { Code2, Database, Palette, Smartphone } from 'lucide-react';

const skills = [
  {
    category: "Frontend",
    icon: <Code2 className="w-8 h-8" />,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    category: "Backend",
    icon: <Database className="w-8 h-8" />,
    skills: ["Node.js", "Express.js", "PostgreSQL", "MongoDB"]
  },
  {
    category: "CMS",
    icon: <Palette className="w-8 h-8" />,
    skills: ["Wordpress", "Shopify"]
  },
  {
    category: "Mobile",
    icon: <Smartphone className="w-8 h-8" />,
    skills: ["React Native"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Skills & Technologies
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {skills.map((skillGroup, index) => (
            <div 
              key={index}
              className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-blue-500 transition-colors"
            >
              <div className="text-blue-400 mb-4">{skillGroup.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2">
                {skillGroup.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="text-gray-300 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}