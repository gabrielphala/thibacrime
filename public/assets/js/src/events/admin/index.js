import policeStation from "./police-stations";
import policemen from "./policemen";
import reports from "./reports";
import residents from "./residents";
import signIn from "./sign-in";

export default () => {
    policeStation();
    policemen();
    reports();
    residents();
    signIn();
}