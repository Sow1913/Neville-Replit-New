import { StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function DashboardScreen() {
  const handleProductModule = () => {
    router.push("/product-list");
  };

  const handleOrderModule = () => {
    router.push("/order-list");
  };

  const handleLogout = () => {
    router.replace("/login");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Dashboard</ThemedText>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <ThemedView style={styles.logoutButtonInner}>
            <IconSymbol
              name="rectangle.portrait.and.arrow.right"
              size={20}
              color="#ffffff"
            />
            <ThemedText style={styles.logoutText}>Logout</ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.moduleContainer}>
        <TouchableOpacity
          style={styles.moduleButton}
          onPress={handleProductModule}
        >
          <IconSymbol name="cube.fill" size={40} color="#ffffff" />
          <ThemedText style={styles.moduleButtonText}>
            Product Module
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.moduleButton}
          onPress={handleOrderModule}
        >
          <IconSymbol name="cart.fill" size={40} color="#ffffff" />
          <ThemedText style={styles.moduleButtonText}>Order Module</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 40,
  },
  logoutButton: {
    padding: 10, // Added padding for better spacing
    backgroundColor: "#ff0000", // Changed to red color
    borderRadius: 5, // Added rounded corners
  },
  logoutButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  logoutText: {
    color: "#000000", // Changed to black color
    fontWeight: "bold",
  },
  moduleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  moduleButton: {
    backgroundColor: "#0760f0",
    width: "80%",
    height: 120,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
  },
  moduleButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
