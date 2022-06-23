import fetch from "../helpers/fetch";
import showError from "../helpers/show-error";

class PoliceAuth {
    static async signIn () {
        const response = await fetch('/admin/sign-in', {
            body: {
                email: $('#email-address').val(),
                password: $('#password').val()
            }
        });

        if (response.successful) {
            location.href = response.redirect;

            return;
        }

        showError('sign-in-error', response.error);
    }
}

export default PoliceAuth;