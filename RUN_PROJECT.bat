@echo off
echo ========================================
echo   FitBuddy - Starting Development Server
echo ========================================
echo.
echo Step 1: Installing dependencies...
call npm install
echo.
echo Step 2: Starting Expo...
echo.
echo When you see the menu, press 'w' to open in web browser
echo OR scan the QR code with Expo Go app on your phone
echo.
call npm start
pause

