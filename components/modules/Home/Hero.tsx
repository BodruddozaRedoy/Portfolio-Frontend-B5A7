'use client'

import { Button } from '@/components/ui/button'
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 fill=%27none%27%3E%3Cpath d=%27m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27 fill=%27%236366f1%27 fill-opacity=%270.05%27/%3E%3C/svg%3E")] opacity-40'
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-20">
          {/* Left content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <div className="mb-6">
              <p className="text-blue-600 font-semibold mb-2 animate-fade-in-up">
                Hello, I'm
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 animate-fade-in-up animation-delay-200">
                John{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Doe
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-6 animate-fade-in-up animation-delay-400">
                Full Stack Developer & UI/UX Designer
              </p>
              <p className="text-gray-500 max-w-xl animate-fade-in-up animation-delay-600">
                I create beautiful, functional, and user-centered digital
                experiences. With expertise in modern web technologies, I bring
                ideas to life through code.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up animation-delay-800">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
              <Button variant="outline" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>

            {/* Social links */}
            <div className="flex justify-center lg:justify-start space-x-4 animate-fade-in-up animation-delay-1000">
              <a
                href="#"
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
              >
                <Github className="w-5 h-5 text-gray-600 hover:text-gray-900" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5 text-gray-600 hover:text-blue-600" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-5 h-5 text-gray-600 hover:text-red-500" />
              </a>
            </div>
          </div>

          {/* Right image */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 absolute -inset-4 animate-pulse"></div>
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden relative z-10 shadow-2xl">
                <Image
                //   src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg"
                  alt="John Doe"
                  fill={true}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Arrow down */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about">
            <ArrowDown className="w-6 h-6 text-gray-400" />
          </a>
        </div>
      </div>
    </section>
  )
}
