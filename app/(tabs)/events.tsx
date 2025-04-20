import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";
import { events } from "@/mocks/events";
import { Event } from "@/types";
import {
  Calendar,
  MapPin,
  Clock,
  Check,
  X,
  Ticket,
  User,
  DollarSign,
} from "lucide-react-native";
import { useAuthStore } from "@/store/auth-store";

export default function EventsScreen() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const router = useRouter();
  const { user } = useAuthStore();
  const userType = user?.userType || "business";

  // For event managers, show event requests instead of regular events
  const isEventManager = userType === "organizer";

  // Mock event requests for event managers
  const eventRequests = [
    {
      id: "er1",
      title: "Coffee Tasting Workshop",
      organizer: "Mostafa's Gourmet Market",
      date: "2023-12-15",
      time: "14:00 - 16:00",
      location: "Downtown Conference Center",
      description:
        "A workshop to taste and learn about different coffee varieties.",
      status: "pending",
    },
    {
      id: "er2",
      title: "Local Suppliers Meetup",
      organizer: "Cairo Chamber of Commerce",
      date: "2023-12-20",
      time: "10:00 - 13:00",
      location: "Business Hub, Cairo",
      description: "Networking event for local suppliers and business owners.",
      status: "pending",
    },
    {
      id: "er3",
      title: "Inventory Management Seminar",
      organizer: "Supply Chain Association",
      date: "2024-01-10",
      time: "09:00 - 12:00",
      location: "Tech Park Conference Room",
      description: "Learn best practices for inventory management.",
      status: "pending",
    },
    {
      id: "er4",
      title: "Digital Marketing for Small Businesses",
      organizer: "Tech Entrepreneurs Association",
      date: "2024-01-15",
      time: "13:00 - 16:00",
      location: "Innovation Hub, Alexandria",
      description:
        "Learn how to leverage digital marketing to grow your small business.",
      status: "pending",
    },
    {
      id: "er5",
      title: "Sustainable Supply Chain Workshop",
      organizer: "Green Business Alliance",
      date: "2024-01-22",
      time: "10:00 - 15:00",
      location: "Eco Center, Cairo",
      description:
        "Discover strategies for creating sustainable supply chains and reducing environmental impact.",
      status: "pending",
    },
  ];

  // Mock sold tickets for event organizers
  const soldTickets = [
    {
      id: "st1",
      eventTitle: "Coffee Industry Expo 2024",
      attendeeName: "Ahmed Mohamed",
      attendeeEmail: "ahmed.mohamed@example.com",
      purchaseDate: "2023-11-25",
      ticketType: "VIP",
      price: 149.99,
      eventDate: "2024-01-15",
      eventTime: "09:00 - 18:00",
      eventLocation: "Cairo International Convention Center",
    },
    {
      id: "st2",
      eventTitle: "Coffee Industry Expo 2024",
      attendeeName: "Fatima Ali",
      attendeeEmail: "fatima.ali@example.com",
      purchaseDate: "2023-11-26",
      ticketType: "Standard",
      price: 79.99,
      eventDate: "2024-01-15",
      eventTime: "09:00 - 18:00",
      eventLocation: "Cairo International Convention Center",
    },
    {
      id: "st3",
      eventTitle: "Supply Chain Innovation Summit",
      attendeeName: "Omar Hassan",
      attendeeEmail: "omar.hassan@example.com",
      purchaseDate: "2023-11-28",
      ticketType: "Early Bird",
      price: 99.99,
      eventDate: "2024-02-15",
      eventTime: "09:00 - 17:00",
      eventLocation: "Grand Conference Center, Cairo",
    },
    {
      id: "st4",
      eventTitle: "Supply Chain Innovation Summit",
      attendeeName: "Layla Ibrahim",
      attendeeEmail: "layla.ibrahim@example.com",
      purchaseDate: "2023-11-30",
      ticketType: "VIP",
      price: 149.99,
      eventDate: "2024-02-15",
      eventTime: "09:00 - 17:00",
      eventLocation: "Grand Conference Center, Cairo",
    },
    {
      id: "st5",
      eventTitle: "Digital Inventory Management Systems",
      attendeeName: "Karim Mahmoud",
      attendeeEmail: "karim.mahmoud@example.com",
      purchaseDate: "2023-12-05",
      ticketType: "Standard",
      price: 79.99,
      eventDate: "2024-03-05",
      eventTime: "10:00 - 14:00",
      eventLocation: "Tech Hub, Cairo",
    },
  ];

  // Add more upcoming events - FIXED IDs to avoid duplicates
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

  // Combine original events with additional events
  const allEvents = [...events, ...additionalEvents];
  /*
  const upcomingEvents = allEvents.filter(
    (event) => new Date(event.date) >= new Date()
  );
  const pastEvents = allEvents.filter(
    (event) => new Date(event.date) < new Date()
  );

 
  */
  const now = Date.now();
  const handleEventPress = (event: Event) => {
    const path = `/event-details?id=${event.id}` as any;
    // Navigate to event details
    router.push(path);
  };

  const upcomingEvents: Event[] = allEvents
    .filter((e) => new Date(e.date).getTime() >= now)
    .map((e) => ({
      ...e,
      status: "upcoming" as const,
    }));

  const pastEvents: Event[] = allEvents
    .filter((e) => new Date(e.date).getTime() < now)
    .map((e) => ({
      ...e,
      status: "past" as const,
    }));

  const handleReserveSpot = (event: Event) => {
    if (event.isRegistered) {
      // If already registered, just view details
      handleEventPress(event);
    } else {
      // If not registered, show confirmation dialog
      Alert.alert(
        "Reserve Spot",
        `Would you like to reserve a spot for "${event.title}"?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Reserve",
            onPress: () => {
              // Navigate to event details for registration and payment
              router.push(`/event-details?id=${event.id}&register=true` as any);
            },
          },
        ]
      );
    }
  };

  const handleEventRequestAction = (
    requestId: string,
    action: "approve" | "reject"
  ) => {
    Alert.alert(
      action === "approve" ? "Approve Event" : "Reject Event",
      `Are you sure you want to ${action} this event request?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: action === "approve" ? "Approve" : "Reject",
          style: action === "approve" ? "default" : "destructive",
          onPress: () => {
            // In a real app, this would call an API to approve/reject the event
            Alert.alert(
              "Success",
              `Event request has been ${
                action === "approve" ? "approved" : "rejected"
              }.`,
              [{ text: "OK" }]
            );
          },
        },
      ]
    );
  };

  const handleViewTicketDetails = (ticket: any) => {
    Alert.alert(
      "Ticket Details",
      `Attendee: ${ticket.attendeeName}
Email: ${ticket.attendeeEmail}
Event: ${ticket.eventTitle}
Date: ${formatDate(ticket.eventDate)}
Ticket Type: ${ticket.ticketType}
Price: $${ticket.price.toFixed(2)}`,
      [{ text: "OK" }]
    );
  };

  const renderEventCard = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => handleEventPress(item)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.eventImage}
        resizeMode="cover"
      />
      {item.isRegistered && (
        <View style={styles.registeredBadge}>
          <Text style={styles.registeredText}>Registered</Text>
        </View>
      )}
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.eventCategory}>{item.category || "General"}</Text>

        <View style={styles.eventDetails}>
          <View style={styles.eventDetailItem}>
            <Calendar
              size={16}
              color={Colors.neutral.gray}
              style={styles.eventDetailIcon}
            />
            <Text style={styles.eventDetailText}>{formatDate(item.date)}</Text>
          </View>

          <View style={styles.eventDetailItem}>
            <Clock
              size={16}
              color={Colors.neutral.gray}
              style={styles.eventDetailIcon}
            />
            <Text style={styles.eventDetailText}>{item.time}</Text>
          </View>

          <View style={styles.eventDetailItem}>
            <MapPin
              size={16}
              color={Colors.neutral.gray}
              style={styles.eventDetailIcon}
            />
            <Text style={styles.eventDetailText} numberOfLines={1}>
              {item.location}
            </Text>
          </View>
        </View>

        <View style={styles.eventFooter}>
          <Text style={styles.eventPrice}>
            {item.price === 0 || item.price === undefined
              ? "Free"
              : `$${item.price.toFixed(2)}`}
          </Text>
          <TouchableOpacity
            style={[
              styles.eventButton,
              item.isRegistered && styles.registeredButton,
            ]}
            onPress={() => handleReserveSpot(item)}
          >
            <Text
              style={[
                styles.eventButtonText,
                item.isRegistered && styles.registeredButtonText,
              ]}
            >
              {item.isRegistered ? "View Details" : "Reserve Spot"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEventRequestCard = ({ item }: { item: any }) => (
    <View style={styles.requestCard}>
      <View style={styles.requestHeader}>
        <Text style={styles.requestTitle}>{item.title}</Text>
        <Text style={styles.requestOrganizer}>By: {item.organizer}</Text>
      </View>

      <View style={styles.eventDetails}>
        <View style={styles.eventDetailItem}>
          <Calendar
            size={16}
            color={Colors.neutral.gray}
            style={styles.eventDetailIcon}
          />
          <Text style={styles.eventDetailText}>{formatDate(item.date)}</Text>
        </View>

        <View style={styles.eventDetailItem}>
          <Clock
            size={16}
            color={Colors.neutral.gray}
            style={styles.eventDetailIcon}
          />
          <Text style={styles.eventDetailText}>{item.time}</Text>
        </View>

        <View style={styles.eventDetailItem}>
          <MapPin
            size={16}
            color={Colors.neutral.gray}
            style={styles.eventDetailIcon}
          />
          <Text style={styles.eventDetailText} numberOfLines={1}>
            {item.location}
          </Text>
        </View>
      </View>

      <Text style={styles.requestDescription}>{item.description}</Text>

      <View style={styles.requestActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.rejectButton]}
          onPress={() => handleEventRequestAction(item.id, "reject")}
        >
          <X size={16} color={Colors.status.error} style={styles.actionIcon} />
          <Text style={[styles.actionText, styles.rejectText]}>Reject</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.approveButton]}
          onPress={() => handleEventRequestAction(item.id, "approve")}
        >
          <Check
            size={16}
            color={Colors.status.success}
            style={styles.actionIcon}
          />
          <Text style={[styles.actionText, styles.approveText]}>Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSoldTicketCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.ticketCard}
      onPress={() => handleViewTicketDetails(item)}
      activeOpacity={0.7}
    >
      <View style={styles.ticketHeader}>
        <View style={styles.ticketIconContainer}>
          <Ticket size={24} color={Colors.primary.burgundy} />
        </View>
        <View style={styles.ticketHeaderContent}>
          <Text style={styles.ticketEventTitle} numberOfLines={1}>
            {item.eventTitle}
          </Text>
          <Text style={styles.ticketPurchaseDate}>
            Purchased: {formatDate(item.purchaseDate)}
          </Text>
        </View>
      </View>

      <View style={styles.ticketDivider} />

      <View style={styles.ticketDetails}>
        <View style={styles.ticketDetailItem}>
          <User
            size={16}
            color={Colors.neutral.gray}
            style={styles.ticketDetailIcon}
          />
          <Text style={styles.ticketDetailLabel}>Attendee:</Text>
          <Text style={styles.ticketDetailText} numberOfLines={1}>
            {item.attendeeName}
          </Text>
        </View>

        <View style={styles.ticketDetailItem}>
          <Calendar
            size={16}
            color={Colors.neutral.gray}
            style={styles.ticketDetailIcon}
          />
          <Text style={styles.ticketDetailLabel}>Event Date:</Text>
          <Text style={styles.ticketDetailText}>
            {formatDate(item.eventDate)}
          </Text>
        </View>

        <View style={styles.ticketDetailItem}>
          <DollarSign
            size={16}
            color={Colors.neutral.gray}
            style={styles.ticketDetailIcon}
          />
          <Text style={styles.ticketDetailLabel}>Price:</Text>
          <Text style={styles.ticketDetailText}>${item.price.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.ticketFooter}>
        <View style={styles.ticketTypeBadge}>
          <Text style={styles.ticketTypeText}>{item.ticketType}</Text>
        </View>
        <Text style={styles.viewDetailsText}>View Details</Text>
      </View>
    </TouchableOpacity>
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isEventManager ? "Event Management" : "Events"}
        </Text>

        {!isEventManager && (
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
              onPress={() => setActiveTab("upcoming")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "upcoming" && styles.activeTabText,
                ]}
              >
                Upcoming
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === "past" && styles.activeTab]}
              onPress={() => setActiveTab("past")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "past" && styles.activeTabText,
                ]}
              >
                Past
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {isEventManager && (
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
              onPress={() => setActiveTab("upcoming")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "upcoming" && styles.activeTabText,
                ]}
              >
                Sold Tickets
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === "past" && styles.activeTab]}
              onPress={() => setActiveTab("past")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "past" && styles.activeTabText,
                ]}
              >
                Events
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {isEventManager && activeTab === "upcoming" ? (
        <FlatList
          data={soldTickets}
          renderItem={renderSoldTicketCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={activeTab === "upcoming" ? upcomingEvents : pastEvents}
          renderItem={renderEventCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Only show add button for event organizers */}
      {isEventManager && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/add-event")}
        >
          <View style={styles.addButtonGradient}>
            <Text style={styles.addButtonText}>+</Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.extraLightGray,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.neutral.black,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: Colors.primary.burgundy,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.neutral.gray,
  },
  activeTabText: {
    color: Colors.neutral.white,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  eventCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  eventImage: {
    width: "100%",
    height: 160,
  },
  registeredBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: Colors.primary.burgundy,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  registeredText: {
    color: Colors.neutral.white,
    fontSize: 12,
    fontWeight: "500",
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.neutral.black,
    marginBottom: 4,
  },
  eventCategory: {
    fontSize: 14,
    color: Colors.neutral.gray,
    marginBottom: 12,
  },
  eventDetails: {
    marginBottom: 16,
  },
  eventDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  eventDetailIcon: {
    marginRight: 8,
  },
  eventDetailText: {
    fontSize: 14,
    color: Colors.neutral.darkGray,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary.burgundy,
  },
  eventButton: {
    backgroundColor: Colors.primary.burgundy,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  registeredButton: {
    backgroundColor: Colors.neutral.extraLightGray,
  },
  eventButtonText: {
    color: Colors.neutral.white,
    fontSize: 14,
    fontWeight: "500",
  },
  registeredButtonText: {
    color: Colors.neutral.darkGray,
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary.burgundy,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.neutral.white,
  },
  // Event request card styles
  requestCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  requestHeader: {
    marginBottom: 12,
  },
  requestTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.neutral.black,
    marginBottom: 4,
  },
  requestOrganizer: {
    fontSize: 14,
    color: Colors.neutral.gray,
  },
  requestDescription: {
    fontSize: 14,
    color: Colors.neutral.darkGray,
    marginBottom: 16,
    lineHeight: 20,
  },
  requestActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  rejectButton: {
    backgroundColor: Colors.status.error,
    borderWidth: 1,
    borderColor: Colors.status.error,
  },
  approveButton: {
    backgroundColor: Colors.status.success,
    borderWidth: 1,
    borderColor: Colors.status.success,
  },
  actionIcon: {
    marginRight: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "500",
  },
  rejectText: {
    color: Colors.status.error,
  },
  approveText: {
    color: Colors.status.success,
  },
  // Sold ticket card styles
  ticketCard: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  ticketHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.neutral.white,
  },
  ticketIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary.burgundy + "20",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  ticketHeaderContent: {
    flex: 1,
  },
  ticketEventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.neutral.black,
    marginBottom: 4,
  },
  ticketPurchaseDate: {
    fontSize: 12,
    color: Colors.neutral.gray,
  },
  ticketDivider: {
    height: 1,
    backgroundColor: Colors.neutral.extraLightGray,
  },
  ticketDetails: {
    padding: 16,
  },
  ticketDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ticketDetailIcon: {
    marginRight: 8,
  },
  ticketDetailLabel: {
    fontSize: 14,
    color: Colors.neutral.gray,
    width: 80,
  },
  ticketDetailText: {
    flex: 1,
    fontSize: 14,
    color: Colors.neutral.darkGray,
    fontWeight: "500",
  },
  ticketFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.neutral.extraLightGray,
  },
  ticketTypeBadge: {
    backgroundColor: Colors.primary.burgundy,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ticketTypeText: {
    color: Colors.neutral.white,
    fontSize: 12,
    fontWeight: "500",
  },
  viewDetailsText: {
    fontSize: 14,
    color: Colors.primary.burgundy,
    fontWeight: "500",
  },
});
