import { useState , useEffect} from "react"



export default function Test() {
  const [auth, setAuth] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [pumps, setPumps] = useState([]);

  // async function getAuth() {
  //   try {
  //     const res = await fetch("https://ncat-hackathon-spring2026-22jnm9ntb-geocube101s-projects.vercel.app/api/connect", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({}),
  //     });

  //     if (!res.ok) throw new Error(`HTTP ${res.status}`);

  //     const json = await res.json();
  //     setAuth(json.auth);
  //   } catch (err) {
  //     console.error("Failed to fetch auth:", err);
  //     setAuth(null);
  //   } finally {
  //     setLoadingAuth(false);
  //   }
  // }

  async function getPumps() {
    try {
      const res = await fetch("https://ncat-hackathon-spring2026-22jnm9ntb-geocube101s-projects.vercel.app/api/pumps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      setPumps(json);
    } catch (err) {
      console.error("Failed to fetch pumps:", err);
      setPumps([]);
    } finally {
      setLoadingAuth(false);
    }
  }

  // useEffect(() => {
  //   getAuth();
  // }, []);
  useEffect(() => {
      getPumps();
  });

  return (
    <div>
      <h1>hello</h1>
      <h1>{JSON.stringify(pumps)}</h1>
    </div>
  )
}
