import React, { useState } from 'react';
import { MessageSquare, Send, X, Search } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock messages data
const mockMessages = [
  {
    id: 1,
    sender: {
      name: 'Sarah Wilson',
      role: 'host',
      avatar: 'SW'
    },
    title: 'Question about your upcoming booking',
    content: 'Hi, I wanted to confirm some details about your booking for next week.',
    preview: 'Hi, I wanted to confirm some details about your booking for next week.',
    time: '5 min ago',
    unread: true,
    thread: [
      {
        id: 1,
        sender: {
          name: 'Sarah Wilson',
          role: 'host',
          avatar: 'SW'
        },
        content: 'Hi, I wanted to confirm some details about your booking for next week.',
        timestamp: '2025-02-19T10:30:00'
      }
    ]
  },
  {
    id: 2,
    sender: {
      name: 'Support Team',
      role: 'support',
      avatar: 'ST'
    },
    title: 'Welcome to appiSpot!',
    content: "Welcome to appiSpot! We're excited to have you here. If you need any assistance, don't hesitate to reach out.",
    preview: "Welcome to appiSpot! We're excited to have you here...",
    time: '1 hour ago',
    unread: true,
    thread: [
      {
        id: 1,
        sender: {
          name: 'Support Team',
          role: 'support',
          avatar: 'ST'
        },
        content: "Welcome to appiSpot! We're excited to have you here. If you need any assistance, don't hesitate to reach out.",
        timestamp: '2025-02-19T09:15:00'
      }
    ]
  },
  {
    id: 3,
    sender: {
      name: 'Michael Brown',
      role: 'host',
      avatar: 'MB'
    },
    title: 'Thanks for your booking!',
    content: 'Thank you for booking my venue. Looking forward to hosting your event!',
    preview: 'Thank you for booking my venue. Looking forward to hosting your event!',
    time: '2 hours ago',
    unread: false,
    thread: [
      {
        id: 1,
        sender: {
          name: 'Michael Brown',
          role: 'host',
          avatar: 'MB'
        },
        content: 'Thank you for booking my venue. Looking forward to hosting your event!',
        timestamp: '2025-02-19T08:45:00'
      }
    ]
  }
];

interface MessageCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const MessageCenter: React.FC<MessageCenterProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

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
      case 'support':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvatarBgColor = (role: string) => {
    switch (role) {
      case 'host':
        return 'bg-purple-500';
      case 'support':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const selectedMessageData = selectedMessage !== null ? mockMessages.find(m => m.id === selectedMessage) : null;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          {selectedMessage === null ? (
            <div className="flex-1 overflow-y-auto divide-y divide-gray-200">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    message.unread ? 'bg-[#2DD4BF]/5' : ''
                  }`}
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
          ) : (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="p-4 border-b border-gray-200 flex items-center">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="mr-4 text-gray-600 hover:text-gray-900"
                >
                  <X className="h-5 w-5" />
                </button>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-semibold text-gray-900">{selectedMessageData?.sender.name}</h2>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getRoleBadgeColor(selectedMessageData?.sender.role || '')}`}>
                      {selectedMessageData?.sender.role.charAt(0).toUpperCase() + selectedMessageData?.sender.role.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedMessageData?.title}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedMessageData?.thread.map((msg) => (
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
                <form onSubmit={handleReply} className="space-y-2">
                  <div className="flex-1">
                    <label htmlFor="reply" className="sr-only">Reply</label>
                    <textarea
                      id="reply"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-[#2DD4BF] focus:border-[#2DD4BF] resize-none"
                      placeholder="Type your reply..."
                      rows={3}
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
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
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;