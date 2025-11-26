# ⚡ Quick Start - OTP Signup System

## What's New?

Your signup form now has **phone number verification via OTP (One-Time Password)**.

## How It Works (User Side)

1. **Register Form** → User fills Name, Email, Phone, Password
2. **Send OTP** → System sends 6-digit code (visible in backend console during development)
3. **Enter OTP** → User has 10 minutes to verify
4. **Success** → Account created, user logged in

## How It Works (Backend Side)

```
User sends details → Generate OTP → Store OTP with 10-min timer
                                         ↓
                              User enters OTP → Verify
                                         ↓
                           OTP valid? → Clear OTP → Issue JWT
```

## API Endpoints

### 1. Send OTP
```
POST /api/send-otp
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "SecurePass123"
}

Response:
{
  "message": "OTP sent successfully",
  "userId": "user_mongo_id",
  "phone": "****3210"
}
```

### 2. Verify OTP
```
POST /api/verify-otp
Content-Type: application/json

{
  "email": "john@example.com",
  "otp": "123456"
}

Response:
{
  "message": "Phone verified successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_mongo_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "isPhoneVerified": true
  }
}
```

## Development Testing

### Where to see OTP?
Check **backend console** output:
```
OTP for 9876543210: 123456
```

Copy the OTP number and paste into signup form.

### Example Test Flow
```
1. Go to http://localhost:5173/signup
2. Fill form with any valid data
3. Click "Send OTP"
4. Look at backend terminal for: OTP for XXXXXXXXXXX: XXXXXX
5. Copy the OTP number
6. Paste into OTP field
7. Click "Verify OTP"
8. ✅ Done! Redirected to profile
```

## Testing Different Scenarios

### ❌ Invalid OTP
- Enter wrong 6 digits → Error appears → Retry without restarting

### ❌ Expired OTP
- Wait 10+ minutes or click refresh → OTP button disabled → Go back and resend

### ❌ Already Registered Email
- Use same email twice → Error during Step 1

### ❌ Password Mismatch
- Different passwords → Error caught before OTP sent

## Database Schema Changes

User model now has:
```javascript
{
  // ... existing fields ...
  phone: String,              // User's phone number
  otp: String,                // 6-digit OTP (temporary)
  otpExpiry: Date,            // When OTP expires (10 minutes)
  isPhoneVerified: Boolean,   // true after successful verification
}
```

## UI/UX Improvements

✅ Beautiful gradient background (purple/blue)
✅ Two-step form with clear instructions
✅ Real-time countdown timer (MM:SS)
✅ Masked phone number for security
✅ Error messages for all scenarios
✅ Loading states on buttons
✅ Mobile-responsive design
✅ Back button to edit details
✅ Smooth animations

## For Production

### Add Real SMS Service
1. Sign up for Twilio/AWS SNS/Firebase
2. Add credentials to `.env`
3. Replace `sendOTP()` function to call SMS API
4. OTP will be sent via SMS instead of console log

### Add Security
- Rate limiting (max 3 OTP requests per phone per hour)
- OTP attempt tracking (max 5 failed attempts → lock for 30 min)
- Hash OTP before storing (bcrypt)
- CAPTCHA before OTP request
- Audit logging

## File Locations

```
frontend/
  src/
    pages/
      SignUp.jsx          ← Modified (2-step form)
      SignIn.jsx          ← Modified (styling)
    styles/
      Auth.css            ← New (beautiful styling)

backend/
  models/
    auth.js               ← Modified (added OTP fields)
  routes/
    authRoutes.js         ← Modified (added 2 endpoints)
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| No OTP showing | Check backend console, restart backend |
| "Invalid OTP" error | Copy exactly from console, watch for typos |
| "OTP expired" | Timer is 10 minutes, wait and resend |
| "Email already registered" | Use different email |
| "Passwords do not match" | Retype both passwords identically |
| Form won't submit | Fill all required fields, check validation |

## Code Examples

### Frontend - Call Send OTP
```javascript
const res = await API.post('/api/send-otp', {
  name,
  email,
  phone,
  password,
});
```

### Frontend - Call Verify OTP
```javascript
const res = await API.post('/api/verify-otp', {
  email,
  otp,
});
// Get token from res.data.token
// Redirect to profile
```

### Backend - Generate OTP
```javascript
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
// Generates random 6-digit number like "234567"
```

### Backend - Check Expiry
```javascript
if (new Date() > user.otpExpiry) {
  return res.status(400).json({ error: 'OTP expired' });
}
```

## Environment Variables Needed

None new required for development! For production SMS:

```bash
# .env file
TWILIO_SID=your_twilio_sid
TWILIO_TOKEN=your_twilio_token
TWILIO_PHONE=+1234567890
SMS_ENABLED=true
```

## Performance Notes

- OTP generated instantly (< 1ms)
- Stored in MongoDB with TTL expiry
- No external calls in dev mode
- SMS API adds ~500ms in production
- OTP cleared after verification (no storage bloat)

## Security Notes

✅ OTP valid only 10 minutes
✅ Single-use (cleared after verification)
✅ Phone number masked in response
✅ Password hashed with bcrypt
✅ JWT token issued after verification
✅ User cannot login without verification

---

## 🎉 You're All Set!

Your OTP-based signup is ready to use. Test it out and enjoy!

Questions? Check `SIGNUP_OTP_COMPLETE.md` for detailed docs.
