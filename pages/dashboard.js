export default function Dashboard(props) {
  const displayName =
    props.userGlobal != null ? props.userGlobal.displayName : "signed out";
  const photoURL =
    props.userGlobal != null ? props.userGlobal.photoURL : "signed out";

  return (
    <>
      {props.userGlobal !== null ? (
        <>
          <h6>{displayName}</h6>
          <img width="100px" height="100px" src={photoURL}></img>
        </>
      ) : (
        <h1>Logged out</h1>
      )}
    </>
  );
}
