## Build

```sh
GOOS=js GOARCH=wasm go build -o frontend/public/main.wasm main.go
```

## Run

To run this and have live reloading you'll need [air](https://github.com/air-verse/air) installed.
If you'd like to set up lerna or some other monorepo tool you can, but I would recommend just opening two terminals and use the commands below to compile WASM and the frontend separately.

WASM

```sh
air --build.cmd "GOOS=js GOARCH=wasm go build -o frontend/public/main.wasm main.go"
```

Frontend

```sh
cd frontend
bun dev
```
