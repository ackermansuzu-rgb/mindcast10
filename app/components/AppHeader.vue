<template>
  <v-app-bar
    class="site-header"
    color="background"
    elevation="0"
    height="82"
  >
    <v-container class="header-inner">

      <!-- BRAND LOGO -->
      <NuxtLink
        class="brand"
        to="/"
        aria-label="MindCast home"
      >
        <span class="brand-mark">
          <v-icon>mdi-waveform</v-icon>
        </span>

        <span class="brand-name">
          mind<span>cast</span>
          <small>FINAL EXAMINATION IN WEB DEVELOPMENT</small>
        </span>
      </NuxtLink>

      <v-spacer />

      <!-- DESKTOP NAVIGATION -->
      <nav
        aria-label="Main navigation"
        class="desktop-navigation"
      >
        <NuxtLink to="/" exact-active-class="active-link">
          Home
        </NuxtLink>

        <NuxtLink to="/about" active-class="active-link">
          About
        </NuxtLink>

        <NuxtLink to="/contact" active-class="active-link">
          Contact
        </NuxtLink>
      </nav>

      <!-- PRODUCTS BUTTON -->
      <v-btn
        class="header-products"
        to="/products"
        rounded="0"
        variant="outlined"
      >
        <v-icon start size="17">
          mdi-shopping-outline
        </v-icon>
        Products
      </v-btn>

      <!-- LET'S TALK BUTTON -->
      <v-btn
        class="header-cta"
        to="/contact"
        rounded="0"
        variant="outlined"
      >
        Let's talk
        <v-icon end size="17">
          mdi-arrow-top-right
        </v-icon>
      </v-btn>

      <!-- PROFILE ICON: VISIBLE AFTER LOGIN -->
      <v-menu
        v-if="isLoggedIn"
        location="bottom end"
        offset="12"
      >
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon
            class="profile-button"
            aria-label="Open profile menu"
          >
            <v-avatar
              size="38"
              class="profile-avatar"
            >
              {{ userInitial }}
            </v-avatar>
          </v-btn>
        </template>

        <v-card
          class="profile-menu-card"
          min-width="230"
          rounded="lg"
        >
          <v-card-text class="pa-4">
            <div class="profile-info">
              <v-avatar
                size="48"
                class="profile-avatar mb-3"
              >
                {{ userInitial }}
              </v-avatar>

              <div class="profile-name">
                {{ userName }}
              </div>

              <div class="profile-email">
                {{ userEmail }}
              </div>
            </div>
          </v-card-text>

          <v-divider />

          <v-list
            class="profile-list"
            density="comfortable"
          >
            <v-list-item
              prepend-icon="mdi-account-circle-outline"
              title="My Profile"
              @click="openProfileDialog"
            />

            <v-list-item
              prepend-icon="mdi-logout"
              title="Log Out"
              class="logout-item"
              @click="logout"
            />
          </v-list>
        </v-card>
      </v-menu>

      <!-- HAMBURGER MENU -->
      <v-menu
        location="bottom end"
        offset="12"
      >
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon
            variant="text"
            aria-label="Open navigation menu"
            class="hamburger-button"
          >
            <v-icon size="26">
              mdi-menu
            </v-icon>
          </v-btn>
        </template>

        <v-list
          class="hamburger-dropdown"
          min-width="220"
        >
          <!-- MOBILE NAVIGATION LINKS -->
          <div class="dropdown-heading">
            ACCOUNT
          </div>

     

          <v-divider class="my-2" />

          <!-- LOGIN / SIGN UP -->
          <template v-if="!isLoggedIn">
            <v-list-item
              title="Log In / Sign Up"
              prepend-icon="mdi-account-outline"
              class="auth-menu-item"
              @click="openAuthDialog('login')"
            />
          </template>

          <!-- ACCOUNT OPTIONS WHEN LOGGED IN -->
          <template v-else>
           

            <v-list-item
              title="My Profile"
              prepend-icon="mdi-account-circle-outline"
              @click="openProfileDialog"
            />

            <v-list-item
              title="Log Out"
              prepend-icon="mdi-logout"
              class="logout-item"
              @click="logout"
            />
          </template>
        </v-list>
      </v-menu>

    </v-container>
  </v-app-bar>


  <!-- LOGIN / SIGN UP DIALOG -->
  <v-dialog
    v-model="authDialog"
    max-width="440"
  >
    <v-card class="auth-dialog-card">

      <!-- CLOSE BUTTON -->
      <div class="dialog-close">
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="authDialog = false"
        />
      </div>

      <!-- AUTH HEADER -->
      <div class="auth-heading">
        <div class="auth-logo">
          <v-icon size="27">
            mdi-waveform
          </v-icon>
        </div>

        <h2>
          Welcome to <span>mindcast</span>
        </h2>

        <p>
          Your productivity journey starts here.
        </p>
      </div>

      <!-- LOGIN / SIGNUP TABS -->
      <v-tabs
        v-model="authTab"
        class="auth-tabs"
        grow
        color="primary"
        slider-color="primary"
      >
        <v-tab value="login">
          Log In
        </v-tab>

        <v-tab value="signup">
          Sign Up
        </v-tab>
      </v-tabs>

      <v-card-text class="auth-form-content">

        <!-- LOGIN FORM -->
        <div v-if="authTab === 'login'">
          <h3>Welcome back!</h3>

          <p class="auth-subtitle">
            Log in to your MindCast account.
          </p>

          <v-form @submit.prevent="login">

            <v-text-field
              v-model="loginEmail"
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              density="comfortable"
              color="primary"
              :rules="[requiredRule, emailRule]"
            />

            <v-text-field
              v-model="loginPassword"
              label="Password"
              placeholder="Enter your password"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="
                showPassword ? 'mdi-eye-off' : 'mdi-eye'
              "
              @click:append-inner="showPassword = !showPassword"
              variant="outlined"
              density="comfortable"
              color="primary"
              :rules="[requiredRule]"
            />

            <p v-if="authError" class="auth-error">
              {{ authError }}
            </p>

            <v-btn
              block
              type="submit"
              color="primary"
              size="large"
              rounded="lg"
              class="auth-submit"
            >
              Log In
            </v-btn>

          </v-form>

          <p class="auth-switch">
            Don't have an account?

            <button @click="switchAuthTab('signup')">
              Sign Up
            </button>
          </p>
        </div>

        <!-- SIGN UP FORM -->
        <div v-else>
          <h3>Create your account</h3>

          <p class="auth-subtitle">
            Join the MindCast community.
          </p>

          <v-form @submit.prevent="signup">

            <v-text-field
              v-model="signupName"
              label="Full Name"
              placeholder="Enter your full name"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
              density="comfortable"
              color="primary"
              :rules="[requiredRule]"
            />

            <v-text-field
              v-model="signupEmail"
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              density="comfortable"
              color="primary"
              :rules="[requiredRule, emailRule]"
            />

            <v-text-field
              v-model="signupPassword"
              label="Password"
              placeholder="Create a password"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="
                showPassword ? 'mdi-eye-off' : 'mdi-eye'
              "
              @click:append-inner="showPassword = !showPassword"
              variant="outlined"
              density="comfortable"
              color="primary"
              :rules="[requiredRule, passwordRule]"
            />

            <p v-if="authError" class="auth-error">
              {{ authError }}
            </p>

            <v-btn
              block
              type="submit"
              color="primary"
              size="large"
              rounded="lg"
              class="auth-submit"
            >
              Create Account
            </v-btn>

          </v-form>

          <p class="auth-switch">
            Already have an account?

            <button @click="switchAuthTab('login')">
              Log In
            </button>
          </p>
        </div>

      </v-card-text>
    </v-card>
  </v-dialog>


  <!-- MY PROFILE DIALOG -->
  <v-dialog
    v-model="profileDialog"
    max-width="380"
  >
    <v-card class="auth-dialog-card pa-5">

      <div class="dialog-close">
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="profileDialog = false"
        />
      </div>

      <div class="profile-dialog-info">
        <v-avatar
          size="75"
          class="profile-avatar mb-3"
        >
          {{ userInitial }}
        </v-avatar>

        <h3>{{ userName }}</h3>
        <p>{{ userEmail }}</p>
      </div>

      <v-divider class="my-4" />

      <v-btn
        block
        color="error"
        variant="outlined"
        @click="logout"
      >
        <v-icon start>mdi-logout</v-icon>
        Log Out
      </v-btn>

    </v-card>
  </v-dialog>

</template>


<script setup lang="ts">
import { ref, computed, onMounted } from "vue";


// ======================================
// AUTHENTICATION STATE
// ======================================

const authDialog = ref(false);
const profileDialog = ref(false);

const authTab = ref("login");
const isLoggedIn = ref(false);

const userName = ref("");
const userEmail = ref("");


// ======================================
// LOGIN FORM
// ======================================

const loginEmail = ref("");
const loginPassword = ref("");


// ======================================
// SIGN UP FORM
// ======================================

const signupName = ref("");
const signupEmail = ref("");
const signupPassword = ref("");


// ======================================
// OTHER STATES
// ======================================

const showPassword = ref(false);
const authError = ref("");


// ======================================
// USER INITIAL
// ======================================

const userInitial = computed(() => {
  return userName.value.trim()
    ? userName.value.trim().charAt(0).toUpperCase()
    : "?";
});


// ======================================
// VALIDATION
// ======================================

const requiredRule = (value: string) =>
  Boolean(value?.trim()) || "This field is required.";

const emailRule = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
  "Please enter a valid email address.";

const passwordRule = (value: string) =>
  value.length >= 6 ||
  "Password must be at least 6 characters.";


// ======================================
// OPEN LOGIN / SIGNUP
// ======================================

function openAuthDialog(tab = "login") {
  authTab.value = tab;
  authError.value = "";
  showPassword.value = false;
  authDialog.value = true;
}

function switchAuthTab(tab: string) {
  authTab.value = tab;
  authError.value = "";
  showPassword.value = false;
}


// ======================================
// SIGN UP
// ======================================

function signup() {
  authError.value = "";

  const cleanName = signupName.value.trim();
  const cleanEmail = signupEmail.value.trim();

  if (!cleanName) {
    authError.value = "Please enter your full name.";
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    authError.value = "Please enter a valid email address.";
    return;
  }

  if (signupPassword.value.length < 6) {
    authError.value = "Password must be at least 6 characters.";
    return;
  }

  // DEMO ACCOUNT STORAGE
  const account = {
    name: cleanName,
    email: cleanEmail,
    password: signupPassword.value
  };

  localStorage.setItem(
    "mindcast-account",
    JSON.stringify(account)
  );

  // AUTOMATIC LOGIN AFTER SIGNUP
  setLoggedInUser(account);

  // CLEAR FORM
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";

  authDialog.value = false;
}


// ======================================
// LOGIN
// ======================================

function login() {
  authError.value = "";

  const savedAccount = localStorage.getItem("mindcast-account");

  if (!savedAccount) {
    authError.value = "No account found. Please sign up first.";
    return;
  }

  try {
    const account = JSON.parse(savedAccount);

    const enteredEmail = loginEmail.value.trim().toLowerCase();

    if (
      enteredEmail !== account.email.toLowerCase() ||
      loginPassword.value !== account.password
    ) {
      authError.value = "Incorrect email or password.";
      return;
    }

    setLoggedInUser(account);

    loginEmail.value = "";
    loginPassword.value = "";

    authDialog.value = false;

  } catch {
    authError.value = "Unable to read account information.";
  }
}


// ======================================
// SET LOGGED-IN USER
// ======================================

function setLoggedInUser(account: {
  name: string;
  email: string;
}) {
  userName.value = account.name;
  userEmail.value = account.email;
  isLoggedIn.value = true;

  localStorage.setItem(
    "mindcast-user",
    JSON.stringify({
      name: account.name,
      email: account.email
    })
  );
}


// ======================================
// LOG OUT
// ======================================

function logout() {
  isLoggedIn.value = false;

  userName.value = "";
  userEmail.value = "";

  localStorage.removeItem("mindcast-user");

  authDialog.value = false;
  profileDialog.value = false;
}


// ======================================
// PROFILE
// ======================================

function openProfileDialog() {
  profileDialog.value = true;
}


// ======================================
// LOAD SAVED SESSION
// ======================================

onMounted(() => {
  const savedUser = localStorage.getItem("mindcast-user");

  if (!savedUser) return;

  try {
    const user = JSON.parse(savedUser);

    if (user.name && user.email) {
      userName.value = user.name;
      userEmail.value = user.email;
      isLoggedIn.value = true;
    }

  } catch {
    localStorage.removeItem("mindcast-user");
  }
});
</script>


<style scoped>

/* HEADER */
.site-header {
  position: sticky !important;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(52, 230, 181, 0.12);
}

.header-inner {
  display: flex;
  max-width: 1200px;
  align-items: center;
  padding: 0 24px;
}


/* BRAND */
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #f5fff9;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 50%;
  background: #087f5b;
  color: #f5fff9;
}

.brand-mark :deep(.v-icon) {
  font-size: 23px;
}

.brand-name {
  display: flex;
  flex-direction: column;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
}

.brand-name > span {
  margin-left: 3px;
  color: #34e6b5;
}

.brand-name small {
  margin-top: 5px;
  color: #8eaaa0;
  font-family: Arial, sans-serif;
  font-size: 0.43rem;
  font-weight: 700;
  letter-spacing: 0.13em;
}


/* DESKTOP NAVIGATION */
.desktop-navigation {
  display: flex;
  align-items: center;
  gap: 35px;
  margin-right: 36px;
}

.desktop-navigation a {
  position: relative;
  padding: 8px 0;
  color: #a4b9b0;
  font-size: 0.77rem;
  text-decoration: none;
}

.desktop-navigation a:hover,
.desktop-navigation .active-link {
  color: #00d6a0;
}

.desktop-navigation .active-link::after {
  position: absolute;
  right: 0;
  bottom: 1px;
  left: 0;
  height: 1px;
  background: #00d6a0;
  content: "";
}


/* PRODUCTS */
.header-products {
  min-height: 39px;
  margin-right: 12px;
  border-color: rgba(52, 230, 181, 0.4);
  color: #34e6b5;
  font-size: 0.72rem;
  letter-spacing: 0;
}

.header-products:hover {
  background: rgba(52, 230, 181, 0.08);
  border-color: #34e6b5;
}


/* LET'S TALK */
.header-cta {
  min-height: 39px;
  margin-right: 8px;
  border-color: rgba(52, 230, 181, 0.4);
  color: #34e6b5;
  font-size: 0.72rem;
  letter-spacing: 0;
}


/* HAMBURGER */
.hamburger-button {
  margin-left: 3px;
  color: #f5fff9;
}

.hamburger-button:hover {
  color: #34e6b5;
}


/* HAMBURGER DROPDOWN */
.hamburger-dropdown {
  min-width: 220px;
  background: #0d211b !important;
  color: #f5fff9 !important;
  border: 1px solid rgba(52, 230, 181, 0.2);
}

.hamburger-dropdown :deep(.v-list-item-title) {
  font-size: 0.82rem;
}

.hamburger-dropdown :deep(.v-list-item:hover) {
  color: #34e6b5;
}

.dropdown-heading {
  padding: 12px 16px 6px;
  color: #72b9a2;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.13em;
}

.auth-menu-item {
  color: #34e6b5;
}

.logout-item {
  color: #ff8585;
}


/* PROFILE BUTTON */
.profile-button {
  margin-left: 5px;
}

.profile-avatar {
  background: #087f5b !important;
  color: #ffffff !important;
  border: 2px solid #34e6b5;
  font-weight: 700;
}

.profile-menu-card {
  background: #0d211b !important;
  color: #f5fff9 !important;
  border: 1px solid rgba(52, 230, 181, 0.2);
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.profile-name {
  color: #f5fff9;
  font-size: 0.9rem;
  font-weight: 700;
}

.profile-email {
  margin-top: 4px;
  color: #8eaaa0;
  font-size: 0.75rem;
  overflow-wrap: anywhere;
}

.profile-list {
  background: transparent !important;
  color: #f5fff9;
}

.profile-dialog-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.profile-dialog-info h3 {
  margin: 5px 0;
  color: #f5fff9;
}

.profile-dialog-info p {
  color: #8eaaa0;
  font-size: 0.8rem;
}


/* AUTH DIALOG */
.auth-dialog-card {
  position: relative;
  overflow: hidden;
  background: #0d211b !important;
  color: #f5fff9 !important;
  border: 1px solid rgba(52, 230, 181, 0.2);
}

.dialog-close {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 5;
}

.auth-heading {
  padding: 35px 25px 20px;
  text-align: center;
}

.auth-logo {
  display: grid;
  width: 52px;
  height: 52px;
  margin: 0 auto 15px;
  place-items: center;
  border-radius: 50%;
  background: #087f5b;
  color: #ffffff;
}

.auth-heading h2 {
  margin: 0;
  color: #f5fff9;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.55rem;
  font-weight: 400;
}

.auth-heading h2 span {
  color: #34e6b5;
}

.auth-heading p {
  margin-top: 8px;
  color: #8eaaa0;
  font-size: 0.78rem;
}

.auth-tabs {
  border-bottom: 1px solid rgba(52, 230, 181, 0.12);
}

.auth-tabs :deep(.v-tab) {
  color: #8eaaa0;
  font-size: 0.78rem;
  letter-spacing: 0;
}

.auth-tabs :deep(.v-tab--selected) {
  color: #34e6b5;
}

.auth-form-content {
  padding: 25px 28px 30px;
}

.auth-form-content h3 {
  margin: 0;
  color: #f5fff9;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.4rem;
  font-weight: 400;
}

.auth-subtitle {
  margin: 7px 0 22px;
  color: #8eaaa0;
  font-size: 0.78rem;
}

.auth-form-content :deep(.v-field) {
  color: #f5fff9;
}

.auth-form-content :deep(.v-label) {
  color: #8eaaa0;
}

.auth-error {
  margin: 0 0 15px;
  color: #ff8585;
  font-size: 0.78rem;
}

.auth-submit {
  margin-top: 5px;
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
}

.auth-switch {
  margin-top: 22px;
  color: #8eaaa0;
  font-size: 0.78rem;
  text-align: center;
}

.auth-switch button {
  margin-left: 4px;
  border: none;
  background: transparent;
  color: #34e6b5;
  font-size: inherit;
  font-weight: 700;
  cursor: pointer;
}

.auth-switch button:hover {
  text-decoration: underline;
}


/* MOBILE */
@media (max-width: 900px) {
  .header-inner {
    padding: 0 16px;
  }

  .desktop-navigation {
    gap: 20px;
    margin-right: 20px;
  }

  .header-products {
    margin-right: 7px;
  }

  .header-cta {
    margin-right: 5px;
  }
}

@media (max-width: 650px) {
  .header-inner {
    padding: 0 12px;
  }

  .desktop-navigation {
    display: none;
  }

  .header-products {
    margin-right: 5px;
  }

  .header-cta {
    display: none;
  }

  .brand-name {
    font-size: 1.1rem;
  }

  .brand-name small {
    font-size: 0.38rem;
  }
}

@media (max-width: 390px) {
  .brand-name {
    font-size: 1rem;
  }

  .brand-name small {
    font-size: 0.34rem;
  }

  .brand-mark {
    width: 34px;
    height: 34px;
  }

  .header-products {
    padding: 0 7px;
    font-size: 0.62rem;
  }
}

</style>