import policeStation from "./police-stations";
import reports from "./reports";
import residents from "./residents";
import signIn from "./sign-in";

export default () => {
    policeStation();
    reports();
    residents();
    signIn();
}