export type WorkSetupType = "remote" | "hybrid" | "onsite";
export type ProductivityMode = "deep-focus" | "collaborative" | "flexible" | "structured";
export type WellbeingInterest =
  | "fitness"
  | "mindfulness"
  | "nutrition"
  | "financial-wellbeing"
  | "learning"
  | "community"
  | "outdoor-activities"
  | "sleep";
export type WellbeingPriority =
  | "reduce-stress"
  | "build-energy"
  | "improve-balance"
  | "stay-active"
  | "save-better"
  | "feel-connected";
export type VisibilityPreference = "private" | "team-visible" | "organization-visible";

export interface AuthSession {
  userId: string;
  email: string;
  organizationId: string;
  token: string;
}

export interface OtpRequest {
  email: string;
}

export interface UserJourneyState {
  isFirstTimeUser: boolean;
  isOnboardingComplete: boolean;
  organizationId: string;
}

export interface OtpVerificationResult {
  session: AuthSession;
  journey: UserJourneyState;
}

export interface EmployeeProfile {
  id: string;
  fullName: string;
  email: string;
  jobTitle: string;
  department: string;
  primaryCity: string;
  workSetup: WorkSetupType;
  profilePhotoUrl?: string;
  interests: WellbeingInterest[];
  productivityMode: ProductivityMode;
}

export interface BaselineAssessment {
  mood: number;
  stressLevel: number;
  energyLevel: number;
  workLifeBalance: number;
  createdAt: string;
}

export interface DailyCheckIn {
  id: string;
  createdAt: string;
  mood: number;
  stress: number;
  energy: number;
  sleep: number;
  financialWellbeing: number;
  note?: string;
}

export interface CheckInTrendPoint {
  label: string;
  mood: number;
  energy: number;
  stress: number;
}

export interface PersonalInsight {
  id: string;
  title: string;
  description: string;
  type: "pattern" | "recommendation" | "reminder";
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  author: string;
}

export interface EmployeeMiniProfile {
  id: string;
  fullName: string;
  role: string;
  department: string;
  city: string;
  avatarUrl?: string;
  interests: WellbeingInterest[];
  isFollowing: boolean;
}

export interface PostReaction {
  type: "celebrate" | "support" | "insightful";
  count: number;
}

export interface Comment {
  id: string;
  author: EmployeeMiniProfile;
  message: string;
  createdAt: string;
}

export interface FeedPost {
  id: string;
  author: EmployeeMiniProfile;
  kind: "text" | "photo" | "check-in";
  content: string;
  imageUrl?: string;
  createdAt: string;
  reactions: PostReaction[];
  comments: Comment[];
}

export interface ClubMembership {
  clubId: string;
  status: "member" | "invited" | "none";
}

export interface ClubInvite {
  colleagueId: string;
  clubId: string;
}

export interface Club {
  id: string;
  name: string;
  category: string;
  description: string;
  membersCount: number;
  activityPreview: string;
  isMember: boolean;
}

export interface ChallengeProgress {
  current: number;
  target: number;
  unit: string;
}

export interface BadgeReward {
  id: string;
  name: string;
  description: string;
  earned: boolean;
}

export interface LeaderboardEntry {
  employeeId: string;
  employeeName: string;
  score: number;
  rank: number;
}

export interface ChallengeParticipation {
  challengeId: string;
  joined: boolean;
  completed: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  dimension: string;
  description: string;
  progress: ChallengeProgress;
  leaderboard: LeaderboardEntry[];
  reward: BadgeReward;
  participation: ChallengeParticipation;
  endsAt: string;
}

export interface EventRegistration {
  eventId: string;
  status: "not-registered" | "registered";
  reminderEnabled: boolean;
}

export interface WellbeingEvent {
  id: string;
  title: string;
  type: string;
  summary: string;
  date: string;
  city: string;
  registration: EventRegistration;
}

export interface EmployeeNotification {
  id: string;
  type: "challenge" | "reward" | "comment" | "reaction" | "announcement" | "event" | "partner-offer";
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface PartnerOffer {
  id: string;
  title: string;
  description: string;
  rewardCode?: string;
}

export interface RewardCode {
  code: string;
  expiresAt: string;
}

export interface PartnerListing {
  id: string;
  name: string;
  category: string;
  city: string;
  summary: string;
  offers: PartnerOffer[];
}

export interface LocationTag {
  city: string;
  expiresAt: string;
  enabled: boolean;
}

export interface NearbyEmployeeFilter {
  city?: string;
  department?: string;
  interests?: WellbeingInterest[];
}
