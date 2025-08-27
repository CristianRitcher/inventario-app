import { Stack } from "expo-router";

export default function AppLayout() {
    return (
        <Stack>
            {/* Acciones */}
            <Stack.Screen name="Auditoria" options={{ title: 'Auditoria', headerShown: false }} />
            <Stack.Screen name="Accion" options={{ title: 'Accion', headerShown: false }} />
            {/* Productos */}
            <Stack.Screen name="AgregarProducto" options={{ title: 'AgregarProducto', headerShown: false }} />
            <Stack.Screen name="VerProducto" options={{ title: 'VerProducto', headerShown: false }} />
            <Stack.Screen name="EditarProducto" options={{ title: 'EditarProducto', headerShown: false }} />
            {/* Items */}
            <Stack.Screen name="AgregarItem" options={{ title: 'AgregarItem', headerShown: false }} />
            <Stack.Screen name="VerItem" options={{ title: 'VerItem', headerShown: false }} />
            <Stack.Screen name="EditarItem" options={{ title: 'EditarItem', headerShown: false }} />
        </Stack>
    );
}