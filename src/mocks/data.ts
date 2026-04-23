import {
  Announcement,
  Challenge,
  Club,
  DailyCheckIn,
  EmployeeMiniProfile,
  EmployeeNotification,
  EmployeeProfile,
  FeedPost,
  LocationTag,
  PartnerListing,
  PersonalInsight,
  UserJourneyState,
  WellbeingEvent,
  WellbeingPriority
} from "@/models";

export const mockJourneyByEmail: Record<string, UserJourneyState> = {
  "new@wellstaq.com": {
    isFirstTimeUser: true,
    isOnboardingComplete: false,
    organizationId: "org-001"
  },
  "employee@wellstaq.com": {
    isFirstTimeUser: false,
    isOnboardingComplete: true,
    organizationId: "org-001"
  }
};

export const mockProfile: EmployeeProfile = {
  id: "emp-001",
  fullName: "Yedmifig Adebayo",
  email: "employee@wellstaq.com",
  jobTitle: "Product Designer",
  department: "People Experience",
  primaryCity: "Lagos",
  workSetup: "hybrid",
  interests: ["mindfulness", "fitness", "community"],
  productivityMode: "deep-focus"
};

export const mockPriorities: WellbeingPriority[] = ["reduce-stress", "build-energy", "feel-connected"];

export const mockAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "This week’s wellbeing hour is open for all teams",
    body: "Choose a workshop, movement session, or quiet reset block and protect time for it in your calendar.",
    publishedAt: "2026-04-21T08:00:00.000Z",
    author: "People Team"
  }
];

export const mockCheckIns: DailyCheckIn[] = [
  {
    id: "ci-1",
    createdAt: "2026-04-19T09:00:00.000Z",
    mood: 4,
    stress: 2,
    energy: 4,
    sleep: 3,
    financialWellbeing: 3
  },
  {
    id: "ci-2",
    createdAt: "2026-04-20T09:00:00.000Z",
    mood: 3,
    stress: 3,
    energy: 3,
    sleep: 4,
    financialWellbeing: 3
  }
];

export const mockInsights: PersonalInsight[] = [
  {
    id: "ins-1",
    title: "Your energy holds up better after movement breaks",
    description: "On days you log light activity, your afternoon energy tends to stay steadier. A 10-minute walk may help today.",
    type: "pattern"
  },
  {
    id: "ins-2",
    title: "Protect a short focus block",
    description: "Your selected productivity mode is Deep Focus. Consider blocking 90 minutes before your first meeting cluster.",
    type: "recommendation"
  }
];

export const mockPeople: EmployeeMiniProfile[] = [
  {
    id: "emp-002",
    fullName: "Damilola Hassan",
    role: "Frontend Engineer",
    department: "Engineering",
    city: "Lagos",
    interests: ["fitness", "community"],
    isFollowing: true
  },
  {
    id: "emp-003",
    fullName: "Amina Yusuf",
    role: "Finance Analyst",
    department: "Finance",
    city: "Abuja",
    interests: ["financial-wellbeing", "learning"],
    isFollowing: false
  }
];

export const mockFeed: FeedPost[] = [
  {
    id: "post-1",
    author: mockPeople[0],
    kind: "text",
    content: "Our running club is doing a gentle 5k this Saturday morning. New joiners are welcome.",
    createdAt: "2026-04-21T07:00:00.000Z",
    reactions: [
      { type: "celebrate", count: 14 },
      { type: "support", count: 6 }
    ],
    comments: []
  }
];

export const mockClubs: Club[] = [
  {
    id: "club-1",
    name: "Yoga Circle",
    category: "Mind & Body",
    description: "A weekly reset for stretching, breathing, and calmer workdays.",
    membersCount: 42,
    activityPreview: "Thursday lunchtime flow session",
    isMember: true
  },
  {
    id: "club-2",
    name: "Book Club",
    category: "Learning",
    description: "Read together, reflect together, and bring ideas back into work and life.",
    membersCount: 21,
    activityPreview: "This month: Atomic Habits discussion",
    isMember: false
  }
];

export const mockChallenges: Challenge[] = [
  {
    id: "chal-1",
    title: "Seven days of better recharge",
    dimension: "Mental",
    description: "Log one intentional recharge habit each day this week.",
    progress: { current: 4, target: 7, unit: "days" },
    leaderboard: [
      { employeeId: "emp-001", employeeName: "Yedmifig Adebayo", score: 4, rank: 2 },
      { employeeId: "emp-002", employeeName: "Damilola Hassan", score: 5, rank: 1 }
    ],
    reward: { id: "badge-1", name: "Recharge Builder", description: "Completed 7 recharge days.", earned: false },
    participation: { challengeId: "chal-1", joined: true, completed: false },
    endsAt: "2026-04-28T18:00:00.000Z"
  }
];

export const mockEvents: WellbeingEvent[] = [
  {
    id: "evt-1",
    title: "Financial literacy lunch session",
    type: "Workshop",
    summary: "A practical session on budgeting, emergency planning, and long-term savings habits.",
    date: "2026-04-25T12:00:00.000Z",
    city: "Lagos",
    registration: { eventId: "evt-1", status: "registered", reminderEnabled: true }
  }
];

export const mockNotifications: EmployeeNotification[] = [
  {
    id: "not-1",
    type: "announcement",
    title: "New wellbeing hour options are live",
    body: "Explore this week’s sessions and register early if you want a guided workshop.",
    read: false,
    createdAt: "2026-04-21T08:15:00.000Z"
  }
];

export const mockPartners: PartnerListing[] = [
  {
    id: "partner-1",
    name: "Balance Wellness Studio",
    category: "Fitness",
    city: "Lagos",
    summary: "Studio sessions and discounted guided movement classes for employees.",
    offers: [
      {
        id: "offer-1",
        title: "15% off intro package",
        description: "Redeem a one-time employee code for your first wellness package."
      }
    ]
  }
];

export const mockLocationTag: LocationTag = {
  city: "Lagos",
  expiresAt: "2026-04-21T18:00:00.000Z",
  enabled: true
};
