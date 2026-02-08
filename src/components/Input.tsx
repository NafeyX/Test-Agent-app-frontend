import React from 'react';
import {
    TextInput,
    View,
    Text,
    StyleSheet,
    ViewStyle,
    TextInputProps,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme/theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    containerStyle,
    ...props
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                placeholderTextColor={COLORS.placeholder}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.md,
        width: '100%',
    },
    label: {
        color: COLORS.text,
        marginBottom: SPACING.xs,
        ...TYPOGRAPHY.body as any,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        padding: SPACING.md,
        color: COLORS.text,
        backgroundColor: COLORS.surface,
        ...TYPOGRAPHY.body as any,
    },
    inputError: {
        borderColor: COLORS.error,
    },
    errorText: {
        color: COLORS.error,
        fontSize: 12,
        marginTop: 2,
    },
});
