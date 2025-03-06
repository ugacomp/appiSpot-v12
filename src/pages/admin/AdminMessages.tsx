import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Mail, Phone, Calendar, MapPin, User, TrendingUp, Send, X, MessageSquare, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock messages data
const mockMessages = [
  {
    id: 1,
    sender: {
      name: 'John Smith',
      role: 'guest',
      avatar: 'JS'
    },
    title: 'Question about my booking #BK001',
    content: 'Hi, I need to make some changes to my upcoming booking. Is it possible to modify the time?',
    preview: 'Hi, I need to make some changes to my upcoming booking. Is it possible to...',
    time: '5 min ago',
    unread: true,
    thread: [
      {
        id: 1,
        sender: {
          name: 'John Smith',
          role: 'guest',
          avatar: 'JS'
        },
        content: 'Hi, I need to make some changes to my upcoming booking. Is it possible to modify the time?',
        timestamp: '2025-02-19T10:30:00'
      },
      {
        id: 2,
        sender: {
          name: 'Admin',
          role: 'admin',
          avatar: 'A'
        },
        content: 'Hello John, I can help you with that. What changes would you like to make to your booking?',
        timestamp: '2025-02-19T10:35:00'
      },
      {
        id: 3,
        sender: {
          name: 'John Smith',
          role: 'guest',
          avatar: 'JS'
        },
        content: 'I would like to move it from 2 PM to 4 PM if possible.',
        timestamp: '2025-02-19T10:40:00'
      }
    ]
  },
  {
    id: 2,
    sender: {
      name: 'Sarah Johnson',
      role: 'host',
      avatar: 'SJ'
    },
    title: 'Need help with refund request',
    content: "Hello, one of my guests has requested a refund and I'm not sure how to process it. Can you help?",
    preview: "Hello, one of my guests has requested a refund and I'm not sure how to...",
    time: '1 hour ago',
    unread: true,
    thread: [
      {
        id: 1,
        sender: {
          name: 'Sarah Johnson',
          role: 'host',
          avatar: 'SJ'
        },
        content: "Hello, one of my guests has requested a refund and I'm not sure how to process it. Can you help?",
        timestamp: '2025-02-19T09:15:00'
      }
    ]
  },
  {
    id: 3,
    sender: {
      name: 'Michael Brown',
      role: 'guest',
      avatar: 'MB'
    },
    title: 'Thanks for the quick response!',
    content: 'Thank you for helping me with the booking issue. Everything is resolved now.',
    preview: 'Thank you for helping me with the booking issue. Everything is resolved now.',
    time: '2 hours ago',
    unread: false,
    thread: [
      {
        id: 1,
        sender: {
          name: 'Michael Brown',
          role: 'guest',
          avatar: 'MB'
        },
        content: 'Thank you for helping me with the booking issue. Everything is resolved now.',
        timestamp: '2025-02-19T08:45:00'
      }
    ]
  }
];

const AdminMessages = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    dateRange: ''
  });

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    
    toast.success('Reply sent successfully');
    setReplyText('');
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'host':
        return 'bg-purple-100 text-purple-800';
      case 'guest':
        return 'bg-blue-100 text-blue-800';
      case 'admin':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvatarBgColor = (role: string) => {
    switch (role) {
      case 'host':
        return 'bg-purple-500';
      case 'guest':
        return 'bg-blue-500';
      case 'admin':
        return 'bg-[#2DD4BF]';
      default:
        return 'bg-gray-500';
    }
  };

  const selectedMessageData = selectedMessage !== null ? mockMessages.find(m => m.id === selectedMessage) : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-4 sm:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                >
                  <option value="">All</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                >
                  <option value="">All</option>
                  <option value="guest">Guest Messages</option>
                  <option value="host">Host Messages</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                  className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                >
                  <option value="">All Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Message List */}
            <div className={`border-r border-gray-200 ${selectedMessage ? 'hidden lg:block' : ''}`}>
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message.id)}
                  className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                    message.unread ? 'bg-[#2DD4BF]/5' : ''
                  } ${selectedMessage === message.id ? 'bg-gray-100' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`h-10 w-10 rounded-full ${getAvatarBgColor(message.sender.role)} flex items-center justify-center`}>
                        <span className="text-white font-medium">{message.sender.avatar}</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900">{message.sender.name}</h3>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getRoleBadgeColor(message.sender.role)}`}>
                            {message.sender.role.charAt(0).toUpperCase() + message.sender.role.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{message.time}</p>
                      </div>
                    </div>
                    {message.unread && (
                      <span className="h-2 w-2 bg-[#2DD4BF] rounded-full"></span>
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-900">{message.title}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{message.preview}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Thread */}
            {selectedMessageData ? (
              <div className="lg:col-span-2">
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setSelectedMessage(null)}
                        className="lg:hidden text-gray-600 hover:text-gray-900"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </button>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h2 className="text-lg font-semibold text-gray-900">{selectedMessageData.sender.name}</h2>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getRoleBadgeColor(selectedMessageData.sender.role)}`}>
                            {selectedMessageData.sender.role.charAt(0).toUpperCase() + selectedMessageData.sender.role.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{selectedMessageData.title}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {selectedMessageData.thread.map((msg) => (
                      <div key={msg.id} className="flex items-start space-x-3">
                        <div className={`h-8 w-8 rounded-full ${getAvatarBgColor(msg.sender.role)} flex items-center justify-center`}>
                          <span className="text-white text-sm font-medium">
                            {msg.sender.avatar}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900">{msg.sender.name}</span>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getRoleBadgeColor(msg.sender.role)}`}>
                              {msg.sender.role.charAt(0).toUpperCase() + msg.sender.role.slice(1)}
                            </span>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm text-gray-900">{msg.content}</p>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">
                            {new Date(msg.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleReply}>
                      <div className="flex items-end space-x-4">
                        <div className="flex-1">
                          <label htmlFor="reply" className="sr-only">Reply</label>
                          <textarea
                            id="reply"
                            rows={3}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-[#2DD4BF] focus:border-[#2DD4BF] resize-none"
                            placeholder="Type your reply..."
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2DD4BF] hover:bg-[#26b8a5]"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex lg:col-span-2 items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">Select a message</h3>
                  <p className="mt-1 text-gray-500">Choose a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;