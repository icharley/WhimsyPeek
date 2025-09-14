import React, { useState, useEffect } from 'react'
import { Plus, LogOut, Sparkles } from 'lucide-react'
import { sessionsAPI } from '../services/api'
import SessionCard from './SessionCard'
import SessionModal from './SessionModal'
import PeekModal from './PeekModal'

const Dashboard = ({ user, onLogout }) => {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showSessionModal, setShowSessionModal] = useState(false)
  const [editingSession, setEditingSession] = useState(null)
  const [peekSession, setPeekSession] = useState(null)

  useEffect(() => {
    loadSessions()
  }, [])

  const loadSessions = async () => {
    try {
      const response = await sessionsAPI.getAll()
      setSessions(response.data)
    } catch (error) {
      console.error('Failed to load sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSession = () => {
    setEditingSession(null)
    setShowSessionModal(true)
  }

  const handleEditSession = (session) => {
    setEditingSession(session)
    setShowSessionModal(true)
  }

  const handleDeleteSession = async (sessionId) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        await sessionsAPI.delete(sessionId)
        setSessions(sessions.filter(s => s._id !== sessionId))
      } catch (error) {
        console.error('Failed to delete session:', error)
      }
    }
  }

  const handleSessionSaved = (savedSession) => {
    if (editingSession) {
      setSessions(sessions.map(s => s._id === savedSession._id ? savedSession : s))
    } else {
      setSessions([...sessions, savedSession])
    }
    setShowSessionModal(false)
    setEditingSession(null)
  }

  const handlePeek = (session) => {
    if (session.ideas.length === 0) {
      alert('This session has no ideas to peek at!')
      return
    }
    setPeekSession(session)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Whimsy Peek</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user.email}</span>
              <button
                onClick={onLogout}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Your Idea Sessions</h2>
            <p className="text-gray-600 mt-1">
              Create sessions and let whimsy guide your next adventure
            </p>
          </div>
          <button
            onClick={handleCreateSession}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Session
          </button>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-12">
            <Sparkles className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No sessions yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first idea session to get started with Whimsy Peek
            </p>
            <button
              onClick={handleCreateSession}
              className="btn-primary"
            >
              Create Your First Session
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <SessionCard
                key={session._id}
                session={session}
                onEdit={handleEditSession}
                onDelete={handleDeleteSession}
                onPeek={handlePeek}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {showSessionModal && (
        <SessionModal
          session={editingSession}
          onSave={handleSessionSaved}
          onClose={() => {
            setShowSessionModal(false)
            setEditingSession(null)
          }}
        />
      )}

      {peekSession && (
        <PeekModal
          session={peekSession}
          onClose={() => setPeekSession(null)}
        />
      )}
    </div>
  )
}

export default Dashboard