import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { events } from '@/mocks/events';
import { Event } from '@/types';
import { Calendar, MapPin, Clock, Check, X } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';

export default function EventsScreen() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const router = useRouter();
  const { user } = useAuthStore();
  const userType = user?.userType || 'business';
  
  // For event managers, show event requests instead of regular events
  const isEventManager = userType === 'organizer';
  
  // Mock event requests for event managers
  const eventRequests = [
    {
      id: 'er1',
      title: 'Coffee Tasting Workshop',
      organizer: "Mostafa's Gourmet Market",
      date: '2023-12-15',
      time: '14:00 - 16:00',
      location: 'Downtown Conference Center',
      description: 'A workshop to taste and learn about different coffee varieties.',
      status: 'pending'
    },
    {
      id: 'er2',
      title: 'Local Suppliers Meetup',
      organizer: 'Cairo Chamber of Commerce',
      date: '2023-12-20',
      time: '10:00 - 13:00',
      location: 'Business Hub, Cairo',
      description: 'Networking event for local suppliers and business owners.',
      status: 'pending'
    },
    {
      id: 'er3',
      title: 'Inventory Management Seminar',
      organizer: 'Supply Chain Association',
      date: '2024-01-10',
      time: '09:00 - 12:00',
      location: 'Tech Park Conference Room',
      description: 'Learn best practices for inventory management.',
      status: 'pending'
    }
  ];
  
  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());
  const pastEvents = events.filter(event => new Date(event.date) < new Date());

  const handleEventPress = (event: Event) => {
    // Navigate to event details
    router.push({
      pathname: '/event-details',
      params: { id: event.id }
    });
  };

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
            style: "cancel"
          },
          {
            text: "Reserve",
            onPress: () => {
              // In a real app, this would call an API to reserve the spot
              Alert.alert(
                "Success",
                "Your spot has been reserved successfully!",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      // Refresh the events list or update the UI
                      console.log("Spot reserved for event:", event.id);
                    }
                  }
                ]
              );
            }
          }
        ]
      );
    }
  };

  const handleEventRequestAction = (requestId: string, action: 'approve' | 'reject') => {
    Alert.alert(
      action === 'approve' ? "Approve Event" : "Reject Event",
      `Are you sure you want to ${action} this event request?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: action === 'approve' ? "Approve" : "Reject",
          style: action === 'approve' ? "default" : "destructive",
          onPress: () => {
            // In a real app, this would call an API to approve/reject the event
            Alert.alert(
              "Success",
              `Event request has been ${action === 'approve' ? 'approved' : 'rejected'}.`,
              [{ text: "OK" }]
            );
          }
        }
      ]
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
        <Text style={styles.eventTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.eventCategory}>{item.category}</Text>
        
        <View style={styles.eventDetails}>
          <View style={styles.eventDetailItem}>
            <Calendar size={16} color={Colors.neutral.gray} style={styles.eventDetailIcon} />
            <Text style={styles.eventDetailText}>{formatDate(item.date)}</Text>
          </View>
          
          <View style={styles.eventDetailItem}>
            <Clock size={16} color={Colors.neutral.gray} style={styles.eventDetailIcon} />
            <Text style={styles.eventDetailText}>{item.time}</Text>
          </View>
          
          <View style={styles.eventDetailItem}>
            <MapPin size={16} color={Colors.neutral.gray} style={styles.eventDetailIcon} />
            <Text style={styles.eventDetailText} numberOfLines={1}>{item.location}</Text>
          </View>
        </View>
        
        <View style={styles.eventFooter}>
          <Text style={styles.eventPrice}>
            {item.price === 0 ? 'Free' : `$${item.price.toFixed(2)}`}
          </Text>
          <TouchableOpacity 
            style={[
              styles.eventButton,
              item.isRegistered && styles.registeredButton
            ]}
            onPress={() => handleReserveSpot(item)}
          >
            <Text style={[
              styles.eventButtonText,
              item.isRegistered && styles.registeredButtonText
            ]}>
              {item.isRegistered ? 'View Details' : 'Reserve Spot'}
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
          <Calendar size={16} color={Colors.neutral.gray} style={styles.eventDetailIcon} />
          <Text style={styles.eventDetailText}>{formatDate(item.date)}</Text>
        </View>
        
        <View style={styles.eventDetailItem}>
          <Clock size={16} color={Colors.neutral.gray} style={styles.eventDetailIcon} />
          <Text style={styles.eventDetailText}>{item.time}</Text>
        </View>
        
        <View style={styles.eventDetailItem}>
          <MapPin size={16} color={Colors.neutral.gray} style={styles.eventDetailIcon} />
          <Text style={styles.eventDetailText} numberOfLines={1}>{item.location}</Text>
        </View>
      </View>
      
      <Text style={styles.requestDescription}>{item.description}</Text>
      
      <View style={styles.requestActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.rejectButton]}
          onPress={() => handleEventRequestAction(item.id, 'reject')}
        >
          <X size={16} color={Colors.status.error} style={styles.actionIcon} />
          <Text style={[styles.actionText, styles.rejectText]}>Reject</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.approveButton]}
          onPress={() => handleEventRequestAction(item.id, 'approve')}
        >
          <Check size={16} color={Colors.status.success} style={styles.actionIcon} />
          <Text style={[styles.actionText, styles.approveText]}>Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isEventManager ? 'Event Management' : 'Events'}
        </Text>
        
        {!isEventManager && (
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]} 
              onPress={() => setActiveTab('upcoming')}
            >
              <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
                Upcoming
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'past' && styles.activeTab]} 
              onPress={() => setActiveTab('past')}
            >
              <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
                Past
              </Text>
            </TouchableOpacity>
          </View>
        )}
        
        {isEventManager && (
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]} 
              onPress={() => setActiveTab('upcoming')}
            >
              <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
                Requests
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'past' && styles.activeTab]} 
              onPress={() => setActiveTab('past')}
            >
              <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
                Events
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {isEventManager && activeTab === 'upcoming' ? (
        <FlatList
          data={eventRequests}
          renderItem={renderEventRequestCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={activeTab === 'upcoming' ? upcomingEvents : pastEvents}
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
          onPress={() => router.push('/add-event')}
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
    fontWeight: 'bold',
    color: Colors.neutral.black,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: Colors.primary.burgundy,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
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
    overflow: 'hidden',
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  eventImage: {
    width: '100%',
    height: 160,
  },
  registeredBadge: {
    position: 'absolute',
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
    fontWeight: '500',
  },
  eventContent: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
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
    flexDirection: 'row',
    alignItems: 'center',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventPrice: {
    fontSize: 16,
    fontWeight: '600',
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
    fontWeight: '500',
  },
  registeredButtonText: {
    color: Colors.neutral.darkGray,
  },
  addButton: {
    position: 'absolute',
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
    width: '100%',
    height: '100%',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary.burgundy,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
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
    fontWeight: '600',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  rejectButton: {
    backgroundColor: Colors.status.errorLight,
    borderWidth: 1,
    borderColor: Colors.status.error,
  },
  approveButton: {
    backgroundColor: Colors.status.successLight,
    borderWidth: 1,
    borderColor: Colors.status.success,
  },
  actionIcon: {
    marginRight: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  rejectText: {
    color: Colors.status.error,
  },
  approveText: {
    color: Colors.status.success,
  },
});