import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { RegisterScreenProps } from '../types/navigation';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { register } from '../api/auth';

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const response = await register({ name, email, password });
            Alert.alert('Success', 'Account created successfully', [
                { text: 'OK', onPress: () => navigation.replace('Home', { user: response }) }
            ]);
        } catch (error: any) {
            Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to get started</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Name"
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                    />
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <Button
                        title="Register"
                        onPress={handleRegister}
                        loading={loading}
                        style={styles.button}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.link}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        flexGrow: 1,
        padding: SPACING.lg,
        justifyContent: 'center',
    },
    header: {
        marginBottom: SPACING.xl,
        alignItems: 'center',
    },
    title: {
        ...TYPOGRAPHY.h1 as any,
        color: COLORS.primary,
    },
    subtitle: {
        ...TYPOGRAPHY.body as any,
        color: COLORS.text,
        marginTop: SPACING.xs,
    },
    form: {
        backgroundColor: COLORS.surface,
        padding: SPACING.lg,
        borderRadius: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    button: {
        marginTop: SPACING.md,
        width: '100%',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SPACING.lg,
    },
    footerText: {
        ...TYPOGRAPHY.body as any,
        color: COLORS.text,
    },
    link: {
        ...TYPOGRAPHY.body as any,
        color: COLORS.primary,
        fontWeight: '600',
    },
});

export default RegisterScreen;
