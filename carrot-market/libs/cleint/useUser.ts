import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

// With this hook , it doesn't save the data which i sent API request.
// so it'll may request same data all the time, so we should save this response.
// For this cashing startegy can be offered by useSWR

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/me")
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok) {
          return router.replace("/enter");
          // return router.push("/enter");
          // push will leave the history in browser ,
          // so if i don't want to leave i can use replace that i can't go back to even homepage
        } else setUser(data.profile);
      });
  }, [router]);
  return user;
}
