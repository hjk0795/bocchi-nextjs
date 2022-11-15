

export default function Redirect() {
    setTimeout(() => {
        console.log("Delayed for 1 second.");
        console.log(document.cookie);
      }, "1000")
}