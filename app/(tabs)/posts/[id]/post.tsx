import { db } from "@/firebase/config";
import { PostWithContentDto } from "@/types/post";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

export default function Post() {
  const router = useRouter();

  // useLocalSearchParams : 동적 라우팅을 위한 파라미터
  // 받아온 파라미터를 문자열로 처리
  const { postId } = useLocalSearchParams();

  const [post, setPost] = useState<PostWithContentDto | null>(null);

  const fetchPost = async () => {
    try {
      const postQuery = query(
        collection(db, "post"),
        where("postId", "==", Number(postId))
      );

      // postsSnap : Firestore에서 가져온 데이터
      const postSnap = await getDocs(postQuery);

      const postData = postSnap.docs[0].data();

      setPost(postData as PostWithContentDto);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <View style={styles.postContainer}>
      <View style={styles.postInner}>
        <View style={styles.postHeader}>
          <View style={styles.postHeaderLeft}>
            <Pressable onPress={() => router.back()}>
              <Octicons name="chevron-left" size={24} color="black" />
            </Pressable>
          </View>
          <View style={styles.postHeaderRight}>
            <Pressable onPress={() => console.log("bell")}>
              <Octicons name="bell" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => console.log("upload")}>
              <Feather name="upload" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => console.log("dots-vertical")}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="black"
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.postContentContainer}>
          <View style={styles.contentHeader}>
            <View style={styles.profileImage}>
              <Pressable onPress={() => console.log("MyPage")}>
                <FontAwesome6 name="user-circle" size={30} color="black" />
              </Pressable>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileNickname}>닉네임</Text>
              <Text style={styles.profileDate}>2025년 7월 27일</Text>
            </View>
          </View>
          <View style={styles.contentBody}>
            <View style={styles.contentTitleWrap}>
              <Text style={styles.postTitle}>{post?.title}</Text>
            </View>
            <View style={styles.contentBodyWrap}>
              <Text style={styles.postBody}>{post?.content}</Text>
            </View>
            <View style={styles.contentFooter}>
              <Pressable
                onPress={() => console.log("recommend")}
                style={styles.contentFooterItem}
              >
                <Feather name="thumbs-up" size={18} color="black" />
                <Text>추천</Text>
              </Pressable>
              <Pressable
                onPress={() => console.log("save")}
                style={styles.contentFooterItem}
              >
                <Text>저장</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.postReplyContainer}>
        <View style={styles.postReplyInner}>
          <View>
            <Text style={{ fontWeight: "bold" }}>댓글0</Text>
          </View>
          <View style={styles.postReplyContent}>
            <Text>아직 댓글이 없어요.</Text>
            <Text>가장 먼저 댓글을 남겨보세요.</Text>
          </View>
        </View>
      </View>
      <View style={styles.postReplyInputContainer}>
        <View style={styles.postReplyInputInner}>
          <Text style={{ fontWeight: "bold" }}>댓글 입력창</Text>
        </View>
      </View>
    </View>
  );
}

const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 60,
    gap: 5,
  },
  postInner: {
    width: WIDTH,
    backgroundColor: "#fff",
    flex: 0.6,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  postHeaderLeft: {},
  postHeaderRight: {
    flexDirection: "row",
    gap: 10,
  },
  postContentContainer: {
    padding: 10,
    flexGrow: 1,
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    gap: 10,
  },
  profileImage: {},
  profileInfo: {},
  profileNickname: {
    fontWeight: "bold",
  },
  profileDate: {
    fontSize: 13,
    color: "#666",
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    paddingVertical: 8,
  },
  contentBody: {
    flexGrow: 1,
  },
  contentTitleWrap: {},
  contentBodyWrap: {
    flex: 1,
  },
  contentFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  contentFooterItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  postBody: {
    flex: 1,
    fontSize: 16,
  },
  postReplyContainer: {
    width: WIDTH,
    backgroundColor: "#fff",
    flex: 0.3,
  },
  postReplyInner: {
    padding: 10,
    flex: 1,
  },
  postReplyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postReplyInputContainer: {
    width: WIDTH,
    backgroundColor: "#fff",
    flex: 0.1,
  },
  postReplyInputInner: {
    padding: 10,
  },
});
