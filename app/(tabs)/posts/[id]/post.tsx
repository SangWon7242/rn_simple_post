import { useLocalSearchParams } from "expo-router";
import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function Post() {
  const { userId, id, title, body } = useLocalSearchParams();

  return (
    <View style={styles.postContainer}>
      <View style={styles.postInner}>
        <View style={styles.postHeader}>
          <Text style={styles.postTitle}>제목</Text>
          <Text style={styles.postTitleContent}>{title}</Text>
        </View>
        <View style={styles.postBodyContainer}>
          <Text style={styles.postBody}>{body}</Text>
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
