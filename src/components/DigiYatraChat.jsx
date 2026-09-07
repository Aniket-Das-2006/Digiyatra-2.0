import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, X, Maximize2, Minimize2, RefreshCw, Sparkles, 
  ShieldCheck, Plane, Luggage, Building2, Copy, Check,
  ThumbsUp, Volume2, Mic, Plus, MoreVertical, ChevronLeft, Sun, Moon
} from 'lucide-react';
import { useDigiYatra } from '../context/DigiYatraContext';
import './DigiYatraChat.css';

const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    sender: 'bot',
    timestamp: '10:15 AM',
    text: `Namaste Aniket! Welcome to your **DigiYatra 2.0 AI Experience**.\n\nI am your verified identity & travel concierge. How can I assist your journey today?`,
    options: [
      "DigiYatra 2.0 Overview",
      "Flight Status (AI-862)",
      "Track My Baggage",
      "Price Intelligence (CCU \u2192 DEL)",
      "Airport Navigation & Queues",
      "Family Travel Dashboard",
      "Hotel Check-in Status",
      "International Travel Checklist",
      "When Should I Leave Home?",
      "My Travel Analytics"
    ]
  },
  {
    id: 'msg-2',
    sender: 'user',
    timestamp: '10:16 AM',
    text: `Describe to me the basic principles of DigiYatra 2.0 and flight safety.`
  },
  {
    id: 'msg-3',
    sender: 'bot',
    timestamp: '10:16 AM',
    text: `Basic principles of DigiYatra 2.0:\n\n• **Self-Sovereign Identity:** Your facial biometrics remain encrypted on your device (AES-256) and are purged from gate servers within 24 hours.\n• **IATA One ID Ready:** Fully interoperable with global standards for international transit.\n• **Zero Contact:** Seamless biometric e-gates cut queue entry down to 5 seconds.`,
    cardType: 'flight_card'
  }
];

const KNOWLEDGE_RESPONSES = [
  {
    keywords: ['ecosystem', 'digiyatra 2.0', 'blueprint', 'what is', 'principle', 'overview'],
    text: `**DigiYatra 2.0 — Trusted Travel OS:**\n\n• **One Identity, One Journey:** Multi-credential wallet (Aadhaar, Passport, Visa, DigiLocker).\n• **On-Device Vault:** Biometrics stay on your phone — never in a central database.\n• **IATA One ID & W3C VC:** Interoperable with global travel standards.\n• **7-Layer Architecture:** Identity \u2192 AI Engine \u2192 Trust \u2192 Travel \u2192 Hotel \u2192 Airport \u2192 Operations.`,
    type: 'info'
  },
  {
    keywords: ['flight', 'ai-862', 'gate', 'status', 'delhi', 'mumbai', 'departure', 'arrival'],
    text: `Here is your live synced flight status:`,
    type: 'flight_card'
  },
  {
    keywords: ['baggage', 'luggage', 'bg-8291', 'tag', 'track', 'bag', 'belt'],
    text: `Real-time RFID baggage telemetry for your journey:`,
    type: 'baggage_card'
  },
  {
    keywords: ['privacy', 'data', 'purge', 'retention', 'security', 'aadhaar', 'trust', 'consent'],
    text: `**Data Governance & 24h Purge:**\n\n• **Facial Vectors:** Purged from airport gate nodes within **24 hours** after departure.\n• **Travel Logs:** Retained for **30 days** for statutory audit compliance.\n• **Consent Control:** Revoke access instantly from your Consent Manager.\n• **DPDP Compliant** — Audited by Ernst & Young.\n• **Zero breaches** on record.`,
    type: 'trust_card'
  },
  {
    keywords: ['hotel', 'form c', 'checkin', 'stay', 'taj', 'room', 'checkout'],
    text: `**Hotel Form C & Digital Stay:**\n\n• **Pre-Arrival Auto-Fill:** Automatic Form C filing for foreign guests & local GRC.\n• **Biometric Room Key:** Use your identity token for keyless hotel room entry.\n• **Automated Checkout:** Bill and Form C auto-processed on departure.\n• **Room 1204** at Taj Mahal Palace — pre-checked-in.`,
    type: 'hotel_card'
  },
  {
    keywords: ['price', 'cheap', 'fare', 'cost', 'when to book', 'buy', 'wait', 'expensive'],
    text: `**AI Price Intelligence — CCU \u2192 DEL:**\n\n• **Current:** \u20B95,200 (below 30-day average \u20B95,850)\n• **Historical Low:** \u20B94,400\n• [BUY] **Good time to book** — price is below recent average.\n\nYou have a price alert set for below \u20B94,500. I will notify you instantly.`,
    type: 'info'
  },
  {
    keywords: ['trip', 'itinerary', 'journey', 'travel wallet', 'document', 'plan'],
    text: `**Your Active Trip — Delhi Business Trip:**\n\n• AI-862 DEL \u2192 BOM — 14:30 (Confirmed)\n• Taj Mahal Palace — Pre-checked-in\n• Airport Transfer — 11:30 (Booked)\n• 2 Bags Tracked (RFID Active)\n\n**Budget:** \u20B928,500 of \u20B942,000 spent.`,
    type: 'info'
  },
  {
    keywords: ['gate', 'map', 'navigate', 'lounge', 'restaurant', 'shop', 'washroom', 'where'],
    text: `**Smart Airport Navigation — DEL T3:**\n\n• Gate T3-G24 — 8 min walk\n• Air India Lounge — 2 min\n• Punjab Grill — 3 min\n• DFS Duty Free — 4 min\n• Charging Hub — 1 min\n\nAI recommends leaving for gate in **18 minutes**.`,
    type: 'info'
  },
  {
    keywords: ['queue', 'wait', 'security', 'immigration', 'crowded', 'line', 'time'],
    text: `**Queue Intelligence — DEL T3:**\n\n• Check-in: ~12 min\n• Security: ~18 min\n• Immigration: ~25 min [ALERT]\n• Boarding: Not started\n• Baggage: ~8 min after landing\n\nImmigration is slightly congested. Plan accordingly.`,
    type: 'info'
  },
  {
    keywords: ['wheelchair', 'accessibility', 'elderly', 'assist', 'special', 'disabled'],
    text: `**Accessibility Services:**\n\n• Wheelchair assistance confirmed at Gate T3-G24\n• Elderly escort — priority lanes enabled\n• Medical support on standby\n\nAll T3 gates are step-free. Accessible routes auto-calculated.`,
    type: 'info'
  },
  {
    keywords: ['family', 'group', 'child', 'children', 'member', 'pnr'],
    text: `**Family Travel Dashboard — PNR: X7AB29:**\n\n[OK] Aniket Das (Self) — Verified\n[OK] Priya Das (Spouse) — Verified\n[OK] Arjun Das (Child) — Verified\n[PENDING] Meera Das (Child) — Pending\n[OK] Ramesh Das (Grandparent) — Verified [Wheelchair]\n\nCheck-in: 4/5 | Baggage: 4/5 | Gate: T3-G24`,
    type: 'info'
  },
  {
    keywords: ['passport', 'visa', 'international', 'travel document', 'transit', 'forex'],
    text: `**International Travel Checklist:**\n\n[OK] Passport T8294512 — Valid until 2031\n[OK] US B1/B2 Visa — Active\n[OK] Travel Insurance — \u20B950L cover\n[PENDING] Foreign Currency — Order USD\n[OK] COVID Vaccination — 3 doses\n\nTransit via Dubai: No visa required with valid US visa.`,
    type: 'info'
  },
  {
    keywords: ['leave home', 'when should i', 'depart', 'time to go', 'how long'],
    text: `Based on your flight AI-862 departing at **14:30** from DEL T3:\n\n• Recommended departure: **11:30 AM**\n• Travel to airport: ~45 min\n• Security + Immigration: ~35 min\n• Buffer: ~30 min\n\nYour airport transfer is booked for 11:30.`,
    type: 'info'
  },
  {
    keywords: ['connection', 'connecting', 'missed', 'delay', 'delayed', 'late'],
    text: `Your flight AI-862 is currently **On Time** with no delays.\n\n• Hotel arrival is within check-in window.\n• Airport transfer has been synced.\n• No connecting flights at risk.\n\nI will alert you immediately if anything changes.`,
    type: 'info'
  },
  {
    keywords: ['sos', 'emergency', 'help', 'lost', 'medical'],
    text: `**Emergency SOS System:**\n\n• Slide-to-SOS — sends geofenced alert to airport security\n• WhatsApp SOS — shares location with emergency contacts\n\n**Categories:** Medical · Security · Lost Child · Lost Elderly · Assistance\n\nCurrently geofenced to DEL T3.`,
    type: 'info'
  },
  {
    keywords: ['analytics', 'spending', 'statistics', 'how much', 'spent', 'trips'],
    text: `**Your 2026 Travel Analytics:**\n\n• 18 Flights | 8 Hotels | 12 Trips\n• \u20B91,42,000 Total Spent\n• Frequent Route: CCU \u2192 DEL\n• Avg Ticket: \u20B95,480\n• Carbon: 2.4 tonnes CO2\n\nTop Airlines: Air India (8) · IndiGo (5) · Vistara (3)`,
    type: 'info'
  },
];

const DigiYatraChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('digiyatra_chat_history');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [likedMsgs, setLikedMsgs] = useState({});
  const [speakingId, setSpeakingId] = useState(null);

  const { flight, baggage, trustStats, hotelBooking } = useDigiYatra();
  const chatEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('digiyatra_chat_history', JSON.stringify(messages));
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const lowerQ = query.toLowerCase();
      let matchedResponse = KNOWLEDGE_RESPONSES.find(kr => 
        kr.keywords.some(kw => lowerQ.includes(kw))
      );

      let botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      if (matchedResponse) {
        botMsg.text = matchedResponse.text;
        botMsg.cardType = matchedResponse.type;
      } else {
        botMsg.text = `DigiYatra 2.0 provides encrypted identity verification across 38+ airports.\n\nYou can ask me about flight gates, RFID baggage updates, 24-hour purge rules, or hotel check-in!`;
      }

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem('digiyatra_chat_history');
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleLike = (id) => {
    setLikedMsgs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSpeech = (id) => {
    if (speakingId === id) {
      setSpeakingId(null);
    } else {
      setSpeakingId(id);
      setTimeout(() => setSpeakingId(null), 3000);
    }
  };

  return (
    <div className="digiyatra-chat-root">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button 
          className="digiyatra-chat-trigger touch-sensitive"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
        >
          <img src="/ai-logo.png" alt="AI Logo" className="ai-custom-logo" />
          <span className="chat-trigger-pulse" />
        </button>
      )}

      {/* Main Chat Window */}
      {isOpen && (
        <div className={`digiyatra-chat-window theme-${theme} ${isExpanded ? 'is-expanded' : ''}`}>
          {/* Animated Fluid Gradient Mesh BG (Instagram / AI Voice aura style) */}
          <div className="fluid-gradient-bg">
            <div className="gradient-blob blob-1" />
            <div className="gradient-blob blob-2" />
            <div className="gradient-blob blob-3" />
            <div className="fluid-mesh-overlay" />
          </div>

          {/* Minimal Header with AI Flight Logo ONLY (No Name Text) */}
          <div className="chat-header">
            <button 
              onClick={() => setIsOpen(false)} 
              className="header-action-btn"
              title="Close"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Title Text */}
            <div className="header-ai-logo-center">
              <h3 className="header-title-text">DIGIYATRA AI</h3>
            </div>

            <div className="header-actions">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="header-action-btn"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button 
                onClick={clearChat} 
                className="header-action-btn"
                title="Reset Chat"
              >
                <RefreshCw size={16} />
              </button>
              <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="header-action-btn desktop-only"
                title={isExpanded ? "Minimize" : "Expand"}
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button className="header-action-btn" title="Options">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="chat-body">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`chat-message-row ${msg.sender === 'user' ? 'msg-user' : 'msg-bot'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="msg-ai-avatar">
                    <img src="/ai-logo.png" alt="AI Avatar" className="mini-custom-avatar" />
                  </div>
                )}
                
                <div className="msg-bubble-wrapper">
                  <div className="msg-bubble">
                    <div className="msg-text">
                      {msg.text.split('\n').map((paragraph, idx) => (
                        <p key={idx}>
                          {paragraph.split('**').map((part, i) => 
                            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                          )}
                        </p>
                      ))}
                    </div>

                    {/* Interactive Feature Cards */}
                    {msg.cardType === 'flight_card' && (
                      <div className="chat-card flight-chat-card">
                        <div className="chat-card-header">
                          <Plane size={15} className="icon-gradient" />
                          <span>Air India • {flight.flightNo}</span>
                          <span className="badge-status-on-time">{flight.status}</span>
                        </div>
                        <div className="chat-card-route">
                          <div>
                            <span className="airport-code">{flight.from}</span>
                            <span className="time">{flight.departure}</span>
                          </div>
                          <div className="route-animated-line">
                            <span className="flying-plane"><Plane size={14} /></span>
                          </div>
                          <div>
                            <span className="airport-code">{flight.to}</span>
                            <span className="time">{flight.arrival}</span>
                          </div>
                        </div>
                        <div className="chat-card-footer">
                          <span>Gate <strong>{flight.gate}</strong> • Baggage <strong>{flight.belt}</strong></span>
                        </div>
                      </div>
                    )}

                    {msg.cardType === 'baggage_card' && (
                      <div className="chat-card baggage-chat-card">
                        <div className="chat-card-header">
                          <Luggage size={15} className="icon-emerald" />
                          <span>Tag: {baggage[0]?.tag}</span>
                          <span className="badge-status-loaded">Loaded</span>
                        </div>
                        <div className="baggage-tracker-mini">
                          <div className="step complete">Check-in</div>
                          <div className="step complete">Security</div>
                          <div className="step active">Loaded</div>
                        </div>
                      </div>
                    )}

                    {msg.cardType === 'trust_card' && (
                      <div className="chat-card trust-chat-card">
                        <div className="chat-card-header">
                          <ShieldCheck size={15} className="icon-purple" />
                          <span>Trust Metrics</span>
                        </div>
                        <div className="trust-card-grid">
                          <div>
                            <span className="lbl">Uptime</span>
                            <span className="val">{trustStats.uptime}</span>
                          </div>
                          <div>
                            <span className="lbl">Journeys</span>
                            <span className="val">{trustStats.totalJourneys}</span>
                          </div>
                          <div>
                            <span className="lbl">EY Audit</span>
                            <span className="val">Passed</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {msg.cardType === 'hotel_card' && (
                      <div className="chat-card hotel-chat-card">
                        <div className="chat-card-header">
                          <Building2 size={15} className="icon-amber" />
                          <span>{hotelBooking.hotelName}</span>
                        </div>
                        <p className="hotel-sub">Form C Auto-Filled • Biometric Room Key Active</p>
                      </div>
                    )}

                    {/* Bot Action Bar (Copy, Like, Audio, Refresh) - matches screenshot UI */}
                    {msg.sender === 'bot' && (
                      <div className="bot-action-toolbar">
                        <button 
                          className="action-icon-btn" 
                          onClick={() => copyToClipboard(msg.text, msg.id)}
                          title="Copy text"
                        >
                          {copiedId === msg.id ? <Check size={14} className="active-icon" /> : <Copy size={14} />}
                        </button>
                        <button 
                          className={`action-icon-btn ${likedMsgs[msg.id] ? 'is-active' : ''}`}
                          onClick={() => toggleLike(msg.id)}
                          title="Good response"
                        >
                          <ThumbsUp size={14} />
                        </button>
                        <button 
                          className={`action-icon-btn ${speakingId === msg.id ? 'is-speaking' : ''}`}
                          onClick={() => toggleSpeech(msg.id)}
                          title="Listen"
                        >
                          <Volume2 size={14} />
                        </button>
                        <button 
                          className="action-icon-btn" 
                          onClick={() => handleSend(msg.text.slice(0, 30))}
                          title="Regenerate"
                        >
                          <RefreshCw size={14} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Option Chips */}
                  {msg.options && (
                    <div className="suggested-chips">
                      {msg.options.map((opt, i) => (
                        <button 
                          key={i} 
                          className="chip-btn touch-sensitive"
                          onClick={() => handleSend(opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="user-avatar-dot">
                    <span>A</span>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="chat-message-row msg-bot">
                <div className="msg-ai-avatar">
                  <img src="/ai-logo.png" alt="AI Avatar" className="mini-custom-avatar" />
                </div>
                <div className="msg-bubble typing-bubble">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Footer Input Bar matching screenshot */}
          <div className="chat-footer">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="chat-input-pill"
            >
              <input 
                type="text" 
                placeholder="Send message..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="chat-input-text"
              />
              <div className="input-actions-right">
                <button type="button" className="input-icon-btn" title="Voice Input">
                  <Mic size={18} />
                </button>
                <button type="button" className="input-icon-btn" title="Add Attachment">
                  <Plus size={18} />
                </button>
                <button 
                  type="submit" 
                  disabled={!inputText.trim()}
                  className="input-send-btn touch-sensitive"
                  aria-label="Send"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigiYatraChat;
