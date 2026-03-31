import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Input } from '../components/Input';
import { useForm } from '../hooks/useForm';

export default function ContactForm() {
  const {
    formData,
    errors,
    isLoading,
    status,
    errorMessage,
    handleChange,
    handleSubmit,
    reset,
  } = useForm();

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>GET IN TOUCH.</Text>
            <Text style={styles.subtitle}>
              We'll get back to you sometime soon.
            </Text>
          </View>

          {status === 'success' && (
            <View style={styles.successBanner}>
              <Text style={styles.successIcon}>✓</Text>
              <View style={styles.flex}>
                <Text style={styles.successTitle}>Message sent!</Text>
                <Text style={styles.successBody}>
                  Thanks for reaching out. We'll be in touch soon.
                </Text>
              </View>
            </View>
          )}

          {status === 'error' && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerIcon}>!</Text>
              <View style={styles.flex}>
                <Text style={styles.errorBannerTitle}>Something went wrong</Text>
                <Text style={styles.errorBannerBody}>{errorMessage}</Text>
              </View>
            </View>
          )}

          <View style={styles.form}>
            <Input
              label="Full name"
              placeholder="Maya Swaminathan"
              value={formData.name}
              onChangeText={handleChange('name')}
              error={errors.name}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="next"
            />

            <Input
              label="Email address"
              placeholder="mayasswaminathan@gmail.com"
              value={formData.email}
              onChangeText={handleChange('email')}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
            />

            <Input
              label="Message"
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              value={formData.message}
              onChangeText={handleChange('message')}
              error={errors.message}
              multiline
              numberOfLines={5}
              style={styles.textarea}
              returnKeyType="done"
            />

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Send message</Text>
              )}
            </TouchableOpacity>

            {(status === 'success' || status === 'error') && (
              <TouchableOpacity onPress={reset} style={styles.resetButton}>
                <Text style={styles.resetText}>Send another message</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#09001f',
    justifyContent: 'center'
  },
  flex: {
    flex: 1,
  },
  scroll: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 28,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    fontSize: 30,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: "Menlo",
    letterSpacing: -0.5,
  },
  subtitle: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 6,
    fontSize: 15,
    color: '#ffffff',
    fontFamily: "Menlo",
    lineHeight: 22
  },
  form: {
    marginTop: 8,
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  button: {
    backgroundColor: '#2b2ee9',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    minHeight: 54,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#a5b4fc',
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: "Menlo",
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  resetButton: {
    marginTop: 16,
    alignItems: 'center',
    padding: 8,
  },
  resetText: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#86efac',
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
  },
  successIcon: {
    fontSize: 16,
    color: '#16a34a',
    fontWeight: '700',
  },
  successTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#15803d',
  },
  successBody: {
    fontSize: 13,
    color: '#16a34a',
    marginTop: 2,
    lineHeight: 18,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#fff5f5',
    borderWidth: 1,
    borderColor: '#fca5a5',
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
  },
  errorBannerIcon: {
    fontSize: 16,
    color: '#dc2626',
    fontWeight: '700',
  },
  errorBannerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dc2626',
  },
  errorBannerBody: {
    fontSize: 13,
    color: '#ef4444',
    marginTop: 2,
    lineHeight: 18,
  },
});
