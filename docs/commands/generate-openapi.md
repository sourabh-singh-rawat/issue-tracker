# Commands

## build-docs

```powershell
npx @redocly/cli build-docs ./openapi/openapi.yaml --output=./client/src/api/generated/openapi.docs.html
```

## Compiles to client

```powershell
# client
npx @redocly/cli bundle ./openapi/openapi.yaml --output ./client/src/api/generated/openapi.yaml --remove-unused-components --d
npx @redocly/cli bundle ./openapi/openapi.yaml --output ./client/src/api/generated/openapi.json --format json --remove-unused-components --d
```
