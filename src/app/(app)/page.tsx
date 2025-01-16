'use client'

import React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import  messages from '@/messages.json'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'



const Home = () => {
  return (
    <>
    <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
      <section className="text-center mb-8 md:mb-12">
        {/* <h1 className="text-3xl md:text-5xl font-bold">Drop the Mask, Spill the Tea – Go Anonymous with Houdini!</h1> */}
        <h1  className="text-3xl md:text-5xl font-bold">Whisper Away, Houdini’s Here to Play!</h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">Explore Houdini - where your identity remains a secret.</p>
      </section>

      <Carousel 
      plugins={[Autoplay({delay:3000 })]}
      className="w-full max-w-xs">
      <CarouselContent>
        {
          messages.map((message, index)=> (
            <CarouselItem key={index}>
            <div className="p-1">
              <CardHeader>
                {message.title}
              </CardHeader>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-lg font-semibold">{message.content}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </main>
    
    {/* <footer>
    © 2025 . All rights reserved.
    </footer> */}
  
  <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">About Houdini</h3>
          <p className="text-sm leading-relaxed">
            Houdini is your go-to anonymous messaging app designed to let you connect, share, and express yourself without revealing your identity. Stay real, stay anonymous – join the magic!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:underline hover:text-gray-100">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline hover:text-gray-100">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline hover:text-gray-100">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="hover:underline hover:text-gray-100">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/contact-support" className="hover:underline hover:text-gray-100">
                Contact Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Stay Connected</h3>
          <p className="text-sm mb-6 leading-relaxed">
            Follow us for updates, tips, and exclusive features:
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-gray-100"
              >
                Instagram: @HoudiniApp
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-gray-100"
              >
                Twitter: @HoudiniApp
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-gray-100"
              >
                Facebook: HoudiniApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        <p className="mb-2">
          © 2025 <span className="font-bold text-white">Houdini</span>. All Rights Reserved.
        </p>
        <p className="text-gray-400">Made with ❤️ for the free-spirited thinkers.</p>
      </div>
    </footer>
    
    </>
  )
}

export default Home