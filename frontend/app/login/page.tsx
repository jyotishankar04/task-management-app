"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<"email" | "otp">("email")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setStep("otp")
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would validate the OTP and redirect to dashboard
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0B0B] p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </div>

        <div className="bg-[#161616] rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-md bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4]"></div>
            <span className="font-bold text-xl">TaskFlow</span>
          </div>

          <h1 className="text-2xl font-bold mb-6">
            {step === "email" ? "Log in to your account" : "Enter verification code"}
          </h1>

          {step === "email" ? (
            <form onSubmit={handleEmailSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#0F0F0F] border-gray-800 focus:border-[#3C82F6]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4] hover:opacity-90 transition-opacity"
                >
                  Continue with Email
                </Button>

                <div className="text-center">
                  <span className="text-gray-400">Don't have an account?</span>{" "}
                  <Link href="/register" className="text-[#3C82F6] hover:underline">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <p className="text-gray-400 mb-6">
                We've sent a verification code to <span className="text-white">{email}</span>
              </p>

              <div className="mb-6">
                <label htmlFor="otp-0" className="block text-sm font-medium mb-1">
                  Verification code
                </label>
                <div className="flex gap-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="bg-[#0F0F0F] border-gray-800 focus:border-[#3C82F6] text-center text-lg w-12 h-12"
                      required
                    />
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#3C82F6] to-[#8BAEF4] hover:opacity-90 transition-opacity"
              >
                Verify and Log In
              </Button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="text-[#3C82F6] hover:underline text-sm"
                >
                  Use a different email
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
