## Build

```sh
GOOS=js GOARCH=wasm go build -o main.wasm main.go
```

## Run

```sh
GOOS=js GOARCH=wasm go build -o main.wasm main.go && go run ./server/main.go
```
