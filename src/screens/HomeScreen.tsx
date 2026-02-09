import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { HomeScreenProps } from '../types/navigation';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';
import { Button } from '../components/Button';

const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
    const { user } = route.params;

    // Standard Animated API values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            })
        ]).start();
    }, [fadeAnim, slideAnim]);

    const handleLogout = () => {
        navigation.replace('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Animated.View
                    style={[
                        styles.welcomeCard,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}>
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
                    </View>

                    <Text style={styles.title}>Welcome!</Text>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>You have successfully connected to the backend.</Text>
                    </View>

                    <Button
                        testID="logout-button"
                        title="Logout"
                        onPress={handleLogout}
                        style={styles.logoutButton}
                    />
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        padding: SPACING.lg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeCard: {
        backgroundColor: COLORS.surface,
        padding: SPACING.xl,
        borderRadius: 24,
        alignItems: 'center',
        width: '100%',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    avatarText: {
        color: COLORS.onPrimary,
        fontSize: 32,
        fontWeight: 'bold',
    },
    title: {
        ...TYPOGRAPHY.h2 as any,
        color: COLORS.text,
    },
    userName: {
        ...TYPOGRAPHY.h1 as any,
        color: COLORS.primary,
        marginBottom: SPACING.xs,
    },
    userEmail: {
        ...TYPOGRAPHY.body as any,
        color: COLORS.text,
        opacity: 0.7,
        marginBottom: SPACING.xl,
    },
    infoBox: {
        backgroundColor: '#E8EAF6',
        padding: SPACING.md,
        borderRadius: 12,
        marginBottom: SPACING.xl,
        width: '100%',
    },
    infoText: {
        ...TYPOGRAPHY.body as any,
        color: COLORS.primary,
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: COLORS.error,
        width: '100%',
    },
});

export default HomeScreen;
