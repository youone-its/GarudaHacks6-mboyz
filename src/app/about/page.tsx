"use client";

import { useState } from "react";
import { Menu, X, BookText as TikTok, Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/about/button";
import { Card, CardContent } from "@/components/ui/about/card";
import { Badge } from "@/components/ui/about/badge";
import ProfileCard from './ProfileCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const roles = [
  "All",
  "President", 
  "Vice President",
  "Secretary",
  "Treasurer",
  "Public Relations",
  "Events & Programs"
];

const teamMembers = [
  {
    id: 1,
    name: "Lorem Ipsum",
    role: "President",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 2,
    name: "Lorem Ipsum",
    role: "Vice President", 
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 3,
    name: "Lorem Ipsum",
    role: "Secretary",
    image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 4,
    name: "Lorem Ipsum",
    role: "Treasurer",
    image: "https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 5,
    name: "Lorem Ipsum",
    role: "Public Relations",
    image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: 6,
    name: "Lorem Ipsum", 
    role: "Events & Programs",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
  }
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("All");

  const filteredMembers = selectedRole === "All" 
    ? teamMembers 
    : teamMembers.filter(member => member.role === selectedRole);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/batik.svg')",
        backgroundRepeat: 'repeat',
        backgroundColor: '#388e3c',
        backgroundSize: '1000px'
      }}
    >
      <Navbar />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto pt-60 px-4 sm:px-6 lg:px-8 py-12">
        {/* About Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
              About Us
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              We are a dynamic organization dedicated to fostering social awareness and positive change among young leaders. Our mission is to empower the next generation of social realists who understand the importance of community engagement, social justice, and sustainable development in creating a better world for everyone.
            </p>
          </div>
        </section>
        {/* Team Section */}
        <section>
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Meet Our Team!
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              Our diverse team brings together passionate individuals from various backgrounds, united by a common vision of social progress and youth empowerment. Each member contributes unique skills and perspectives to our collective mission.
            </p>
          </div>
          {/* Role Filter */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg p-2 max-w-3xl mx-auto mb-12">
              <h3 className="text-xl font-semibold text-gray-900 text-center">Role Board of Executive</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {roles.map((role) => (
                <Badge
                  key={role}
                  variant={selectedRole === role ? "default" : "secondary"}
                  className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    selectedRole === role
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-gray-200 text-gray-700 hover:bg-green-100"
                  }`}
                  onClick={() => setSelectedRole(role)}
                >
                  {role}
                </Badge>
              ))}
            </div>
          </div>
          {/* Board of Executive */}
          <div className="mb-8">
        
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map((member) => (
                <ProfileCard
                  key={member.id}
                  name={member.name}
                  title={member.role}
                  handle={member.name.toLowerCase().replace(/\s/g, '')}
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl={member.image}
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => console.log('Contact clicked')}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}