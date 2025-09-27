import { Card, CardContent } from '@/components/ui/card'
import { Award, Users, Coffee, Zap } from 'lucide-react'
import Image from 'next/image'

export default function About() {
  const stats = [
    { icon: Award, label: 'Years Experience', value: '5+' },
    { icon: Users, label: 'Happy Clients', value: '50+' },
    { icon: Coffee, label: 'Projects Completed', value: '100+' },
    { icon: Zap, label: 'Technologies Mastered', value: '20+' },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Me</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Passionate about creating exceptional digital experiences through innovative solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
                alt="About Me"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl -z-10"></div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                I'm a passionate developer who loves to create amazing digital experiences
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                With over 5 years of experience in web development, I specialize in creating 
                modern, responsive, and user-friendly applications. My journey started with a 
                curiosity about how websites work, and it has evolved into a passion for crafting 
                digital solutions that make a difference.
              </p>
              <p className="text-gray-600 leading-relaxed">
                I believe in the power of clean code, beautiful design, and seamless user experiences. 
                When I'm not coding, you can find me exploring new technologies, contributing to 
                open-source projects, or sharing my knowledge with the developer community.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-4 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}