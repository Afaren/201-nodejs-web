#!/usr/bin/env bash

SERVER='localhost:3000'
RESOURCE="$1"

echo getAll
curl -X GET \
     $SERVER/$RESOURCE
echo

echo getOne
curl -X GET \
     $SERVER/$RESOURCE/58a00a28a131b74837c20853
echo


echo update
curl -X PUT \
     -H "Content-Type: application/json" \
     -d '{"name": "test-PUT-2", "price":4}' \
     $SERVER/$RESOURCE/58a00323d61864412b84cc69
echo


echo create
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"name": "test-POST", "price":33334, "category": "587f0f2586653d19297d40c8"}' \
     $SERVER/$RESOURCE
echo


echo delete
curl -X DELETE \
     $SERVER/$RESOURCE/58a00323d61864412b84cc69
echo


