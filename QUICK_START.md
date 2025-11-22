# 🚀 Quick Start Guide - Run FitBuddy on Your Laptop

## Step 1: Install Node.js (if not already installed)

1. Go to https://nodejs.org/
2. Download the LTS version (recommended)
3. Install it (just click Next, Next, Next)
4. Open a new terminal/PowerShell window
5. Verify installation:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers.

## Step 2: Install Dependencies

1. Open PowerShell or Command Prompt in your project folder
2. Navigate to your project (if not already there):
   ```bash
   cd "C:\Users\LalanaGurusinghe\OneDrive - Digital400 PVT LTD\Desktop\ReactNative"
   ```
3. Install all required packages:
   ```bash
   npm install
   ```
   This will take 2-5 minutes. Wait for it to finish.

## Step 3: Start the Expo Development Server

1. In the same terminal, run:
   ```bash
   npm start
   ```
   OR
   ```bash
   npx expo start
   ```

2. You'll see a QR code and menu options in the terminal.

## Step 4: View the App (Choose ONE method)

### Option A: View in Web Browser (EASIEST - Recommended for beginners)

1. When you see the Expo menu, press `w` (for web)
2. OR open your browser and go to: `http://localhost:19006`
3. The app will open in your default browser
4. You can interact with it like a normal website

**Note**: Some features might work differently on web, but you can see the UI and test most functionality.

### Option B: Use Your Phone (Best Experience)

1. Install "Expo Go" app on your phone:
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - iOS: https://apps.apple.com/app/expo-go/id982107779

2. Make sure your phone and laptop are on the same WiFi network

3. When Expo starts, scan the QR code:
   - **Android**: Open Expo Go app → Tap "Scan QR code"
   - **iOS**: Open Camera app → Point at QR code → Tap the notification

4. The app will load on your phone!

### Option C: Use Android Emulator (If you have Android Studio)

1. Install Android Studio: https://developer.android.com/studio
2. Set up an Android Virtual Device (AVD)
3. Start the emulator
4. In the Expo terminal, press `a` (for Android)
5. The app will open in the emulator

### Option D: Use iOS Simulator (Mac only)

1. Install Xcode from App Store
2. In the Expo terminal, press `i` (for iOS)
3. The app will open in the iOS Simulator

## Step 5: Test the App

1. **Register**: Create a new account
   - Full Name: Your name
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123

2. **Login**: Use the credentials you just created

3. **Browse Exercises**: 
   - See exercises on the Home screen
   - Pull down to refresh
   - Tap any exercise card

4. **View Details**: 
   - See exercise information
   - Add to favourites

5. **Check Favourites**: 
   - Go to Favourites tab
   - See your saved exercises

6. **Profile**: 
   - View your profile
   - Toggle Dark Mode
   - Logout

## Troubleshooting

### "npm: command not found"
- Node.js is not installed or not in PATH
- Reinstall Node.js and restart terminal

### "Cannot find module" errors
- Run `npm install` again
- Delete `node_modules` folder and `package-lock.json`, then run `npm install`

### Port already in use
- Close other apps using port 19000
- Or run: `npx expo start --port 19001`

### Web browser shows blank page
- Wait a few seconds for compilation
- Check terminal for errors
- Try refreshing the browser

### QR code not scanning
- Make sure phone and laptop are on same WiFi
- Try using "Tunnel" connection: press `s` in Expo menu, then `t`

### App crashes on phone
- Check terminal for error messages
- Make sure all dependencies are installed
- Try clearing Expo cache: `npx expo start -c`

## Common Commands

```bash
# Start the app
npm start

# Start with cleared cache
npx expo start -c

# Start on web
npx expo start --web

# Start on Android
npx expo start --android

# Start on iOS (Mac only)
npx expo start --ios
```

## What You Should See

When you run `npm start`, you should see:
- A QR code
- A menu with options (press w, a, i, etc.)
- A URL like `exp://192.168.x.x:19000`
- No red error messages

## Need Help?

1. Check the terminal output for error messages
2. Make sure Node.js is installed: `node --version`
3. Make sure you're in the correct folder
4. Try deleting `node_modules` and running `npm install` again

---

**Recommended for first time**: Use Option A (Web Browser) - it's the easiest way to see your app running!

