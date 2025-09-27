'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React/Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'Vue.js', level: 80 },
      ]
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 80 },
      ]
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git/GitHub', level: 95 },
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 75 },
        { name: 'Figma', level: 85 },
      ]
    }
  ]

  const technologies = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Node.js', 
    'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'GCP',
    'Tailwind CSS', 'SCSS', 'GraphQL', 'REST APIs', 'Socket.io', 'Jest',
    'Cypress', 'Figma', 'Adobe XD', 'Git', 'Linux'
  ]

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Skills</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-center">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-4 py-2 text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-default"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}