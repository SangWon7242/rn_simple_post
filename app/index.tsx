import ProtectedRoute from "@/components/ProtectedRoute";
import { Redirect } from "expo-router";

// Index : 메인화면
export default function Index() {
  return (
    <ProtectedRoute>
      <Redirect
        href={{
          pathname: "/(tabs)/home",
        }}
      />
    </ProtectedRoute>
  );
}
