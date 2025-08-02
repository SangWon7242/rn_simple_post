import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const useToolbarHeightHook = (toolbarHeight: number) => {
  // 키보드가 화면에서 보이는지 여부
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // 키보드의 높이
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  useEffect(() => {
    const showKeyboard = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        const targetHeight = e.endCoordinates.height;

        setKeyboardVisible(true);
        setKeyboardHeight(targetHeight);
      }
    );

    const hideKeyboard = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
      }
    );

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, [toolbarHeight]);

  return {
    keyboardVisible,
    keyboardHeight,
  };
};

export default function PostWriteForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [toolbarHeight, setToolbarHeight] = useState<number>(0);

  const onToolbarLayout = (e: any) => {
    const { height } = e.nativeEvent.layout;
    console.log(height);
    setToolbarHeight(height);
  };

  const { keyboardVisible, keyboardHeight } =
    useToolbarHeightHook(toolbarHeight);

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { marginBottom: keyboardVisible ? keyboardHeight + 5 : 0 },
      ]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      // 64 : 키보드가 올라왔을 때의 여백
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.statusBar}></View>

      {/* 네비게이션 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate("/(tabs)/posts/page")}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.completeButton}>
          <Text style={styles.completeButtonText}>완료</Text>
        </TouchableOpacity>
      </View>

      {/* 주제 선택 영역 */}
      <TouchableOpacity style={styles.topicSelector}>
        <Text style={styles.topicText}>게시글의 주제를 선택해주세요.</Text>
        <Ionicons name="chevron-forward" size={24} color="white" />
      </TouchableOpacity>

      {/* 구분선 */}
      <View style={styles.divider} />
      {/* 제목 입력 */}

      <View style={styles.titleContainer}>
        <TextInput
          style={styles.titleInput}
          placeholder="제목을 입력하세요."
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* 내용 입력 (스크롤뷰 사용) */}
      <View style={styles.contentContainer}>
        <ScrollView>
          <TextInput
            style={styles.contentInput}
            placeholder="이야기를 나눠보세요.
#맛집 #병원 #산책 ..."
            placeholderTextColor="#999"
            multiline
            value={content}
            onChangeText={setContent}
            textAlignVertical="top"
          />
        </ScrollView>
      </View>

      {/* 하단 툴바 */}
      <View style={styles.toolbar} onLayout={onToolbarLayout}>
        <TouchableOpacity style={styles.toolbarButton}>
          <Ionicons name="image-outline" size={24} color="white" />
          <Text style={styles.toolbarText}>사진</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton}>
          <Ionicons name="location-outline" size={24} color="white" />
          <Text style={styles.toolbarText}>장소</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton}>
          <MaterialIcons name="how-to-vote" size={24} color="white" />
          <Text style={styles.toolbarText}>투표</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton}>
          <FontAwesome name="hashtag" size={24} color="white" />
          <Text style={styles.toolbarText}>태그</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
    paddingBottom: 5,
  },
  time: {
    color: "white",
    fontWeight: "bold",
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  networkText: {
    color: "white",
    marginRight: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  completeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  completeButtonText: {
    color: "white",
    fontSize: 16,
  },
  topicSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  topicText: {
    color: "white",
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
  },
  titleContainer: {},
  titleInput: {
    color: "white",
    fontSize: 18,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  contentContainer: {
    flex: 1,
  },
  contentInput: {
    color: "white",
    fontSize: 16,
    padding: 15,
    height: "100%",
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingBottom: 25,
  },
  toolbarButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  toolbarText: {
    color: "white",
    marginTop: 5,
    fontSize: 12,
  },
});
