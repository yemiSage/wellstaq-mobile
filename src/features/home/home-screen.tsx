import { useMemo, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Bell, CalendarDays } from "lucide-react-native";
import { Image, Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/text";
import { useSessionStore } from "@/state/session-store";

const avatarImage = require("@/assets/images/avatar.png");
const eventImage = "https://www.figma.com/api/mcp/asset/87a65850-8121-4387-85e2-dd6da5b3c143";

const SUMMARY_ITEMS = [
  { label: "High Energy", emoji: "\u26A1" },
  { label: "Low Stress", emoji: "\u{1F9D8}" },
  { label: "Happy Mood", emoji: "\u{1F60A}" },
  { label: "Good Social", emoji: "\u{1F91D}" }
] as const;

const EVENTS = [
  {
    id: "mindful-living",
    title: "Mindful living session",
    date: "Thurs, Nov 14th 2024",
    location: "Online, Remote",
    cta: "RSVP Today"
  },
  {
    id: "guided-meditation",
    title: "Guided meditation",
    date: "Fri, Dec 1st 2024",
    location: "Online, Mobile",
    cta: "Sign Up"
  }
] as const;

const WEEKDAYS = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"] as const;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"] as const;

function getOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) {
    return "th";
  }

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatDisplayDate(date: Date) {
  const weekday = WEEKDAYS[date.getDay()];
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  return `${weekday}, ${month} ${day}${getOrdinalSuffix(day)} ${date.getFullYear()}`;
}

export function HomeScreen() {
  const email = useSessionStore((state) => state.session?.email);
  const firstName = email?.split("@")[0]?.split(/[._-]/)[0] || "Yemi";
  const displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <AppScreen padded={false} scroll={false}>
      <View style={styles.screen}>
        <View style={styles.topPanel}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Image source={{ uri: avatarImage }} style={styles.avatarImage} />
            </View>

            <View style={styles.greetingBlock}>
              <AppText style={styles.greeting}>
                Hello, <AppText style={styles.name}>{displayName}</AppText> {"\u{1F44B}"}
              </AppText>
              <AppText style={styles.subtitle}>Trust you are feeling good today</AppText>
            </View>

            <View style={styles.bellWrap}>
              <Bell size={24} color="#202020" strokeWidth={1.8} />
            </View>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.dateRow}>
              <View style={styles.dateInfo}>
                <CalendarDays size={18} color="#636363" strokeWidth={1.6} />
                <AppText style={styles.dateText}>{formatDisplayDate(selectedDate)}</AppText>
              </View>
              <Pressable onPress={() => setShowDatePicker(true)} hitSlop={8}>
                <AppText style={styles.editText}>Edit</AppText>
              </Pressable>
            </View>

            <AppText style={styles.summaryText}>Here's the summary of how you are doing this week</AppText>

            <View style={styles.summaryItems}>
              {SUMMARY_ITEMS.map((item) => (
                <View key={item.label} style={styles.summaryItem}>
                  <View style={styles.summaryEmojiCircle}>
                    <AppText style={styles.summaryEmoji}>{item.emoji}</AppText>
                  </View>
                  <AppText style={styles.summaryLabel}>{item.label}</AppText>
                </View>
              ))}
            </View>

            <View style={styles.wellnessScoreBlock}>
              <View style={styles.wellnessHeader}>
                <AppText style={styles.wellnessTitle}>Overall wellness score</AppText>
                <AppText style={styles.wellnessValue}>98%</AppText>
              </View>

              <View style={styles.progressBar}>
                {Array.from({ length: 15 }).map((_, i) => (
                  <View key={`seg1-${i}`} style={[styles.progressTick, { backgroundColor: "#DE5A3E" }]} />
                ))}
                {Array.from({ length: 15 }).map((_, i) => (
                  <View key={`seg2-${i}`} style={[styles.progressTick, { backgroundColor: "#F7CFA1" }]} />
                ))}
                {Array.from({ length: 28 }).map((_, i) => (
                  <View key={`seg3-${i}`} style={[styles.progressTick, { backgroundColor: "#5EBA7D" }]} />
                ))}
              </View>

              <AppText style={styles.wellnessFooterText}>Doing so great</AppText>
            </View>
          </View>
        </View>

        <View style={styles.eventsSection}>
          <View style={styles.sectionHeader}>
            <AppText style={styles.sectionTitle}>Featured Events</AppText>
            <AppText style={styles.seeMore}>See more</AppText>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.eventList}>
            {EVENTS.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <Image source={{ uri: eventImage }} style={styles.eventImage} />
                <View style={styles.eventBody}>
                  <View style={styles.eventMetaRow}>
                    <View style={styles.eventTag}>
                      <AppText style={styles.eventTagText}>{event.cta}</AppText>
                    </View>
                    <AppText style={styles.eventPrice}>Free</AppText>
                  </View>

                  <AppText numberOfLines={1} style={styles.eventTitle}>
                    {event.title}
                  </AppText>

                  <View style={styles.eventFooter}>
                    <CalendarDays size={18} color="#636363" strokeWidth={1.6} />
                    <AppText numberOfLines={1} style={styles.eventDate}>
                      {event.date}
                    </AppText>
                    <View style={styles.dot} />
                    <AppText numberOfLines={1} style={styles.eventLocation}>
                      {event.location}
                    </AppText>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
            maximumDate={new Date()}
          />
        )}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F2F2F2"
  },
  topPanel: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 32
  },
  header: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 32,
    backgroundColor: "#EFEFEF",
    borderWidth: 1,
    borderColor: "#FFDCB7",
    overflow: "hidden"
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 32
  },
  greetingBlock: {
    flex: 1,
    height: 48,
    justifyContent: "center",
    gap: 4
  },
  greeting: {
    fontFamily: "InterSemiBold",
    fontSize: 16,
    lineHeight: 24,
    color: "#5F5F5F"
  },
  name: {
    fontFamily: "InterSemiBold",
    fontSize: 16,
    lineHeight: 24,
    color: "#202020"
  },
  subtitle: {
    fontFamily: "InterMedium",
    fontSize: 14,
    lineHeight: 20,
    color: "#5F5F5F"
  },
  bellWrap: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  summaryCard: {
    width: "100%",
    borderRadius: 12,
    gap: 12,
    alignItems: "center"
  },
  dateRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  dateInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  dateText: {
    fontFamily: "InterMedium",
    fontSize: 14,
    lineHeight: 21,
    color: "#636363"
  },
  editText: {
    fontFamily: "InterMedium",
    fontSize: 14,
    lineHeight: 21,
    color: "#EA6A05"
  },
  summaryText: {
    alignSelf: "stretch",
    fontFamily: "InterSemiBold",
    fontSize: 15,
    lineHeight: 22.5,
    color: "#5F5F5F",
    marginBottom: 4
  },
  summaryItems: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  summaryItem: {
    width: 73,
    alignItems: "center",
    gap: 4
  },
  summaryEmojiCircle: {
    width: 44,
    height: 44,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    justifyContent: "center"
  },
  summaryEmoji: {
    fontSize: 25,
    lineHeight: 28,
    includeFontPadding: false
  },
  summaryLabel: {
    fontFamily: "InterMedium",
    fontSize: 14,
    lineHeight: 20,
    color: "#5F5F5F",
    textAlign: "center"
  },
  wellnessScoreBlock: {
    width: "100%",
    marginTop: 16,
    gap: 8,
  },
  wellnessHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wellnessTitle: {
    fontFamily: "InterSemiBold",
    fontSize: 16,
    lineHeight: 24,
    color: "#5F5F5F",
  },
  wellnessValue: {
    fontFamily: "InterSemiBold",
    fontSize: 16,
    lineHeight: 24,
    color: "#5F5F5F",
  },
  progressBar: {
    flexDirection: "row",
    width: "100%",
    height: 16,
    gap: 2,
  },
  progressTick: {
    flex: 1,
    borderRadius: 2,
  },
  wellnessFooterText: {
    fontFamily: "InterMedium",
    fontSize: 14,
    lineHeight: 21,
    color: "#5F5F5F",
  },
  downIcon: {
    marginTop: 4,
    width: 18,
    height: 18
  },
  eventsSection: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 14,
    paddingBottom: 24,
    backgroundColor: "#F2F2F2"
  },
  sectionHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14
  },
  sectionTitle: {
    fontFamily: "InterMedium",
    fontSize: 20,
    lineHeight: 30,
    color: "#202020"
  },
  seeMore: {
    fontFamily: "InterMedium",
    fontSize: 16,
    lineHeight: 24,
    color: "#EA6A05"
  },
  eventList: {
    gap: 9,
    paddingRight: 14
  },
  eventCard: {
    width: 253,
    alignSelf: "flex-start",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    padding: 4,
    gap: 6,
    overflow: "hidden"
  },
  eventImage: {
    width: "100%",
    height: 105,
    borderRadius: 12
  },
  eventBody: {
    paddingHorizontal: 4,
    paddingBottom: 10,
    gap: 6
  },
  eventMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  eventTag: {
    borderRadius: 100,
    backgroundColor: "rgba(72, 115, 45, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 2
  },
  eventTagText: {
    fontFamily: "InterMedium",
    fontSize: 14,
    lineHeight: 20,
    color: "#48732D"
  },
  eventPrice: {
    fontFamily: "InterMedium",
    fontSize: 14,
    lineHeight: 20,
    color: "#636363"
  },
  eventTitle: {
    fontFamily: "InterMedium",
    fontSize: 16,
    lineHeight: 24,
    color: "#202020"
  },
  eventFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  eventDate: {
    fontFamily: "InterMedium",
    fontSize: 14,
    lineHeight: 21,
    color: "#636363"
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D9D9D9"
  },
  eventLocation: {
    flex: 1,
    fontFamily: "InterMedium",
    fontSize: 14,
    lineHeight: 21,
    color: "#636363"
  },
  wellnessFooterText: {
    fontFamily: "InterMedium",
    fontSize: 14,
    lineHeight: 21,
    color: "#5F5F5F",
  }
});
