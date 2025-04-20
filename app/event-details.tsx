import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  ArrowLeft,
  Share2,
  Heart,
} from "lucide-react-native";
import Colors from "@/constants/colors";
import { events } from "@/mocks/events";
import { Event } from "@/types";

export default function EventDetailsScreen() {
  const { id, register } = useLocalSearchParams();
  const router = useRouter();
  const [showRegistrationPrompt, setShowRegistrationPrompt] = useState(false);

  // Find the event from the mock data
  // Include the additional events from events.tsx with FIXED IDs
  const additionalEvents = [
    {
      id: "e11", // Changed from e7 to e11 to avoid duplicate
      title: "Supply Chain Innovation Summit",
      organizer: "Global Supply Chain Association",
      date: "2024-02-15",
      time: "09:00 - 17:00",
      location: "Grand Conference Center, Cairo",
      description:
        "Join industry leaders to explore the latest innovations in supply chain management. This full-day summit features keynote speakers, panel discussions, and networking opportunities.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
      price: 149.99,
      category: "Conference",
      attendees: 350,
      isRegistered: false,
    },
    {
      id: "e12", // Changed from e8 to e12 to avoid duplicate
      title: "Small Business Financing Workshop",
      organizer: "Egyptian Entrepreneurship Association",
      date: "2024-02-20",
      time: "13:00 - 16:00",
      location: "Business Development Center, Alexandria",
      description:
        "Learn about financing options available for small businesses in Egypt. This workshop covers loans, grants, venture capital, and alternative funding sources.",
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop",
      price: 0,
      category: "Workshop",
      attendees: 75,
      isRegistered: false,
    },
    {
      id: "e13", // Changed from e9 to e13 to avoid duplicate
      title: "Digital Inventory Management Systems",
      organizer: "Tech for Business Association",
      date: "2024-03-05",
      time: "10:00 - 14:00",
      location: "Tech Hub, Cairo",
      description:
        "Discover how digital inventory management systems can streamline your operations and reduce costs. Includes live demonstrations of popular software solutions.",
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2053&auto=format&fit=crop",
      price: 79.99,
      category: "Technology",
      attendees: 120,
      isRegistered: false,
    },
    {
      id: "e14", // Changed from e10 to e14 to avoid duplicate
      title: "International Trade Regulations Seminar",
      organizer: "Egyptian Export Association",
      date: "2024-03-15",
      time: "09:00 - 12:00",
      location: "Trade Center, Port Said",
      description:
        "Stay updated on the latest international trade regulations affecting Egyptian businesses. This seminar covers tariffs, customs procedures, and compliance requirements.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
      price: 99.99,
      category: "Seminar",
      attendees: 90,
      isRegistered: false,
    },
  ];

  const allEvents = [...events, ...additionalEvents];
  const event = allEvents.find((e) => e.id === id) as Event;

  useEffect(() => {
    if (register === "true" && event && !event.isRegistered) {
      setShowRegistrationPrompt(true);
    }
  }, [register, event]);

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Event not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleRegister = () => {
    if (event.isRegistered) {
      Alert.alert(
        "Already Registered",
        "You are already registered for this event.",
        [{ text: "OK" }]
      );
    } else {
      if (event.price === 0 || event.price === undefined) {
        // Free event - just confirm registration
        Alert.alert(
          "Confirm Registration",
          `Would you like to register for "${event.title}"? This event is free.`,
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Register",
              onPress: () => {
                Alert.alert(
                  "Registration Successful",
                  "You have successfully registered for this event!",
                  [{ text: "OK" }]
                );
              },
            },
          ]
        );
      } else {
        // Paid event - navigate to payment screen
        router.push({
          pathname: "/event-payment", //flag
          params: {
            id: event.id,
            title: event.title,
            price: event.price.toString(),
            date: event.date,
            time: event.time,
          },
        });
      }
    }
  };

  const handleShare = () => {
    Alert.alert("Share Event", "Share this event with your contacts", [
      { text: "OK" },
    ]);
  };

  const handleSave = () => {
    Alert.alert("Save Event", "Event saved to your favorites", [
      { text: "OK" },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: event.image }}
            style={styles.eventImage}
            resizeMode="cover"
          />

          <TouchableOpacity
            style={styles.backIconButton}
            onPress={() => router.back()}
          >
            <View style={styles.iconBackground}>
              <ArrowLeft size={20} color={Colors.neutral.black} />
            </View>
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <View style={styles.iconBackground}>
                <Share2 size={20} color={Colors.neutral.black} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
              <View style={styles.iconBackground}>
                <Heart size={20} color={Colors.neutral.black} />
              </View>
            </TouchableOpacity>
          </View>

          {event.isRegistered && (
            <View style={styles.registeredBadge}>
              <Text style={styles.registeredText}>Registered</Text>
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{event.title}</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{event.category || "General"}</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Calendar
                size={20}
                color={Colors.neutral.gray}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>{formatDate(event.date)}</Text>
            </View>

            <View style={styles.infoItem}>
              <Clock
                size={20}
                color={Colors.neutral.gray}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>{event.time}</Text>
            </View>

            <View style={styles.infoItem}>
              <MapPin
                size={20}
                color={Colors.neutral.gray}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>{event.location}</Text>
            </View>

            <View style={styles.infoItem}>
              <User
                size={20}
                color={Colors.neutral.gray}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>
                Organized by {event.organizer}
              </Text>
            </View>

            {event.attendees && (
              <View style={styles.infoItem}>
                <Users
                  size={20}
                  color={Colors.neutral.gray}
                  style={styles.infoIcon}
                />
                <Text style={styles.infoText}>{event.attendees} Attendees</Text>
              </View>
            )}
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>About Event</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>

          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.price}>
              {event.price === 0 || event.price === undefined
                ? "Free"
                : `$${event.price.toFixed(2)}`}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.registerButton,
            event.isRegistered && styles.registeredButton,
          ]}
          onPress={handleRegister}
        >
          <Text
            style={[
              styles.registerButtonText,
              event.isRegistered && styles.registeredButtonText,
            ]}
          >
            {event.isRegistered ? "Already Registered" : "Register Now"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Registration prompt */}
      {showRegistrationPrompt && (
        <View style={styles.promptOverlay}>
          <View style={styles.promptContainer}>
            <Text style={styles.promptTitle}>Register for Event</Text>
            <Text style={styles.promptDescription}>
              Would you like to register for "{event.title}"?
              {typeof event.price === "number" &&
                event.price > 0 &&
                `\n\nPrice: $${event.price.toFixed(2)}`}
            </Text>
            <View style={styles.promptButtons}>
              <TouchableOpacity
                style={styles.promptCancelButton}
                onPress={() => setShowRegistrationPrompt(false)}
              >
                <Text style={styles.promptCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.promptConfirmButton}
                onPress={() => {
                  setShowRegistrationPrompt(false);
                  handleRegister();
                }}
              >
                <Text style={styles.promptConfirmText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: Colors.neutral.darkGray,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: Colors.primary.burgundy,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: Colors.neutral.white,
    fontWeight: "500",
  },
  imageContainer: {
    position: "relative",
  },
  eventImage: {
    width: "100%",
    height: 250,
  },
  backIconButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
  },
  actionButtons: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    zIndex: 10,
  },
  actionButton: {
    marginLeft: 8,
  },
  iconBackground: {
    backgroundColor: Colors.neutral.white,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  registeredBadge: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: Colors.primary.burgundy,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  registeredText: {
    color: Colors.neutral.white,
    fontSize: 12,
    fontWeight: "500",
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.neutral.black,
    marginBottom: 8,
  },
  categoryContainer: {
    backgroundColor: Colors.neutral.extraLightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  category: {
    fontSize: 14,
    color: Colors.neutral.darkGray,
    fontWeight: "500",
  },
  infoSection: {
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoIcon: {
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    color: Colors.neutral.darkGray,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.neutral.black,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.neutral.darkGray,
    lineHeight: 24,
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.extraLightGray,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.neutral.darkGray,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary.burgundy,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.extraLightGray,
  },
  registerButton: {
    backgroundColor: Colors.primary.burgundy,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  registeredButton: {
    backgroundColor: Colors.neutral.extraLightGray,
  },
  registerButtonText: {
    color: Colors.neutral.white,
    fontSize: 16,
    fontWeight: "600",
  },
  registeredButtonText: {
    color: Colors.neutral.darkGray,
  },
  promptOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  promptContainer: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 16,
    padding: 24,
    width: "85%",
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  promptTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.neutral.black,
    marginBottom: 16,
    textAlign: "center",
  },
  promptDescription: {
    fontSize: 16,
    color: Colors.neutral.darkGray,
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 22,
  },
  promptButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  promptCancelButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.lightGray,
    borderRadius: 8,
    alignItems: "center",
  },
  promptCancelText: {
    color: Colors.neutral.darkGray,
    fontSize: 16,
    fontWeight: "500",
  },
  promptConfirmButton: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    backgroundColor: Colors.primary.burgundy,
    borderRadius: 8,
    alignItems: "center",
  },
  promptConfirmText: {
    color: Colors.neutral.white,
    fontSize: 16,
    fontWeight: "500",
  },
});
