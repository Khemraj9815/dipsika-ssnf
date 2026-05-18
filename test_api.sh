#!/bin/bash

# Test the local API endpoint
echo "Testing local API endpoint..."
echo ""

# Test 1: With a simple message
echo "Test 1: Simple greeting"
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"hello"}' 2>/dev/null | jq .

echo ""
echo "Test 2: Plant question"
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"what plant is good to plant during summer"}' 2>/dev/null | jq .
