import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

// without SWR

// export default function useUser() {
//     const [user, setUser] = useState();
//     const router = useRouter();
//     useEffect(() => {
//       fetch("/api/users/me")
//         .then((response) => response.json())
//         .then((data) => {
//           if (!data.ok) {
//             return router.replace("/enter");
//           } else setUser(data.profile);
//         });
//     }, [router]);
//     return user;
//   }

// With SWR -> it'll give old data from cache

export default function useUser() {
  const { data, error } = useSWR("/api/users/me", fetcher);
  const router = useRouter();
  //   return router.replace("/enter");
  return data;
}
