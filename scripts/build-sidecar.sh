#!/bin/bash
set -e

# Determine the target triple for the current platform
case "$(uname -s)" in
    Darwin)
        case "$(uname -m)" in
            arm64)
                TARGET="aarch64-apple-darwin"
                ;;
            x86_64)
                TARGET="x86_64-apple-darwin"
                ;;
        esac
        ;;
    Linux)
        case "$(uname -m)" in
            x86_64)
                TARGET="x86_64-unknown-linux-gnu"
                ;;
            aarch64)
                TARGET="aarch64-unknown-linux-gnu"
                ;;
        esac
        ;;
    MINGW*|MSYS*|CYGWIN*)
        TARGET="x86_64-pc-windows-msvc"
        ;;
esac

echo "Building Go backend for $TARGET..."
cd backend

# Build with the correct extension for the platform
if [[ "$TARGET" == *"windows"* ]]; then
    go build -o "../src-tauri/binaries/server-${TARGET}.exe" .
else
    go build -o "../src-tauri/binaries/server-${TARGET}" .
fi

echo "Backend built: server-${TARGET}"
