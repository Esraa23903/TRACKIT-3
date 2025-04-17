import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/colors';
import { ArrowLeft, User, Phone, MapPin, Briefcase, ChevronDown } from 'lucide-react-native';
import { useAuthStore } from '@/store/auth-store';

export default function BusinessInfoScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const userType = user?.userType || 'business';
  
  const [formData, setFormData] = useState({
    ownerName: '',
    phoneNumber: '',
    address: '',
    businessField: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showFieldDropdown, setShowFieldDropdown] = useState(false);
  
  const businessFields = [
    'Food & Beverage',
    'Retail',
    'Manufacturing',
    'Technology',
    'Healthcare',
    'Education',
    'Hospitality',
    'Construction',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    
    // Clear error when typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Business address is required';
    }
    
    if (!formData.businessField.trim()) {
      newErrors.businessField = 'Business field is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // In a real app, you would save this information to your user profile
      
      // Go directly to dashboard for all user types
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color={Colors.neutral.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Business Information</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.subtitle}>
            Please provide additional information about your business
          </Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Owner Name</Text>
              <View style={[styles.inputContainer, errors.ownerName ? styles.inputError : null]}>
                <User size={20} color={Colors.neutral.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter owner name"
                  value={formData.ownerName}
                  onChangeText={(text) => handleInputChange('ownerName', text)}
                />
              </View>
              {errors.ownerName ? <Text style={styles.errorText}>{errors.ownerName}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={[styles.inputContainer, errors.phoneNumber ? styles.inputError : null]}>
                <Phone size={20} color={Colors.neutral.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChangeText={(text) => handleInputChange('phoneNumber', text)}
                  keyboardType="phone-pad"
                />
              </View>
              {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Business Address</Text>
              <View style={[styles.inputContainer, errors.address ? styles.inputError : null]}>
                <MapPin size={20} color={Colors.neutral.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter business address"
                  value={formData.address}
                  onChangeText={(text) => handleInputChange('address', text)}
                />
              </View>
              {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Business Field</Text>
              <TouchableOpacity 
                style={[
                  styles.dropdownButton, 
                  errors.businessField ? styles.inputError : null
                ]}
                onPress={() => setShowFieldDropdown(!showFieldDropdown)}
              >
                <Briefcase size={20} color={Colors.neutral.gray} style={styles.inputIcon} />
                <Text style={formData.businessField ? styles.dropdownText : styles.dropdownPlaceholder}>
                  {formData.businessField || "Select business field"}
                </Text>
                <ChevronDown size={20} color={Colors.neutral.gray} />
              </TouchableOpacity>
              {errors.businessField ? <Text style={styles.errorText}>{errors.businessField}</Text> : null}
              
              {showFieldDropdown && (
                <View style={styles.dropdownMenu}>
                  {businessFields.map((field) => (
                    <TouchableOpacity
                      key={field}
                      style={styles.dropdownItem}
                      onPress={() => {
                        handleInputChange('businessField', field);
                        setShowFieldDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{field}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 8,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.neutral.black,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    padding: 24,
    paddingTop: 0,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.neutral.gray,
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.neutral.gray,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.extraLightGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: Colors.neutral.white,
  },
  inputError: {
    borderColor: Colors.status.error,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: Colors.neutral.black,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral.extraLightGray,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: Colors.neutral.white,
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    color: Colors.neutral.black,
  },
  dropdownPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: Colors.neutral.gray,
  },
  dropdownMenu: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    marginTop: 4,
    borderWidth: 1,
    borderColor: Colors.neutral.extraLightGray,
    maxHeight: 200,
    ...Platform.select({
      ios: {
        shadowColor: Colors.neutral.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.extraLightGray,
  },
  dropdownItemText: {
    fontSize: 16,
    color: Colors.neutral.black,
  },
  errorText: {
    color: Colors.status.error,
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  footer: {
    padding: 24,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.extraLightGray,
  },
  submitButton: {
    backgroundColor: Colors.primary.burgundy,
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: Colors.neutral.white,
    fontSize: 16,
    fontWeight: '600',
  },
});