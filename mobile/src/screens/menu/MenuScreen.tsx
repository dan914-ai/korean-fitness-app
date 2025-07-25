import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../constants/colors';
import authService from '../../services/auth.service';

export default function MenuScreen() {
  const handleLogout = async () => {
    await authService.logout();
    // Navigation will be handled by auth state change
  };

  const menuItems = [
    { icon: 'person', title: '프로필', onPress: () => {} },
    { icon: 'fitness-center', title: '운동 프로그램', onPress: () => {} },
    { icon: 'emoji-events', title: '업적', onPress: () => {} },
    { icon: 'settings', title: '설정', onPress: () => {} },
    { icon: 'help', title: '도움말', onPress: () => {} },
    { icon: 'logout', title: '로그아웃', onPress: handleLogout },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Icon name="person" size={40} color={Colors.textLight} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.username}>사용자</Text>
            <Text style={styles.tier}>브론즈 티어</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuList}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <Icon name={item.icon} size={24} color={Colors.text} />
            <Text style={styles.menuItemText}>{item.title}</Text>
            <Icon name="chevron-right" size={24} color={Colors.textLight} />
          </TouchableOpacity>
        ))}
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
    backgroundColor: Colors.surface,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 16,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  tier: {
    fontSize: 16,
    color: Colors.bronze,
    marginTop: 4,
  },
  menuList: {
    backgroundColor: Colors.surface,
    marginTop: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    marginLeft: 16,
  },
});