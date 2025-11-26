# OTP Verification Implementation Guide

## Overview
Complete OTP (One-Time Password) based signup flow with phone number verification.

## Features Implemented

### Frontend (SignUp.jsx)
- **Two-step signup process:**
  1. **Step 1**: User enters Name, Email, Phone Number, Password, Confirm Password
  2. **Step 2**: OTP verification with 10-minute countdown timer

- **Form Validation:**
  - All fields required
  - Password and confirm password must match
  - Phone number minimum 10 digits
  - OTP auto-formatted to 6 digits

- **User Experience:**
  - Real-time error messages
  - Loading states during API calls
  - OTP countdown timer with MM:SS format
  - Back button to edit details
  - Disabled submit button on OTP expiry
  - Masked phone number display for security

### Backend (authRoutes.js)
- **New Endpoints:**

  1. **POST `/api/send-otp`**
     - Receives: name, email, phone, password
     - Generates: 6-digit OTP, 10-minute expiry
     - Stores: User record with OTP data
     - Returns: userId, masked phone (last 4 digits)
     - OTP sent to console (replace with Twilio/SMS service in production)

  2. **POST `/api/verify-otp`**
     - Receives: email, otp
     - Validates: OTP expiry, OTP correctness
     - Clears: OTP after successful verification
     - Returns: JWT token, verified user data
     - Marks: `isPhoneVerified = true`

### Database (User Model)
Added fields:
```javascript
otp: String                    // 6-digit OTP code
otpExpiry: Date               // OTP expiration timestamp
isPhoneVerified: Boolean      // Phone verification status
```

## Setup Instructions

### Backend Setup
1. No additional dependencies needed (uses built-in crypto for OTP generation)
2. Server already configured with 10MB JSON limit
3. All environment variables already set (JWT_SECRET, DATABASE_URL, etc.)

### Frontend Setup
1. New CSS file created: `src/styles/Auth.css`
2. SignUp.jsx updated with two-step form
3. SignIn.jsx updated with matching styling
4. No new dependencies required

## API Flow Diagram

```
User fills form
     ↓
POST /api/send-otp
     ↓
OTP generated & stored (10 min validity)
OTP sent to console (in development)
     ↓
User sees OTP input screen
     ↓
User enters OTP
     ↓
POST /api/verify-otp
     ↓
OTP validated
     ↓
JWT token issued
     ↓
User redirected to profile
```

## Testing Guide

### Test Case 1: Successful Signup
```
1. Go to /signup
2. Enter:
   - Name: John Doe
   - Email: john@example.com
   - Phone: 9876543210
   - Password: TestPass123
   - Confirm: TestPass123
3. Click "Send OTP"
4. Check backend console for OTP
5. Enter OTP in form
6. Click "Verify OTP"
7. Redirects to /profile
```

### Test Case 2: Invalid OTP
```
1. Complete Step 1
2. Enter wrong OTP (e.g., 000000)
3. Error: "Invalid OTP"
4. Can retry without starting over
```

### Test Case 3: Expired OTP
```
1. Complete Step 1
2. Wait 10 minutes
3. Try to verify
4. Error: "OTP expired. Please request a new one."
5. Back button returns to form
```

### Test Case 4: Password Mismatch
```
1. Enter different passwords
2. Error: "Passwords do not match"
3. Form remains on Step 1
```

## Production Deployment Notes

### SMS Service Integration
Replace the `sendOTP()` function in `authRoutes.js`:

```javascript
// With Twilio
import twilio from 'twilio';

const sendOTP = (phone, otp) => {
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
  return client.messages.create({
    body: `Your Flexxs verification code is: ${otp}`,
    from: process.env.TWILIO_PHONE,
    to: phone,
  });
};
```

### Environment Variables to Add
```
TWILIO_SID=your_twilio_sid
TWILIO_TOKEN=your_twilio_auth_token
TWILIO_PHONE=+1234567890
```

### Security Enhancements
1. Rate limiting on `/api/send-otp` to prevent OTP bombing
2. Track OTP attempt counts to lock after N failures
3. Store OTP as hashed value (bcrypt) instead of plaintext
4. Add CAPTCHA verification before OTP request
5. Log all OTP attempts for fraud detection

## File Changes Summary

### Modified Files:
1. `backend/models/auth.js` - Added OTP fields to User schema
2. `backend/routes/authRoutes.js` - Added send-otp and verify-otp endpoints
3. `frontend/src/pages/SignUp.jsx` - Complete rewrite with two-step form
4. `frontend/src/pages/SignIn.jsx` - Updated styling

### New Files:
1. `frontend/src/styles/Auth.css` - Beautiful auth page styling

## Troubleshooting

### OTP Not Appearing
- Check browser console for API errors
- Check backend console for OTP log
- Verify `/api/send-otp` endpoint is accessible

### "OTP expired" Error
- Timer is 10 minutes (600 seconds)
- Each new request generates new OTP
- Back button allows re-requesting OTP

### Phone Number Not Saving
- Ensure phone field is being sent in request
- Check MongoDB for phone field in user document

## Future Enhancements
- [ ] Email verification as additional layer
- [ ] Multi-factor authentication (2FA)
- [ ] WhatsApp-based OTP delivery
- [ ] Resend OTP functionality
- [ ] OTP history and audit logs
- [ ] Custom OTP expiry duration per request
