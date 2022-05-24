import fetch from "../helpers/fetch";
import showError from "../helpers/show-error";

class PoliceAuth {
    static async signIn () {
        const response = await fetch('/admin/sign-in', {
            body: {
                email: $('#admin-email-address').val(),
                password: $('#admin-password').val()
            }
        });

        if (response.successful) {
            location.href = response.redirect;

            return;
        }

        showError('admin-sign-in-error', response.error);
    }
}

export default PoliceAuth;