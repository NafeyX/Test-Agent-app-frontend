import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    loading = false,
    style,
    textStyle,
    disabled = false,
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, style, (disabled || loading) && styles.disabled]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}>
            {loading ? (
                <ActivityIndicator color={COLORS.onPrimary} />
            ) : (
                <Text style={[styles.text, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.xl,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 150,
    },
    text: {
        color: COLORS.onPrimary,
        ...TYPOGRAPHY.button as any,
    },
    disabled: {
        opacity: 0.6,
    },
});
