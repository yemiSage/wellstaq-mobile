import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthRepository, SessionRepository } from "@/services/contracts/auth";
import {
  ChallengeRepository,
  CheckInRepository,
  ClubRepository,
  EventRepository,
  FeedRepository,
  HomeRepository,
  LocationRepository,
  NotificationRepository,
  OnboardingRepository,
  PartnerRepository
} from "@/services/contracts/repositories";
import { delay } from "@/utils/delay";
import {
  mockAnnouncements,
  mockChallenges,
  mockCheckIns,
  mockClubs,
  mockEvents,
  mockFeed,
  mockInsights,
  mockJourneyByEmail,
  mockLocationTag,
  mockNotifications,
  mockPartners,
  mockPeople,
  mockPriorities,
  mockProfile
} from "@/mocks/data";
import { AuthSession, BaselineAssessment, Club, DailyCheckIn, EmployeeProfile, FeedPost, LocationTag, NearbyEmployeeFilter, WellbeingPriority } from "@/models";

const SESSION_KEY = "wellstaq.session";

let profileState: EmployeeProfile = { ...mockProfile };
let baselineState: BaselineAssessment = {
  mood: 3,
  stressLevel: 3,
  energyLevel: 3,
  workLifeBalance: 3,
  createdAt: new Date().toISOString()
};
let prioritiesState: WellbeingPriority[] = [...mockPriorities];
let checkInState: DailyCheckIn[] = [...mockCheckIns];
let feedState: FeedPost[] = [...mockFeed];
let clubState: Club[] = [...mockClubs];
let locationTagState: LocationTag = { ...mockLocationTag };

export const sessionRepository: SessionRepository = {
  async restore() {
    const value = await AsyncStorage.getItem(SESSION_KEY);
    return value ? (JSON.parse(value) as { session: AuthSession; journey: { isFirstTimeUser: boolean; isOnboardingComplete: boolean; organizationId: string } }) : null;
  },
  async persist(payload) {
    if (!payload) {
      await AsyncStorage.removeItem(SESSION_KEY);
      return;
    }
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  }
};

export const authRepository: AuthRepository = {
  async requestOtp() {
    await delay();
    return { success: true };
  },
  async verifyOtp(email, code) {
    await delay();
    if (code !== "123456") {
      throw new Error("The code you entered is invalid. Try again or request a new code.");
    }
    const journey = mockJourneyByEmail[email] ?? {
      isFirstTimeUser: true,
      isOnboardingComplete: false,
      organizationId: "org-001"
    };
    return {
      session: {
        userId: "emp-001",
        email,
        organizationId: journey.organizationId,
        token: "mock-token"
      },
      journey
    };
  },
  async getJourneyState() {
    await delay(150);
    return {
      isFirstTimeUser: false,
      isOnboardingComplete: true,
      organizationId: "org-001"
    };
  },
  async logout() {
    await sessionRepository.persist(null);
  }
};

export const onboardingRepository: OnboardingRepository = {
  async getProfile() {
    await delay(150);
    return profileState;
  },
  async saveProfileStep(profile) {
    await delay();
    profileState = { ...profileState, ...profile };
    return profileState;
  },
  async saveBaselineStep(baseline) {
    await delay();
    baselineState = baseline;
    return baselineState;
  },
  async savePriorities(priorities) {
    await delay();
    prioritiesState = priorities;
    return prioritiesState;
  }
};

export const homeRepository: HomeRepository = {
  async getDashboard() {
    await delay();
    return {
      announcements: mockAnnouncements,
      challenges: mockChallenges,
      clubs: clubState,
      events: mockEvents,
      recommendations: mockInsights,
      snapshot: checkInState[0] ?? null
    };
  }
};

export const checkInRepository: CheckInRepository = {
  async listCheckIns() {
    await delay();
    return checkInState;
  },
  async listInsights() {
    await delay();
    return mockInsights;
  },
  async submitCheckIn(payload) {
    await delay();
    const entry: DailyCheckIn = {
      id: `ci-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...payload
    };
    checkInState = [entry, ...checkInState];
    return entry;
  }
};

export const feedRepository: FeedRepository = {
  async listFeed() {
    await delay();
    return feedState;
  },
  async createPost(post) {
    await delay();
    const created: FeedPost = {
      id: `post-${Date.now()}`,
      author: mockPeople[0],
      createdAt: new Date().toISOString(),
      reactions: [],
      comments: [],
      ...post
    };
    feedState = [created, ...feedState];
    return created;
  },
  async followEmployee(employeeId) {
    await delay();
    const person = mockPeople.find((item) => item.id === employeeId);
    if (!person) {
      throw new Error("Employee not found.");
    }
    person.isFollowing = !person.isFollowing;
    return person;
  }
};

export const clubRepository: ClubRepository = {
  async listClubs() {
    await delay();
    return clubState;
  },
  async getClub(clubId) {
    await delay();
    const club = clubState.find((item) => item.id === clubId);
    if (!club) {
      throw new Error("Club not found.");
    }
    return club;
  },
  async joinClub(clubId) {
    await delay();
    clubState = clubState.map((club) => (club.id === clubId ? { ...club, isMember: true } : club));
    return clubRepository.getClub(clubId);
  },
  async leaveClub(clubId) {
    await delay();
    clubState = clubState.map((club) => (club.id === clubId ? { ...club, isMember: false } : club));
    return clubRepository.getClub(clubId);
  },
  async createClub(club) {
    await delay();
    const created: Club = {
      id: `club-${Date.now()}`,
      membersCount: 1,
      activityPreview: "New club ready for your first post",
      isMember: true,
      ...club
    };
    clubState = [created, ...clubState];
    return created;
  }
};

export const challengeRepository: ChallengeRepository = {
  async listChallenges() {
    await delay();
    return mockChallenges;
  },
  async getChallenge(challengeId) {
    await delay();
    const challenge = mockChallenges.find((item) => item.id === challengeId);
    if (!challenge) {
      throw new Error("Challenge not found.");
    }
    return challenge;
  },
  async joinChallenge(challengeId) {
    await delay();
    const challenge = await challengeRepository.getChallenge(challengeId);
    challenge.participation.joined = true;
    return challenge;
  }
};

export const eventRepository: EventRepository = {
  async listEvents() {
    await delay();
    return mockEvents;
  },
  async getEvent(eventId) {
    await delay();
    const event = mockEvents.find((item) => item.id === eventId);
    if (!event) {
      throw new Error("Event not found.");
    }
    return event;
  },
  async rsvp(eventId) {
    await delay();
    const event = await eventRepository.getEvent(eventId);
    event.registration.status = "registered";
    return event;
  }
};

export const notificationRepository: NotificationRepository = {
  async listNotifications() {
    await delay();
    return mockNotifications;
  }
};

export const partnerRepository: PartnerRepository = {
  async listPartners() {
    await delay();
    return mockPartners;
  },
  async getPartner(partnerId) {
    await delay();
    const partner = mockPartners.find((item) => item.id === partnerId);
    if (!partner) {
      throw new Error("Partner not found.");
    }
    return partner;
  },
  async redeemOffer() {
    await delay();
    return { code: "WELL15-LAGOS" };
  }
};

export const locationRepository: LocationRepository = {
  async getLocationTag() {
    await delay();
    return locationTagState;
  },
  async updateTemporaryTag(tag) {
    await delay();
    locationTagState = tag;
    return locationTagState;
  },
  async discoverNearby(filter: NearbyEmployeeFilter) {
    await delay();
    return mockPeople.filter((person) => {
      const cityMatches = filter.city ? person.city === filter.city : true;
      const departmentMatches = filter.department ? person.department === filter.department : true;
      const interestMatches = filter.interests?.length
        ? filter.interests.some((interest) => person.interests.includes(interest))
        : true;
      return cityMatches && departmentMatches && interestMatches;
    });
  }
};
