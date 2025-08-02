import { db } from "@/firebase/config";
import { PostDto } from "@/types/post";
import { Link } from "expo-router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";

export default function Posts() {
  const [posts, setPosts] = useState<PostDto[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const postsQuery = query(
        collection(db, "post"),
        orderBy("postId", "desc")
      );

      // postsSnap : Firestore에서 가져온 데이터
      const postsSnap = await getDocs(postsQuery);

      // postsSnap.docs.forEach((doc) => console.log(doc.data));

      const postsData = postsSnap.docs.map((doc) => {
        const { postId, createDate, title, content } = doc.data();

        return {
          id: doc.id, // Firestore에서 가져온 데이터의 id
          postId: Number(postId),
          createDate: createDate,
          title: title,
          content: content,
        };
      });

      setPosts(postsData);
    } catch (error) {
      console.log("오류 발생 : " + error);
      setError("오류 발생");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 가드 클로즈 패턴
  if (!posts) {
    return (
      <View style={styles.postsContainer}>
        <Text style={styles.loadingText}>로딩중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.postsContainer}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        contentContainerStyle={styles.listWrap}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Text style={styles.postId}>{item.postId}번 게시글</Text>
            <Link
              href={{
                pathname: `/posts/[id]/post`, // [id] : 동적 라우팅
                params: {
                  id: item.id,
                  postId: item.postId,
                },
              }}
            >
              <Text style={styles.postTitle}>{item.title}</Text>
            </Link>
          </View>
        )}
      />
    </View>
  );
}

const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    alignItems: "center",
  },
  loadingText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  listWrap: {
    width: WIDTH - 16,
    paddingTop: 70,
    paddingBottom: 16,
    paddingHorizontal: 6,
  },
  postItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 100,
  },
  postId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postTitle: {
    fontSize: 16,
    marginTop: 5,
  },
});
