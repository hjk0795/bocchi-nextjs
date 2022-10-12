import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return(
  <>
    <h1>dashboard page</h1>

    {loading && <div>Loading...</div>}
    {session && (
      <>
        <p>
          Welcome, {session.user.name ?? session.user.email}
        </p>
        <br />
        <img src={session.user.image} alt="" />
      </>
    )}
    {!session && (
      <>
        <p>Please Sign in</p>
      </>
    )}
  </>);
}
