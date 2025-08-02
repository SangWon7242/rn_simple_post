import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PostWriteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}></View>

      {/* 네비게이션 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity>
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
      <TextInput
        style={styles.titleInput}
        placeholder="제목을 입력하세요."
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />

      {/* 내용 입력 (스크롤뷰 사용) */}
      <ScrollView style={styles.contentContainer}>
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

      {/* 하단 툴바 */}
      <View style={styles.toolbar}>
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
    </View>
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
