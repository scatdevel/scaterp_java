import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "signUp": "Sign Up",
          "username": "Username",
          "email": "Email Address",
          "Password": "Password",
          "Enter your Email and password to Sign In.": "Enter your Email and password to Sign In.",
          "role": "Role",
          "agreeTerms": "I agree to the Terms and Conditions",
          "registrationSuccess": "Registration Successful!",
          "registrationFailed": "Registration Failed!",
          "enterDetails": "Enter your details below to register",
          "Terms and Conditions": "Terms and Conditions",
          "alreadyHaveAccount": "Already have an account?",
          "signIn": "Sign In",
          "signInButton": "Sign In",
          "forgotPassword": "Forgot your password?",
          "resetPassword": "Reset it here",
          "createAccount": "Create an account",
          "notRegistered": "Not registered?",
          "loginSuccess": "Login successful!",
          "loginFailed": "Invalid email or password. Please try again."
        }
      },
      ta: {
        translation: {
          "signUp": "பதிவுசெய்ய",
          "Username": "பயனர்பெயர்",
          "email": "மின்னஞ்சல் முகவரி",
          "Password": "கடவுச்சொல்",
          "role": "பங்கு",
          "Terms and Conditions": "விதிமுறைகள் மற்றும் நிபந்தனைகளை ஒப்புக்கொள்கிறேன்",
          "Enter your Email and password to Sign In.": "உங்கள் மின்னஞ்சல் மற்றும் கடவுச்சொல்லை உள்ளிடவும் உள்நுழைவு செய்ய காத்திருக்கின்றேன்.",
          "Email": "மின்னஞ்சல் முகவரி",
          "agreeTerms": "நான் விதிமுறைகள் மற்றும் நிபந்தனைகளை ஒப்புக்கொள்கிறேன்",
          "registrationSuccess": "பதிவு வெற்றிகரமாக முடிந்தது!",
          "registrationFailed": "பதிவு தோல்வியடைந்தது!",
          "enterDetails": "பதிவு செய்ய உங்கள் விவரங்களை உள்ளிடுங்கள்",
          "alreadyHaveAccount": "உங்களுக்கு ஏற்கனவே கணக்கு உண்டா?",
          "signIn": "உள்நுழைய",
          "signInButton": "உள்நுழைய",
          "forgotPassword": "கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
          "resetPassword": "அதை இங்கே மீட்டமைக்கவும்",
          "createAccount": "ஒரு கணக்கு உருவாக்கு",
          "notRegistered": "பதிவுசெய்யப்படவில்லை?",
          "loginSuccess": "உள்நுழைவு வெற்றிகரமாக முடிந்தது!",
          "loginFailed": "தவறான மின்னஞ்சல் அல்லது கடவுச்சொல். தயவுசெய்து மீண்டும் முயற்சிக்கவும்."
        }
      }
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
