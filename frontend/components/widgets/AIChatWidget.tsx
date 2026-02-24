'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || ''

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp?: string
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [leadScore, setLeadScore] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generate or retrieve session ID
    const storedSessionId = localStorage.getItem('lexa_chat_session')
    if (storedSessionId) {
      setSessionId(storedSessionId)
      loadSession(storedSessionId)
    } else {
      const newSessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      setSessionId(newSessionId)
      localStorage.setItem('lexa_chat_session', newSessionId)
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadSession = async (sid: string) => {
    try {
      const response = await fetch(`${API_URL}/api/ai-chat/session/${sid}`)
      if (response.ok) {
        const data = await response.json()
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages)
          setLeadScore(data.lead_score || 0)
        }
      }
    } catch (error) {
      console.error('Failed to load chat session:', error)
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/ai-chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          message: userMessage
        })
      })

      const data = await response.json()
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response || "I'm here to help! Could you tell me more about your smart home needs?"
      }])
      setLeadScore(data.lead_score || 0)
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble connecting. Please try our Smart Project Builder or contact us via WhatsApp!"
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([])
    const newSessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setSessionId(newSessionId)
    localStorage.setItem('lexa_chat_session', newSessionId)
  }

  return (
    <>
      {/* Chat Button - Visible on all devices */}
      <motion.button
        data-testid="ai-chat-button"
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 sm:bottom-28 right-4 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform ${isOpen ? 'hidden' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        title="AI Assistant"
      >
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-testid="ai-chat-widget"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-4 right-4 z-50 w-[380px] max-w-[calc(100vw-32px)] h-[600px] max-h-[calc(100vh-100px)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">LEXA AI</h3>
                  <p className="text-xs text-white/80">Smart Home Consultant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Welcome to LEXA AI!</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    I'm your smart home consultant. Ask me anything about home automation!
                  </p>
                  <div className="space-y-2">
                    {[
                      "What smart home features do you recommend for a villa?",
                      "How much does home automation cost in Dubai?",
                      "I want to automate my lighting and climate"
                    ].map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(suggestion)}
                        className="block w-full text-left text-sm px-3 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors dark:text-gray-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user' ? 'bg-blue-600' : 'bg-gradient-to-r from-purple-600 to-blue-600'
                    }`}>
                      {msg.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`px-4 py-2 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-sm' 
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-sm shadow-sm border border-gray-100 dark:border-gray-600'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 dark:border-gray-600">
                    <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Thinking...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Lead Score Indicator */}
            {leadScore > 0 && (
              <div className="px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Conversation Progress</span>
                  <span className="font-medium text-green-600">{leadScore}% Complete</span>
                </div>
                <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${leadScore}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about smart home solutions..."
                  className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 text-sm bg-white dark:bg-gray-800 dark:text-white"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <button 
                  onClick={clearChat}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear chat
                </button>
                <span className="text-xs text-gray-400">
                  Powered by LEXA AI
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
