import { db } from "@/firebase/config";
import { PostWithContentDto } from "@/types/post";
import { useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function Post() {
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
          <Text style={styles.postTitle}>제목</Text>
          <Text style={styles.postTitleContent}>{post?.title}</Text>
        </View>
        <View style={styles.postBodyContainer}>
          <Text style={styles.postBody}>{post?.content}</Text>
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
  },
  postInner: {
    width: WIDTH - 15,
    padding: 16,
    borderRadius: 10,
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
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
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
