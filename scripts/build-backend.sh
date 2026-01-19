#!/bin/bash
set -e

echo "Building Go backend..."
cd backend
go build -o ../src-tauri/binaries/server .
echo "Backend built successfully!"
