import { Stack } from "expo-router";

export default function AppLayout() {
    return (
        <Stack>
            {/* Login */}
            <Stack.Screen name="Login" options={{ title: 'Login', headerShown: false }} />
        </Stack>
    );
}

