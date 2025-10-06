'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Bodruddoza Redoy
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
            Full Stack Developer & App Developer
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            I create digital experiences that are fast, accessible, visually appealing,
            and responsive. Let's build something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <a href="#projects">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                View My Work
              </Button>
            </a>
            <a target='__blank' href="https://drive.google.com/file/d/10Kwe-En0pNqoT9vwGKWp2324ynC8q-0b/view?usp=sharing">
              <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3">
                Download Resume
              </Button>
            </a>
          </div>

          <div className="flex justify-center space-x-6 mb-16">
            <a href="https://github.com/BodruddozaRedoy" className="text-gray-400 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/bodruddozaredoy-637789197/" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:bodruddozaredoy@gmail.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail size={24} />
            </a>
          </div>

          <div className="animate-bounce">
            <ArrowDown className="mx-auto text-gray-400" size={32} />
          </div>
        </div>
      </div>
    </section>
  );
}