"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, PlusCircle, FolderOpen } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Developer";

  return (
    <section className="min-h-screen bg-gray-900 text-gray-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Welcome Back, <span className="text-blue-500">{userName}</span> 👋
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Here’s a quick overview of your projects, blogs, and stats.  
            Manage your content efficiently and keep building amazing things!
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 items-center justify-center gap-6 mb-12">
          {/* <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
            <CardHeader className="flex items-center gap-3">
              <div className="bg-blue-600/20 p-3 rounded-lg">
                <LayoutDashboard className="w-6 h-6 text-blue-400" />
              </div>
              <CardTitle className="text-lg text-white">Dashboard Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                View stats, progress, and recent activities across your portfolio.
              </p>
              <Link href="/dashboard/overview">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  View Overview
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card> */}

          <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
            <CardHeader className="flex items-center gap-3">
              <div className="bg-green-600/20 p-3 rounded-lg">
                <PlusCircle className="w-6 h-6 text-green-400" />
              </div>
              <CardTitle className="text-lg text-white">Create New</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Add new projects or publish blogs directly from your dashboard.
              </p>
              <Link href="/dashboard/blogs">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  New Blog
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
            <CardHeader className="flex items-center gap-3">
              <div className="bg-purple-600/20 p-3 rounded-lg">
                <FolderOpen className="w-6 h-6 text-purple-400" />
              </div>
              <CardTitle className="text-lg text-white">Manage Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Access and edit your existing projects with ease and precision.
              </p>
              <Link href="/dashboard/projects">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  Go to Projects
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">Ready to create something new?</p>
          <Link href="/dashboard/blogs/create">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6">
              Start Creating
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
