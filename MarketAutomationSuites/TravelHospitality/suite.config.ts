// Product-specific accessible-name contract for this standalone E2E suite.
// Update these patterns to match the labels exposed by your tenant version.
export const productName = "Travel & Hospitality";
export const industryDomain = "travel-hospitality";
export const journeys = [
  {
    "title": "Availability search, competing holds, and expiry release",
    "section": "Inventory|Availability",
    "createAction": "Search availability|New hold",
    "fields": [
      "Property",
      "Check-in date"
    ],
    "submitAction": "Search|Hold",
    "createdText": "Hold",
    "nextAction": "Confirm|Release"
  },
  {
    "title": "Reservation itinerary creation, modification, and cancellation",
    "section": "Reservations|Itineraries",
    "createAction": "New reservation|Book stay",
    "fields": [
      "Booking reference",
      "Traveler"
    ],
    "submitAction": "Create|Confirm",
    "createdText": "Reservation",
    "nextAction": "Modify|Cancel"
  },
  {
    "title": "Promotion eligibility, quote calculation, and final total",
    "section": "Pricing|Promotions",
    "createAction": "New rate rule|Create offer",
    "fields": [
      "Offer name",
      "Date window"
    ],
    "submitAction": "Create|Save",
    "createdText": "Quote",
    "nextAction": "Reprice|Confirm"
  },
  {
    "title": "Pseudonymous traveler profile, consent, and data deletion",
    "section": "Guests|Profiles",
    "createAction": "New profile|Create traveler",
    "fields": [
      "Test profile ID",
      "Consent"
    ],
    "submitAction": "Create|Save",
    "createdText": "Profile",
    "nextAction": "Privacy|Delete"
  },
  {
    "title": "Guest check-in, room assignment, and service ticket",
    "section": "Check-in|Guest services",
    "createAction": "Check in|Find reservation",
    "fields": [
      "Booking reference",
      "Property"
    ],
    "submitAction": "Check in|Assign room",
    "createdText": "Service ticket",
    "nextAction": "Complete|History"
  },
  {
    "title": "Mock payment authorization, idempotent capture, and refund",
    "section": "Payments|Finance",
    "createAction": "New payment|Authorize",
    "fields": [
      "Booking reference",
      "Amount"
    ],
    "submitAction": "Authorize|Capture",
    "createdText": "Payment",
    "nextAction": "Refund|Reconcile"
  },
  {
    "title": "Loyalty enrollment, points accrual, and cancellation reversal",
    "section": "Loyalty|Membership",
    "createAction": "New member|Enroll",
    "fields": [
      "Member ID",
      "Program"
    ],
    "submitAction": "Enroll|Save",
    "createdText": "Member",
    "nextAction": "Points|History"
  },
  {
    "title": "Channel reservation import and partner reconciliation",
    "section": "Channels|Integrations",
    "createAction": "New channel mapping|Create mapping",
    "fields": [
      "Channel",
      "Property"
    ],
    "submitAction": "Create|Save",
    "createdText": "Reservation event",
    "nextAction": "Reconcile|Retry"
  },
  {
    "title": "Disruption rebooking, alternative inventory, and notification",
    "section": "Operations|Disruptions",
    "createAction": "New disruption|Log event",
    "fields": [
      "Event ID",
      "Itinerary"
    ],
    "submitAction": "Create|Save",
    "createdText": "Rebooking",
    "nextAction": "Recover|Notify"
  },
  {
    "title": "Occupancy analytics, tenant scope, and privacy checks",
    "section": "Analytics|Privacy",
    "createAction": "New report|Create report",
    "fields": [
      "Report name",
      "Property scope"
    ],
    "submitAction": "Create|Run",
    "createdText": "Report",
    "nextAction": "Lineage|Access"
  }
] as const;
