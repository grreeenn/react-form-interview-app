// @flow
import {sendForm} from 'emailjs-com';

/*
 * Class that wraps the email sending process
 * Uses EmailJS service, see https://www.emailjs.com/docs/
 */
export class Mailer {
    // EmailJS user ID
    user_id: string = "InsertYourUserIdHere";
    // ID of the email service used on EmailJS
    serviceName: string = "gmail";

    /*
    * Try to send an email composed from form, return success boolean
    * formId is an HTML ID of the form element
    * templateId is the template ID at EmailJS side
    */
    trySendFormMail(formId: string, templateId: string): boolean {

        return sendForm(this.serviceName, templateId, formId, this.user_id)
            .then(() => { //success
                return true;
            }, () => { //failure
                return false;
            });
    }
}


