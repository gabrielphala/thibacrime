import PoliceAuth from "../../auth/Police"

export default () => {
    if (!targetPage || targetPage != 'police-sign-in')
        return;
        
    $('#police-sign-in-form').on('submit', async (e) => {
        e.preventDefault();
        
        await PoliceAuth.signIn();
    });
}