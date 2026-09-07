export const infoCategories = [
  {
    id: 'digiyatra',
    title: 'DigiYatra',
    items: [
      { id: 'trust-center', title: 'Trust Center', content: '<h3>Trust Center</h3><p>Your security is our priority. Welcome to the DigiYatra Trust Center, where we outline our core security principles and transparent operations.</p><div class="info-alert info"><strong>Zero Knowledge:</strong> We verify your identity without storing raw biometric data.</div>' },
      { id: 'consent-manager', title: 'Consent Manager', content: '<h3>Consent Manager</h3><p>Take full control of your digital identity. The Consent Manager allows you to view, grant, and revoke permissions for airlines, airports, and hotels.</p><ul><li>Granular permissions</li><li>Instant revocation</li><li>Immutable consent ledgers</li></ul>' },
      { id: 'identity-wallet', title: 'Identity Wallet', content: '<h3>Identity Wallet</h3><p>Your secure digital vault. Store your government IDs, verifiable credentials, and biometric keys strictly on your device.</p>' },
      { id: 'flight-tracker', title: 'Flight Tracker', content: '<h3>Flight Tracker</h3><p>Real-time telemetry for your journeys. Get instant push notifications for gate changes, delays, and boarding times directly from the aviation network.</p>' },
      { id: 'baggage-tracking', title: 'Baggage Tracking', content: '<h3>Baggage Tracking</h3><p>Never lose a bag again. Utilizing advanced RFID and barcode scanning, trace your luggage from drop-off to carousel.</p>' },
      { id: 'sos-emergency', title: 'SOS Emergency', content: '<h3>SOS Emergency</h3><p>Instant access to airport security and medical personnel. Pinpoints your terminal location for rapid response.</p>' },
      { id: 'accessibility', title: 'Accessibility', content: '<h3>Accessibility</h3><p>DigiYatra is built for everyone. Request wheelchair assistance, buggy transport, or visual aid guides directly through your profile.</p>' },
    ]
  },
  {
    id: 'hotels-stay',
    title: 'Hotels & Stay',
    items: [
      { id: 'digital-check-in', title: 'Digital Check-in', content: '<h3>Digital Check-in</h3><p>Bypass the front desk completely. Your DigiYatra biometric token acts as your seamless check-in verification for partner hotels.</p>' },
      { id: 'form-c-auto-fill', title: 'Form C Auto-Fill', content: '<h3>Form C Auto-Fill</h3><p>For international guests, Form C compliance is automated securely. Your data is encrypted and sent directly to FRRO police portals.</p>' },
      { id: 'biometric-access', title: 'Biometric Access', content: '<h3>Biometric & Mobile Key Access</h3><p>Unlock your hotel room using the DigiYatra mobile key via Bluetooth Low Energy (BLE) or biometric door scanners.</p>' },
      { id: 'group-stays', title: 'Group Stays', content: '<h3>Group Stays</h3><p>Easily share temporary digital keys with family members and manage group bookings seamlessly.</p>' },
      { id: 'loyalty-linking', title: 'Loyalty Linking', content: '<h3>Loyalty Linking</h3><p>Automatically sync your Taj, Marriott, or ITC loyalty programs to accrue points across the open network.</p>' },
      { id: 'automated-checkout', title: 'Automated Checkout', content: '<h3>Automated Checkout</h3><p>Just walk out. Your digital folio is processed and billed automatically, dropping the final invoice into your app.</p>' },
    ]
  },
  {
    id: 'compliance',
    title: 'Compliance',
    items: [
      { id: 'dpdp-act-2023', title: 'DPDP Act 2023', content: '<h3>Digital Personal Data Protection Act 2023</h3><p>DigiYatra 2.0 is built from the ground up to comply with India\'s DPDP Act, ensuring purpose limitation, data minimization, and absolute user consent.</p>' },
      { id: 'iata-one-id', title: 'IATA One ID', content: '<h3>IATA One ID Standards</h3><p>Our architecture strictly adheres to the International Air Transport Association (IATA) One ID concept for global biometric interoperability.</p>' },
      { id: 'data-retention', title: 'Data Retention', content: '<h3>Data Retention Policy</h3><p>Biometric tokens are strictly ephemeral. Edge terminal caches are purged within 24 hours of flight departure or hotel checkout.</p><div class="info-alert warning">We do not store your face.</div>' },
      { id: 'privacy-policy', title: 'Privacy Policy', content: '<h3>Privacy Policy</h3><p>We believe privacy is a fundamental right. Read our plain-English policy on how we protect, handle, and isolate your travel data.</p>' },
      { id: 'security-audits', title: 'Security Audits', content: '<h3>Security Audits</h3><p>Our infrastructure undergoes mandatory quarterly penetration testing and algorithmic bias audits by certified third-party cybersecurity firms.</p>' },
      { id: 'bug-bounty', title: 'Bug Bounty', content: '<h3>Bug Bounty Program</h3><p>Found a vulnerability? Report it to our security team for responsible disclosure and potential bounty rewards.</p>' },
    ]
  },
  {
    id: 'about',
    title: 'About',
    items: [
      { id: 'about-digiyatra', title: 'About DigiYatra', content: '<h3>About DigiYatra 2.0</h3><p>We are the foundational digital infrastructure for the future of Indian travel. Bridging aviation, hospitality, and identity into one seamless ecosystem.</p>' },
      { id: 'moca', title: 'MoCA', content: '<h3>Ministry of Civil Aviation</h3><p>Supported by the Ministry of Civil Aviation, DigiYatra operates under the national mandate to digitize and secure Indian travel networks.</p>' },
      { id: 'aai-partnership', title: 'AAI Partnership', content: '<h3>Airports Authority of India</h3><p>In strategic partnership with AAI, we deploy cutting-edge edge compute nodes across all major domestic and international terminals.</p>' },
      { id: 'help-support', title: 'Help & Support', content: '<h3>Help & Support</h3><p>Need assistance? Access our 24/7 AI-driven support chat or connect with a live nodal officer for complex travel queries.</p>' },
      { id: 'terms-conditions', title: 'Terms & Conditions', content: '<h3>Terms & Conditions</h3><p>The legal framework governing the use of the DigiYatra mobile and web platforms, outlining user responsibilities and platform liabilities.</p>' },
      { id: 'contact-us', title: 'Contact Us', content: '<h3>Contact Us</h3><p>Reach out to our corporate headquarters for partnership inquiries, press releases, or enterprise ONDC integrations.</p>' },
    ]
  }
];

export const getInfoItem = (categoryId, itemId) => {
  const category = infoCategories.find(c => c.id === categoryId);
  if (!category) return null;
  return category.items.find(i => i.id === itemId) || null;
};
