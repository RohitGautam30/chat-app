import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import imagePath from "@/src/constants/images";
// at top:
import { router } from "expo-router";



type ChatItem = {
  id: string;
  name: string;
  avatar?: any;
  last: string;
  time: string;
  unread?: number;
  muted?: boolean;
  pinned?: boolean;
};

const seed: ChatItem[] = [
  { id: "1", name: "Miya", avatar: imagePath.Girl, last: "Call me when free.", time: "12:32", unread: 2 },
];

const WPHome = () => {
  const [query, setQuery] = useState("");
  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? seed.filter(c => c.name.toLowerCase().includes(q)) : seed;
  }, [query]);

  const listRef = useRef<FlatList<ChatItem>>(null);
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: ChatItem }) => (
    
    <TouchableOpacity activeOpacity={0.8} style={styles.row} onPress={() => {
      if (item.name.toString() === "Miya") {
        router.push("/(main)/coin-balance");
      } else {
        // TODO: router.push("/(main)/chat/" + item.id);
      }
    }}>
      <Image source={item.avatar || imagePath.logo} style={styles.avatar} />
      <View style={styles.rowCenter}>
        <View style={styles.rowTop}>
          <Text numberOfLines={1} style={styles.name}>
            {item.name} {item.pinned ? "📌" : ""}
          </Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.rowBottom}>
          <Text numberOfLines={1} style={styles.last}>
            {item.last}
          </Text>
          <View style={styles.rightMeta}>
            {item.muted && <Ionicons name="volume-mute" size={14} color="#6f7580" style={{ marginRight: 8 }} />}
            {!!item.unread && item.unread > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeTxt}>{item.unread}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />

      {/* AppBar */}
      <View style={styles.appbar}>
        <Text style={styles.title}>Respawn</Text>
        <View style={styles.appActions}>
          
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="search-outline" size={22} color="#e6e6e6" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="more-vertical" size={22} color="#e6e6e6" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={[styles.tab, styles.tabActive]}>Chats</Text>
        <Text style={styles.tab}>Calls</Text>
      </View>

      {/* List + composer area are under keyboard avoiding with bottom inset */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={insets.top} // keeps header clear on iOS
      >
        {/* Search */}
        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={18} color="#6f7580" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search"
            placeholderTextColor="#6f7580"
            style={styles.searchInput}
          />
        </View>

        {/* List */}
        <FlatList
          ref={listRef}
          data={data}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 24 }]}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
        />
      </KeyboardAvoidingView>

      {/* FABs (lifted above bottom inset) */}
      <View style={[styles.fabs, { bottom: (insets.bottom || 12) + 12 }]}>
        <TouchableOpacity activeOpacity={0.85} style={styles.smallFab}>
          <MaterialCommunityIcons name="pencil-outline" size={18} color="#0d0d0d" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} style={styles.mainFab}>
          <Ionicons name="chatbubble-ellipses" size={20} color="#0d0d0d" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WPHome;

const BG = "#000000";
const CARD = "#0F1114";
const TXT = "#e6e6e6";
const MUTED = "#9aa0a6";
const HAIR = "#1b1f24";
const ACCENT = "#3BA7FF";
const ACCENT_DIM = "#2b7ccc";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  appbar: {
    height: 52,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { color: TXT, fontSize: 22, fontWeight: "700", letterSpacing: 0.2, textTransform: "lowercase" },
  appActions: { flexDirection: "row", alignItems: "center" },
  iconBtn: { padding: 8, marginLeft: 2 },

  tabs: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: HAIR,
  },
  tab: { color: MUTED, marginRight: 24, fontSize: 13, letterSpacing: 0.2 },
  tabActive: {
    color: TXT,
    fontWeight: "700",
    borderBottomWidth: 2,
    borderBottomColor: ACCENT,
    paddingBottom: 6,
  },

  searchWrap: {
    marginTop: 10,
    marginHorizontal: 14,
    backgroundColor: CARD,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: HAIR,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    color: TXT,
    fontSize: 14,
    marginLeft: 8,
    paddingVertical: 0,
    flex: 1,
  },

  listContent: { paddingVertical: 6 },
  row: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 10 },
  sep: { height: StyleSheet.hairlineWidth, backgroundColor: HAIR, marginLeft: 72, marginRight: 14 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 12 },
  rowCenter: { flex: 1 },
  rowTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  name: { color: TXT, fontSize: 16, fontWeight: "600", maxWidth: "78%" },
  time: { color: MUTED, fontSize: 12 },
  rowBottom: { marginTop: 2, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  last: { color: MUTED, fontSize: 13, maxWidth: "78%" },
  rightMeta: { flexDirection: "row", alignItems: "center" },
  badge: {
    minWidth: 18,
    paddingHorizontal: 6,
    height: 18,
    borderRadius: 9,
    backgroundColor: ACCENT,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeTxt: { color: "#0d0d0d", fontSize: 11, fontWeight: "700" },

  fabs: { position: "absolute", right: 16, alignItems: "flex-end", gap: 12 },
  mainFab: {
    width: 56, height: 56, borderRadius: 18, backgroundColor: ACCENT, alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 8, elevation: 6,
  },
  smallFab: {
    width: 38, height: 38, borderRadius: 12, backgroundColor: ACCENT_DIM, alignItems: "center", justifyContent: "center",
    shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 6, elevation: 4,
  },
});
