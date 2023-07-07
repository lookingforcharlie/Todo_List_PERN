# PERN Stack backend

- Node.JS, Express.JS, TypeScript

### JWT, Authentication, and Authorization

- Authentication is the process of checking if you really are the person you claim to be.
  1. Are you really Charlie?, let me see your id.
- Authorization which come after authentication is the process of checking of depending on your status and credentials, what are you allowed to do.
  1. Hi Charlie, here is your JSON WEB TOKEN that stores all your information. With this JWT, you are able to do so on and so forth, the rest you can't do in our facility
- So JWT happens during the process of authorization.
- JWT contains 3 parts: header, payload, and signature.
- JWT can be decrypted easily by atob() method in console, don't store your personal info inside JWT.
- The purpose of JWT is to make sure the person we interact with in the application is real, not to store secret info.
