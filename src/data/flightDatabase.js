export const destinations = [
  // International
  { id: 'dxb', type: 'international', name: 'Dubai', country: 'UAE', flights: 653, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', description: 'Experience luxury and stunning modern architecture.', code: 'DXB', themeColor: '#f59e0b' },
  { id: 'bkk', type: 'international', name: 'Bangkok', country: 'Thailand', flights: 123, image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80', description: 'Vibrant street life and ornate shrines await.', code: 'BKK', themeColor: '#ec4899' },
  { id: 'hkg', type: 'international', name: 'Hong Kong', country: 'Hong Kong', flights: 98, image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=600&q=80', description: 'A major port and global financial hub.', code: 'HKG', themeColor: '#8b5cf6' },
  { id: 'mfm', type: 'international', name: 'Macao', country: 'Macao', flights: 57, image: 'https://images.unsplash.com/photo-1555217851-6141535bd771?w=600&q=80', description: 'Known as the "Vegas of China".', code: 'MFM', themeColor: '#3b82f6' },
  { id: 'lhr', type: 'international', name: 'London', country: 'UK', flights: 87, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80', description: 'A 21st-century city with history stretching back to Roman times.', code: 'LHR', themeColor: '#64748b' },
  { id: 'sin', type: 'international', name: 'Singapore', country: 'Singapore', flights: 320, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80', description: 'A global financial center with a tropical climate and multicultural population.', code: 'SIN', themeColor: '#10b981' },
  { id: 'nrt', type: 'international', name: 'Tokyo', country: 'Japan', flights: 412, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80', description: 'Japan’s busy capital, mixes the ultramodern and the traditional.', code: 'NRT', themeColor: '#f43f5e' },
  { id: 'jfk', type: 'international', name: 'New York', country: 'USA', flights: 550, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80', description: 'The city that never sleeps.', code: 'JFK', themeColor: '#0ea5e9' },
  { id: 'cdg', type: 'international', name: 'Paris', country: 'France', flights: 290, image: 'https://images.unsplash.com/photo-1502602898657-3e907614f243?w=600&q=80', description: 'France\'s capital, is a major European city and a global center for art, fashion, gastronomy and culture.', code: 'CDG', themeColor: '#d946ef' },
  // National (India)
  { id: 'del', type: 'national', name: 'New Delhi', country: 'India', flights: 890, image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80', description: 'The capital of India, known for its rich history and bustling streets.', code: 'DEL', themeColor: '#f97316' },
  { id: 'bom', type: 'national', name: 'Mumbai', country: 'India', flights: 750, image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80', description: 'The financial capital and home of Bollywood.', code: 'BOM', themeColor: '#eab308' },
  { id: 'blr', type: 'national', name: 'Bengaluru', country: 'India', flights: 620, image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80', description: 'The Silicon Valley of India.', code: 'BLR', themeColor: '#84cc16' },
  { id: 'goi', type: 'national', name: 'Goa', country: 'India', flights: 340, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80', description: 'Famous for its beaches and nightlife.', code: 'GOI', themeColor: '#06b6d4' },
  { id: 'ccu', type: 'national', name: 'Kolkata', country: 'India', flights: 380, image: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=600&q=80', description: 'The cultural capital of India.', code: 'CCU', themeColor: '#a855f7' },
  { id: 'maa', type: 'national', name: 'Chennai', country: 'India', flights: 410, image: 'https://images.unsplash.com/photo-1506461883276-594c397e4172?w=600&q=80', description: 'Known for its beautiful temples and Marina Beach.', code: 'MAA', themeColor: '#14b8a6' }
];

export const flights = [
  // Mock flights data - can be expanded
  { id: 'fl-101', airline: 'Air India', from: 'DEL', to: 'DXB', price: 14500, duration: '3h 45m', departure: '10:00 AM', arrival: '12:15 PM', type: 'non-stop', stops: 0 },
  { id: 'fl-102', airline: 'Emirates', from: 'BOM', to: 'DXB', price: 18200, duration: '3h 10m', departure: '02:30 PM', arrival: '04:10 PM', type: 'non-stop', stops: 0 },
  { id: 'fl-103', airline: 'IndiGo', from: 'BLR', to: 'BKK', price: 12000, duration: '4h 20m', departure: '11:45 PM', arrival: '05:35 AM', type: 'non-stop', stops: 0 },
  { id: 'fl-104', airline: 'Vistara', from: 'DEL', to: 'LHR', price: 45000, duration: '9h 30m', departure: '06:00 AM', arrival: '11:00 AM', type: 'non-stop', stops: 0 },
  { id: 'fl-105', airline: 'AirAsia', from: 'MAA', to: 'SIN', price: 11500, duration: '4h 15m', departure: '08:00 AM', arrival: '02:45 PM', type: 'non-stop', stops: 0 },
  { id: 'fl-106', airline: 'SpiceJet', from: 'DEL', to: 'GOI', price: 5500, duration: '2h 30m', departure: '07:30 AM', arrival: '10:00 AM', type: 'non-stop', stops: 0 },
  { id: 'fl-107', airline: 'Air India', from: 'BOM', to: 'DEL', price: 4200, duration: '2h 10m', departure: '09:00 AM', arrival: '11:10 AM', type: 'non-stop', stops: 0 },
  { id: 'fl-108', airline: 'IndiGo', from: 'CCU', to: 'BLR', price: 6800, duration: '2h 45m', departure: '04:00 PM', arrival: '06:45 PM', type: 'non-stop', stops: 0 },
  { id: 'fl-109', airline: 'Vistara', from: 'DEL', to: 'JFK', price: 85000, duration: '15h 45m', departure: '02:00 AM', arrival: '07:15 AM', type: 'non-stop', stops: 0 },
  { id: 'fl-110', airline: 'Emirates', from: 'DEL', to: 'LHR', price: 52000, duration: '12h 15m', departure: '04:00 AM', arrival: '11:45 AM', type: '1-stop', stops: 1, layover: 'DXB' }
];

export const searchFlights = (from, to, criteria = {}) => {
  return flights.filter(f => 
    (!from || f.from === from) &&
    (!to || f.to === to) &&
    (!criteria.maxPrice || f.price <= criteria.maxPrice) &&
    (criteria.nonStopOnly === undefined || !criteria.nonStopOnly || f.stops === 0)
  );
};
