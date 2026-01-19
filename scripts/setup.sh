#!/bin/bash
set -e

echo "Installing frontend dependencies..."
pnpm install

echo "Installing Go dependencies..."
cd backend
go mod download
go mod tidy

echo "All dependencies installed!"
