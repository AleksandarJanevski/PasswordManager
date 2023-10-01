@echo off

cd service
start cmd /k "npm start"

cd web
start cmd /k "npm run dev"

start http://localhost:5173/