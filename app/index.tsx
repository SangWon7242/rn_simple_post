import { Redirect } from "expo-router";

// Index : 메인화면
export default function Index() {
  return (
    <Redirect
      href={{
        pathname: "/(tabs)/home",
      }}
    />
  );
}
