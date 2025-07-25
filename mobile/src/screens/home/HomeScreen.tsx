import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/colors';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>안녕하세요! 💪</Text>
        <Text style={styles.date}>오늘의 운동을 시작해보세요</Text>
      </View>

      <TouchableOpacity style={styles.startButton}>
        <Icon name="play-arrow" size={32} color="#FFFFFF" />
        <Text style={styles.startButtonText}>운동 시작</Text>
      </TouchableOpacity>

      <View style={styles.quickStats}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>이번 주 운동</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>연속 일수</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>추천 프로그램</Text>
        <View style={styles.programCard}>
          <Text style={styles.programTitle}>초보자 전신 운동</Text>
          <Text style={styles.programDescription}>8주 프로그램 • 주 3회</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  date: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  startButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 12,
    gap: 12,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  programCard: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
  },
  programTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  programDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});