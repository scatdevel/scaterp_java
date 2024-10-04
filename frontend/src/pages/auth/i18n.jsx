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
          "loginFailed": "Invalid email or password. Please try again.",


          // ProfilePage
          "settingsPage": "Settings Page",
          "personal Information": "Personal Information",
          "fullName": "Full Name",
          "phoneNumber": "Phone Number",
          "dob": "Date of Birth",
          "bio": "Bio",
          "cancel": "Cancel",
          "save": "Save",
          "profileUpdated": "Profile updated successfully",
          "photoUpload": "Your Photo",
          
            "yourPhoto": "Your Photo",
            "delete": "Delete",
            "update": "Update",
          //land details


          "address": "Address",
          "enterAddress": "Enter address",
          "village": "Village",
          "enterVillageName": "Enter village name",
          "district": "District",
          "enterDistrict": "Enter district",
          "pincode": "Pincode",
          "enterPincode": "Enter pincode",
          "state": "State",
          "enterState": "Enter state",
          "street": "Street",
          "enterStreetName": "Enter street name",
          "cultivationType": "Cultivation Type",
          "selectCultivationType": "Select Cultivation Type",
          "organic": "Organic",
          "conventional": "Conventional",
          "hydroponic": "Hydroponic",
          "landOwnership": "Land Ownership",
          "selectLandOwnership": "Select Land Ownership",
          "owned": "Owned",
          "leased": "Leased",
          "rented": "Rented",
          "width": "Width (in meters)",
          "enterWidth": "Enter width",
          "breadth": "Breadth (in meters)",
          "enterBreadth": "Enter breadth",
          "area": "Area (in square meters)",
          "autoCalculatedArea": "Auto-calculated area",
          "fetching": "Fetching...",
          "locateOnMap": "Locate on Map",
          "submit": "Submit",
          //crop details form

          "cropDetailsForm": "Crop Details Form",
          "cropName": "Crop Name",
          "category": "Category",
          "cropImage": "Crop Image",
          "actualProduction": "Actual Production",
          "projectedProduction": "Projected Production",
          "landValueUnit": "Land Value Unit",
          "cultivationLandValue": "Cultivation Land Value",
          "cost": "Cost",
          "projectCost": "Project Cost",
          "projectionTimeline": "Projection Timeline",
          "selectTimelineType": "Select Timeline Type",
          "enterCropName": "Enter crop name",
          "selectCategory": "Select a category",
          "enterActualProduction": "Enter actual production",
          "enterProjectedProduction": "Enter projected production",
          "enterValue": "Enter value",
          "selectUnit": "Select unit",
          "enterCost": "Enter cost",
          "enterProjectCost": "Enter project cost",
          "enterTimelineValue": "Enter timeline value",
          "months": "Months",
          "days": "Days",
          "remove": "Remove",
          "addCrop": "Add Crop",
         "cropDetailsFormSuccess": "Crop details saved successfully!",
          "cropDetailsFormError": "Error saving crop details. Please try again.",
          "acres": "Acres",
          "hectares": "Hectares",

//crop over view
cropOverview: "Crop Overview",
loading: "Loading...",
noCrops: "No crop details found.",
previous: "Previous",
next: "Next",
noImageAvailable: "No Image Available"
        }
      },
      ta: {
        translation: {
          "signUp": "பதிவுசெய்ய",
          "username": "பயனர்பெயர்",
          "email": "மின்னஞ்சல் முகவரி",
          "Password": "கடவுச்சொல்",
          "role": "பங்கு",
          "Terms and Conditions": "விதிமுறைகள் மற்றும் நிபந்தனைகளை ஒப்புக்கொள்கிறேன்",
          "Enter your Email and password to Sign In.": "உங்கள் மின்னஞ்சல் மற்றும் கடவுச்சொல்லை உள்ளிடவும் உள்நுழைவு செய்ய காத்திருக்கின்றேன்.",
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
          "loginFailed": "தவறான மின்னஞ்சல் அல்லது கடவுச்சொல். தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",


          // ProfilePage
          "settingsPage": "அமைப்புகள் பக்கம்",
          "personal Information": "பயனர் தகவல்",
          "fullName": "முழு பெயர்",
          "phoneNumber": "தொலைபேசி எண்",
          "dob": "பிறந்த தேதி",
          "bio": "சுயவிவரம்",
          "cancel": "ரத்து செய்",
          "save": "சேமி",
          "profileUpdated": "சுயவிவரத்தை வெற்றிகரமாக புதுப்பிக்கப்பட்டது",
          "photoUpload": "உங்கள் படம்",
          
            "yourPhoto": "உங்கள் படம்",
            "delete": "அழிக்கவும்",
            "update": "மேம்படுத்தவும்",
          
          //land details form

          "address": "முகவரி",
  "enterAddress": "முகவரியை உள்ளிடவும்",
  "village": "கிராமம்",
  "enterVillageName": "கிராமத்தின் பெயரை உள்ளிடவும்",
  "district": "மாவட்டம்",
  "enterDistrict": "மாவட்டத்தை உள்ளிடவும்",
  "pincode": "பின்கோடு",
  "enterPincode": "பின்கோடுகளை உள்ளிடவும்",
  "state": "மாநிலம்",
  "enterState": "மாநிலத்தை உள்ளிடவும்",
  "street": "தெரு",
  "enterStreetName": "தெரு பெயரை உள்ளிடவும்",
  "cultivationType": "விவசாய வகை",
  "selectCultivationType": "விவசாய வகையைத் தேர்வுசெய்க",
  "organic": "ஆர்கானிக்",
  "conventional": "அதிகார முறை",
  "hydroponic": "ஹைட்ரோபோனிக்",
  "landOwnership": "நில உரிமை",
  "selectLandOwnership": "நில உரிமையைத் தேர்வுசெய்க",
  "owned": "உரிமையுள்ள",
  "leased": "குத்தகைக்கு",
  "rented": "வாடைகைக்கு",

  "width": "அகலம் (மீட்டர்களில்)",
  "enterWidth": "அகலத்தை உள்ளிடவும்",
  "breadth": "அந்தரங்கம் (மீட்டர்களில்)",
  "enterBreadth": "அந்தரங்கத்தை உள்ளிடவும்",
  "area": "பரப்பு (சதுர மீட்டர்களில்)",
  "autoCalculatedArea": "தானாகக் கணக்கிடப்பட்ட பரப்பு",
  "fetching": "அடைதல்...",
  "locateOnMap": "வரைப்படத்தில் காண்க",
  "submit": "சமர்ப்பிக்கவும்",



//land details form

  "cropDetailsForm": "விவசாயத் தகவல் படிவம்",
  "cropName": "விவசாயப் பெயர்",
  "category": "வகை",
  "cropImage": "விவசாயப் படம்",
  "actualProduction": "உண்மை உற்பத்தி",
  "projectedProduction": "திட்டமிட்ட உற்பத்தி",
  "landValueUnit": "நில மதிப்பு அலகு",
  "cultivationLandValue": "விவசாய நில மதிப்பு",
  "cost": "செலவு",
  "projectCost": "திட்ட செலவு",
  "projectionTimeline": "திட்ட நேரக்கோடு",
  "selectTimelineType": "நேரக்கோடு வகையை தேர்ந்தெடுக்கவும்",
  "enterCropName": "விவசாயப் பெயரை உள்ளிடவும்",
  "selectCategory": "ஒரு வகையைத் தேர்ந்தெடுக்கவும்",
  "enterActualProduction": "உண்மை உற்பத்தியை உள்ளிடவும்",
  "enterProjectedProduction": "திட்டமிட்ட உற்பத்தியை உள்ளிடவும்",
  "enterValue": "மதிப்பை உள்ளிடவும்",
  "selectUnit": "அலகைத் தேர்ந்தெடுக்கவும்",
  "enterCost": "செலவினை உள்ளிடவும்",
  "enterProjectCost": "திட்ட செலவினை உள்ளிடவும்",
  "enterTimelineValue": "நேரக்கோடு மதிப்பை உள்ளிடவும்",
  "months": "மாதங்கள்",
  "days": "நாட்கள்",
  "acres": "ஏக்கர்கள்",
  "hectares": "ஹெக்டேர்கள்",
  "remove": "அகற்று",
  "addCrop": "விவசாயத்தைச் சேர்",
  
  "cropDetailsFormSuccess": "விவசாயத் தகவல்கள் வெற்றிகரமாக சேமிக்கப்பட்டன!",
  "cropDetailsFormError": "விவசாயத் தகவல்களைச் சேமிக்க பிழை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.",

//crop over view


cropOverview: "வளையத்திட்டம் மேலோட்டம்",
          loading: "உள்ளேற்றுகிறது...",
          noCrops: "வளையங்கள் காணவில்லை.",
          previous: "முந்தைய",
          next: "அடுத்த",
          noImageAvailable: "சேமிப்பு இல்லை"


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
