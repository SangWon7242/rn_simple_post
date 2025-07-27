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
              <Text style={styles.postTitleContent}>{post?.title}</Text>
            </View>
            <View style={styles.contentBodyWrap}>
              <Text style={styles.postBody}>{post?.content}</Text>
            </View>
          </View>
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
  },
  postInner: {
    width: WIDTH,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileDate: {
    fontSize: 13,
    color: "#666",
  },
  postTitleContent: {
    fontSize: 16,
    color: "#333",
  },
  postBodyContainer: {
    marginTop: 5,
  },
  postBody: {
    fontSize: 16,
    marginTop: 5,
  },
});
