import Mailchimp from 'react-mailchimp-form'

export default function Form() {
    return (
        <div>
        <Mailchimp
        action='https://blockchainedu.us4.list-manage.com/subscribe/post?u=8f05e1771877392fa3d41df41&amp;id=a53b080887'
        fields={[
          {
            name: 'EMAIL',
            placeholder: 'Email',
            type: 'email',
            required: true
          },
          {
            name: 'SCHOOL',
            placeholder: 'School',
            type: 'text',
            required: true
          }
        ]}
        messages = {
            {
              sending: "Sending...",
              success: "Thank you for subscribing!",
              error: "An unexpected internal error has occurred.",
              empty: "You must write an e-mail.",
              duplicate: "Too many subscribe attempts for this email address",
              button: "Subscribe"
            }
          }
        />
        </div>
    )
}


