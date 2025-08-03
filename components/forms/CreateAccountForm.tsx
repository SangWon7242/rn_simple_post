import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CreateAccountProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function CreateAccountForm({
  onBack,
  onSuccess,
}: CreateAccountProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidatePassword = (password: string) => {
    return password.length >= 6;
  };

  const isValidateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    return password === confirmPassword;
  };

  // 회원가입 버튼 클릭 시 실행될 함수
  const handleSignup = () => {
    console.log("회원가입");
  };

  // 뒤로가기 버튼 클릭 시 실행될 함수
  const handleBack = () => {
    console.log("뒤로가기");
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.scrollView}>
              {/* 헤더 영역 */}
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={handleBack}
                  style={styles.backButton}
                >
                  <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>회원가입</Text>
              </View>

              {/* 로고 영역 */}
              <View style={styles.logoContainer}>
                {/* 당근 로고 - View로 구현 */}
                <View style={styles.logoWrapper}>
                  <View style={styles.carrotBody}>
                    <View style={styles.carrotInner} />
                  </View>
                  <View style={styles.carrotLeaf} />
                </View>
              </View>

              {/* 폼 영역 */}
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="example@email.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {email && !isValidateEmail(email) && (
                    <Text style={styles.errorText}>
                      올바른 이메일 형식을 입력해주세요.
                    </Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="비밀번호"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                  {password && !isValidatePassword(password) && (
                    <Text style={styles.errorText}>
                      비밀번호는 6자 이상이어야 합니다.
                    </Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                  />
                  {confirmPassword &&
                    !isValidateConfirmPassword(password, confirmPassword) && (
                      <Text style={styles.errorText}>
                        비밀번호가 일치하지 않습니다.
                      </Text>
                    )}
                </View>
              </View>

              {/* 버튼 영역 */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.signupButton}
                  onPress={handleSignup}
                  activeOpacity={0.8}
                >
                  <Text style={styles.signupButtonText}>회원가입</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F5",
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 24,
    color: "#212529",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
    marginRight: 30, // 뒤로가기 버튼 영역만큼 오프셋
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 40,
  },
  logoWrapper: {
    alignItems: "center",
  },
  carrotBody: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FF8A3D",
    justifyContent: "center",
    alignItems: "center",
  },
  carrotInner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "white",
  },
  carrotLeaf: {
    position: "absolute",
    top: -12,
    width: 24,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#20C997",
  },
  formContainer: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#DEE2E6",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  errorText: {
    color: "#FA5252",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  buttonContainer: {
    marginTop: "auto", // 하단에 위치
    marginBottom: 30,
  },
  signupButton: {
    backgroundColor: "#FF8A3D",
    borderRadius: 6,
    paddingVertical: 16,
    alignItems: "center",
  },
  signupButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
