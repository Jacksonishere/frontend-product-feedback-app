import { useMemo } from "react";

const AVATAR_BASE_URL = "https://avatars.dicebear.com/api/avataaars/";
const useAvatar = ({ loaded, seed }) => {
  const avatar_url = useMemo(() => AVATAR_BASE_URL + seed + ".svg", [seed]);
  if (!loaded) return "";
  else return avatar_url;
};

export default useAvatar;
