# JWT test microservice
Ultra basic Node.js micro-service with users that authenticate with jwt and exchange messages

## API

Endpoint: https://basic-service-hlrwkazjxp.now.sh

You must send your JWT token for each route in the `Authorization` header

### GET `/users`
### POST `/users`
### GET `/user/me/messages`
### POST `/user/:userId/messages`

## Deployment
```
npm install -g now
now
```
