On one of my job interviews I've been asked if I have ever worked with React. 
My answer was "No"; "Ok then", said the interviewer, "I'll send you some sample app definition, please implement it in React and send it back". 
The definition went like this:
>"Create a simple react app:
>1. One registration form with the title “Jones Form” and the following fields and validations:
>
>   1.1. First Name, validate that the inserted value is:
i.
not empty
ii.
contains only alphabet letters (a-z/A-Z)
iii.
minimum 2 chars
>
>   1.2. Last Name, validate that the inserted value is:
i.
not empty
ii.
contains only alphabet letters (a-z/A-Z)
iii.
minimum 2 chars
>
>   1.3. Mail Address, validate that the inserted value is:
i.
not empty
ii.
valid mail address
>
>   1.4. Phone Number, validate that the inserted value is:
i.
not empty
ii.
only numbers
iii.
exactly 10 digits
>2. Submit button which sends a mail with all the inserted details in the following format:
>Mail subject: New Lead
>Mail content:
>First Name: <firstName>
>Last Name: <lastName>
>Mail Address: <mailAddress>
>Phone Number: <phoneNumber>
>  
>General guidelines:
>- You can use any node module and external JS library you want.
>- Reuse code as much as possible (hint1: validations, hint2: React components)
>- Basic design is enough (black and white is fine) - just make it clear and organized.
>- You don’t necessarily need a server to send an email (e.g. Sendgrid API via free trial)."

It took me 4 days to build the app, considering that I've never seen neither React nor FB Flow.

>This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
