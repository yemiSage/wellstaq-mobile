import {
  Announcement,
  BaselineAssessment,
  Challenge,
  Club,
  DailyCheckIn,
  EmployeeMiniProfile,
  EmployeeNotification,
  EmployeeProfile,
  FeedPost,
  LocationTag,
  NearbyEmployeeFilter,
  PartnerListing,
  PersonalInsight,
  WellbeingEvent,
  WellbeingPriority
} from "@/models";

export interface OnboardingRepository {
  getProfile(): Promise<EmployeeProfile>;
  saveProfileStep(profile: Partial<EmployeeProfile>): Promise<EmployeeProfile>;
  saveBaselineStep(baseline: BaselineAssessment): Promise<BaselineAssessment>;
  savePriorities(priorities: WellbeingPriority[]): Promise<WellbeingPriority[]>;
}

export interface HomeRepository {
  getDashboard(): Promise<{
    announcements: Announcement[];
    challenges: Challenge[];
    clubs: Club[];
    events: WellbeingEvent[];
    recommendations: PersonalInsight[];
    snapshot: DailyCheckIn | null;
  }>;
}

export interface CheckInRepository {
  listCheckIns(): Promise<DailyCheckIn[]>;
  listInsights(): Promise<PersonalInsight[]>;
  submitCheckIn(payload: Omit<DailyCheckIn, "id" | "createdAt">): Promise<DailyCheckIn>;
}

export interface FeedRepository {
  listFeed(): Promise<FeedPost[]>;
  createPost(post: Pick<FeedPost, "kind" | "content" | "imageUrl">): Promise<FeedPost>;
  followEmployee(employeeId: string): Promise<EmployeeMiniProfile>;
}

export interface ClubRepository {
  listClubs(): Promise<Club[]>;
  getClub(clubId: string): Promise<Club>;
  joinClub(clubId: string): Promise<Club>;
  leaveClub(clubId: string): Promise<Club>;
  createClub(club: Pick<Club, "name" | "category" | "description">): Promise<Club>;
}

export interface ChallengeRepository {
  listChallenges(): Promise<Challenge[]>;
  getChallenge(challengeId: string): Promise<Challenge>;
  joinChallenge(challengeId: string): Promise<Challenge>;
}

export interface EventRepository {
  listEvents(): Promise<WellbeingEvent[]>;
  getEvent(eventId: string): Promise<WellbeingEvent>;
  rsvp(eventId: string): Promise<WellbeingEvent>;
}

export interface NotificationRepository {
  listNotifications(): Promise<EmployeeNotification[]>;
}

export interface PartnerRepository {
  listPartners(): Promise<PartnerListing[]>;
  getPartner(partnerId: string): Promise<PartnerListing>;
  redeemOffer(partnerId: string, offerId: string): Promise<{ code: string }>;
}

export interface LocationRepository {
  getLocationTag(): Promise<LocationTag>;
  updateTemporaryTag(tag: LocationTag): Promise<LocationTag>;
  discoverNearby(filter: NearbyEmployeeFilter): Promise<EmployeeMiniProfile[]>;
}
