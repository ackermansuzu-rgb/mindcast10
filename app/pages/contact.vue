<template>
  <div class="contact-page">

    <!-- HERO SECTION -->
    <section class="contact-hero">
      <div class="contact-hero-content">
        <p class="eyebrow hero-eyebrow">
          <span class="pulse-dot"></span>
          WE'D LOVE TO HEAR FROM YOU
        </p>

        <h1>CONTACT US</h1>

        <p class="hero-description">
          Have a story, a question, or just want to say hello?
          <br />
          Our door—and inbox—are always open.
        </p>
      </div>
    </section>

    <!-- MAIN CONTACT SECTION -->
    <section class="contact-content">

      <!-- CONTACT FORM -->
      <div class="form-column">
        <p class="eyebrow">SEND US A NOTE</p>

        <h2>
          Let's talk<br />
          about it<span>.</span>
        </h2>

        <p class="form-intro">
          Fill in the details below and we'll get back to you as soon as we can.
        </p>

        <form
          class="contact-form"
          @submit.prevent="submitMessage"
        >

          <!-- NAME AND EMAIL -->
          <div class="field-row">

            <div class="form-group">
              <label for="contact-name">Your Name</label>

              <input
                id="contact-name"
                v-model="name"
                type="text"
                placeholder="How should we call you?"
                autocomplete="name"
                required
              />
            </div>

            <div class="form-group">
              <label for="contact-email">Your Email</label>

              <input
                id="contact-email"
                v-model="email"
                type="email"
                placeholder="you@example.com"
                autocomplete="email"
                required
              />
            </div>

          </div>

          <!-- SUBJECT AND PHONE -->
          <div class="field-row">

            <div class="form-group">
              <label for="contact-subject">Your Subject</label>

              <input
                id="contact-subject"
                v-model="subject"
                type="text"
                placeholder="What is this about?"
                required
              />
            </div>

            <div class="form-group">
              <label for="contact-phone">Phone Number</label>

              <input
                id="contact-phone"
                v-model="phone"
                type="tel"
                placeholder="+63 997 555 0142"
                autocomplete="tel"
              />
            </div>

          </div>

          <!-- MESSAGE -->
          <div class="form-group message-group">
            <label for="contact-message">Your Message</label>

            <textarea
              id="contact-message"
              v-model="message"
              placeholder="Tell us what's on your mind..."
              rows="5"
              required
            ></textarea>
          </div>

          <!-- SEND BUTTON -->
          <button
            type="submit"
            class="send-button"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? "Sending..." : "Send your message" }}
            <span>→</span>
          </button>

          <!-- SUCCESS MESSAGE -->
          <p
            v-if="successMessage"
            class="success-message"
            role="status"
          >
            <v-icon size="18">mdi-check-circle-outline</v-icon>
            {{ successMessage }}
          </p>

        </form>
      </div>

      <!-- STUDIO DETAILS -->
      <aside class="details-column">

        <div class="details-card">

          <p class="eyebrow">THE STUDIO DETAILS</p>

          <h3>Come say hello.</h3>

          <p class="details-intro">
            Good conversations can start anywhere. Here's where to find us.
          </p>

          <!-- PHONE -->
          <div class="detail-item">
            <span class="detail-icon">
              <v-icon>mdi-phone-outline</v-icon>
            </span>

            <div class="detail-copy">
              <h4>Phone</h4>

              <a href="tel:+639457368177">
                0945 736 8177
              </a>
            </div>
          </div>

          <!-- LOCATION -->
          <div class="detail-item">
            <span class="detail-icon">
              <v-icon>mdi-map-marker-outline</v-icon>
            </span>

            <div class="detail-copy">
              <h4>Find the studio</h4>

              <p>
                St. Nicolas, Second Floor
                <br />
                San Fernando
              </p>
            </div>
          </div>

          <!-- EMAIL -->
          <div class="detail-item">
            <span class="detail-icon">
              <v-icon>mdi-email-outline</v-icon>
            </span>

            <div class="detail-copy">
              <h4>Drop us a line</h4>

              <a href="mailto:WebDevelopment@mindcast.fm">
                WebDevelopment@mindcast.fm
              </a>

              <a href="mailto:press@mindcast.fm">
                press@mindcast.fm
              </a>
            </div>
          </div>

          <!-- STUDIO HOURS -->
          <div class="studio-hours">
            <span class="pulse-dot"></span>
            <span>STUDIO HOURS</span>
            <span class="hours-time">
              MON–FRI · 9AM–5PM ET
            </span>
          </div>

        </div>

        <!-- SOCIAL LINKS -->
        <div class="social-card">
          <span>FOLLOW ALONG</span>

          <div class="social-links">

            <a
              href="https://www.instagram.com/"
              aria-label="MindCast on Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <v-icon>mdi-instagram</v-icon>
            </a>

            <a
              href="https://www.youtube.com/"
              aria-label="MindCast on YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <v-icon>mdi-youtube</v-icon>
            </a>

            <a
              href="https://www.spotify.com/"
              aria-label="MindCast on Spotify"
              target="_blank"
              rel="noopener noreferrer"
            >
              <v-icon>mdi-spotify</v-icon>
            </a>

          </div>
        </div>

      </aside>
    </section>

    <!-- NOTIFICATION -->
    <v-snackbar
      v-model="snackbar"
      color="success"
      location="bottom"
      timeout="3500"
    >
      {{ snackbarText }}

      <template #actions>
        <v-btn
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";

// FORM DATA
const name = ref("");
const email = ref("");
const subject = ref("");
const phone = ref("");
const message = ref("");

// NOTIFICATIONS
const successMessage = ref("");
const isSubmitting = ref(false);
const snackbar = ref(false);
const snackbarText = ref("");


// SUBMIT CONTACT FORM
function submitMessage() {
  successMessage.value = "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name.value.trim()) {
    snackbarText.value = "Please enter your name.";
    snackbar.value = true;
    return;
  }

  if (!emailPattern.test(email.value.trim())) {
    snackbarText.value = "Please enter a valid email address.";
    snackbar.value = true;
    return;
  }

  if (!subject.value.trim()) {
    snackbarText.value = "Please enter your subject.";
    snackbar.value = true;
    return;
  }

  if (!message.value.trim()) {
    snackbarText.value = "Please enter your message.";
    snackbar.value = true;
    return;
  }

  isSubmitting.value = true;

  successMessage.value =
    `Thank you, ${name.value.trim()}! Your message has been validated. ` +
    "This demo does not send messages yet.";

  snackbarText.value = "Your message details are ready!";
  snackbar.value = true;

  // CLEAR FORM
  name.value = "";
  email.value = "";
  subject.value = "";
  phone.value = "";
  message.value = "";

  isSubmitting.value = false;
}
</script>


<style scoped>

/* =================================
   GENERAL
================================= */

.contact-page {
  min-height: 100vh;
  overflow: hidden;
  background: #061310;
  color: #f5fff9;
  font-family: Arial, Helvetica, sans-serif;
}


/* =================================
   HERO SECTION
================================= */

.contact-hero {
  position: relative;
  display: flex;
  min-height: 330px;
  align-items: center;
  overflow: hidden;

  background:
    linear-gradient(
      90deg,
      rgba(6, 19, 16, 0.97) 0%,
      rgba(6, 19, 16, 0.88) 50%,
      rgba(6, 19, 16, 0.52) 100%
    ),
    url("https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1800&q=85")
    center 48% / cover;
}

.contact-hero::after {
  position: absolute;
  inset: 0;

  background-image: radial-gradient(
    rgba(255, 255, 255, 0.13) 0.7px,
    transparent 0.7px
  );

  background-size: 7px 7px;
  content: "";
  opacity: 0.24;
  pointer-events: none;
}

.contact-hero-content {
  position: relative;
  z-index: 1;

  width: min(1120px, 86%);
  margin: 0 auto;
  padding: 48px 0;

  color: #f5fff9;
}


/* =================================
   EYEBROW
================================= */

.eyebrow {
  margin: 0 0 15px;
  color: #72b9a2;

  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #34e6b5;
}

.pulse-dot {
  display: inline-block;

  width: 7px;
  height: 7px;
  flex: 0 0 7px;

  border-radius: 50%;
  background: #00d6a0;
}


/* =================================
   HERO TITLE
================================= */

.contact-hero h1 {
  margin: 0;

  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(3.2rem, 6vw, 5rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.05;
}

.hero-description {
  margin: 14px 0 0;

  color: rgba(255, 255, 255, 0.78);
  font-size: 0.88rem;
  line-height: 1.8;
}


/* =================================
   MAIN CONTENT
================================= */

.contact-content {
  display: grid;

  grid-template-columns:
    minmax(0, 1.35fr)
    minmax(300px, 0.75fr);

  align-items: start;
  gap: clamp(40px, 7vw, 100px);

  width: min(1100px, 86%);
  margin: 0 auto;
  padding: 70px 0 90px;
}


/* =================================
   FORM HEADING
================================= */

.form-column > .eyebrow {
  margin-bottom: 12px;
}

.form-column h2 {
  margin: 0;

  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.8rem, 4vw, 4rem);
  font-weight: 400;
  letter-spacing: -0.05em;
  line-height: 1.05;
}

.form-column h2 span {
  color: #00d6a0;
}

.form-intro {
  margin: 16px 0 30px;

  color: #a4b9b0;
  font-size: 0.84rem;
  line-height: 1.7;
}


/* =================================
   FORM LAYOUT
================================= */

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  min-width: 0;
}

.field-row {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    minmax(0, 1fr);

  gap: 16px;
  width: 100%;
}


/* =================================
   FORM GROUP
================================= */

.form-group {
  display: flex;
  flex-direction: column;
  gap: 9px;

  width: 100%;
  min-width: 0;
}


/* =================================
   FIELD LABELS
================================= */

.form-group label {
  display: block !important;
  position: static !important;

  width: 100%;
  margin: 0 !important;
  padding: 0 !important;

  color: #34cfa9;
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1.4;

  transform: none !important;
}


/* =================================
   INPUT FIELDS
================================= */

.form-group input {
  display: block !important;
  position: static !important;

  box-sizing: border-box !important;

  width: 100% !important;
  height: 56px !important;
  min-height: 56px !important;
  max-height: 56px !important;

  margin: 0 !important;
  padding: 0 15px !important;

  border: 1px solid rgba(114, 185, 162, 0.38) !important;
  border-radius: 2px !important;

  outline: none !important;
  box-shadow: none;

  background: #071712 !important;
  color: #f5fff9 !important;

  font-family: Arial, Helvetica, sans-serif !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: normal !important;
  letter-spacing: normal !important;

  text-align: left !important;
  text-indent: 0 !important;

  transform: none !important;
  transition: border-color 0.2s ease;

  appearance: none;
  -webkit-appearance: none;
}


/* INPUT FOCUS */

.form-group input:focus {
  border-color: #00d6a0 !important;
  outline: none !important;
  box-shadow: 0 0 0 1px rgba(0, 214, 160, 0.12) !important;
}


/* INPUT PLACEHOLDER */

.form-group input::placeholder {
  color: #78968a !important;
  opacity: 0.8 !important;
  font-size: 13px;
}


/* =================================
   MESSAGE TEXTAREA
================================= */

.message-group textarea {
  display: block !important;
  position: static !important;

  box-sizing: border-box !important;

  width: 100% !important;
  height: 150px !important;
  min-height: 150px !important;
  max-height: 150px !important;

  margin: 0 !important;
  padding: 14px 15px !important;

  border: 1px solid rgba(114, 185, 162, 0.38) !important;
  border-radius: 2px !important;

  outline: none !important;
  box-shadow: none;

  background: #071712 !important;
  color: #f5fff9 !important;

  font-family: Arial, Helvetica, sans-serif !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 1.5 !important;
  letter-spacing: normal !important;

  text-align: left !important;
  text-indent: 0 !important;

  resize: none !important;
  overflow-y: auto !important;

  transform: none !important;
  transition: border-color 0.2s ease;
}


/* TEXTAREA FOCUS */

.message-group textarea:focus {
  border-color: #00d6a0 !important;
  outline: none !important;
  box-shadow: 0 0 0 1px rgba(0, 214, 160, 0.12) !important;
}


/* TEXTAREA PLACEHOLDER */

.message-group textarea::placeholder {
  color: #78968a !important;
  opacity: 0.8 !important;
  font-size: 13px;
}


/* =================================
   SEND BUTTON
================================= */

.send-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;

  align-self: flex-start;

  min-height: 49px;
  padding: 0 22px;

  border: none;
  border-radius: 0;

  background: #087f5b;
  color: #f5fff9;

  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.02em;

  cursor: pointer;
  transition: background 0.2s ease;
}

.send-button:hover {
  background: #0a966b;
}

.send-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-button span {
  font-size: 19px;
}


/* =================================
   SUCCESS MESSAGE
================================= */

.success-message {
  display: flex;
  align-items: flex-start;
  gap: 8px;

  margin: 0;

  color: #34e6b5;
  font-size: 0.8rem;
  line-height: 1.6;
}


/* =================================
   STUDIO DETAILS
================================= */

.details-column {
  min-width: 0;
  padding-top: 20px;
}

.details-card {
  padding: 31px 29px 0;
  background: #0d211b;
}

.details-card .eyebrow {
  margin-bottom: 12px;
}

.details-card h3 {
  margin: 0;

  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.85rem;
  font-weight: 400;
  line-height: 1.2;
}

.details-intro {
  margin: 11px 0 26px;

  color: #a4b9b0;
  font-size: 0.8rem;
  line-height: 1.7;
}


/* =================================
   DETAIL ITEMS
================================= */

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;

  padding: 19px 0;

  border-top: 1px solid rgba(52, 230, 181, 0.16);
}

.detail-icon {
  display: grid;

  width: 38px;
  height: 38px;
  flex: 0 0 38px;

  place-items: center;

  border: 1px solid #087f5b;
  border-radius: 50%;

  color: #72b9a2;
}

.detail-copy {
  min-width: 0;
}

.detail-item h4 {
  margin: 1px 0 6px;

  color: #f5fff9;
  font-size: 0.78rem;
  font-weight: 700;
}

.detail-item a,
.detail-item p {
  display: block;

  margin: 0 0 4px;

  color: #a4b9b0;
  font-size: 0.76rem;
  line-height: 1.65;

  overflow-wrap: anywhere;
  text-decoration: none;
}

.detail-item a:hover {
  color: #34e6b5;
  text-decoration: underline;
}


/* =================================
   STUDIO HOURS
================================= */

.studio-hours {
  display: flex;
  align-items: center;
  gap: 9px;

  margin: 3px -29px 0;
  padding: 16px 29px;

  background: #102a22;
  color: #72b9a2;

  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.studio-hours .pulse-dot {
  width: 6px;
  height: 6px;
  flex-basis: 6px;
}

.hours-time {
  margin-left: auto;

  color: #8eaaa0;
  font-size: 0.55rem;
  white-space: nowrap;
}


/* =================================
   SOCIAL LINKS
================================= */

.social-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  padding: 22px 4px;
}

.social-card > span {
  color: #72b9a2;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.13em;
}

.social-links {
  display: flex;
  gap: 8px;
}

.social-links a {
  display: grid;

  width: 34px;
  height: 34px;

  place-items: center;

  border: 1px solid #087f5b;
  border-radius: 50%;

  color: #34e6b5;
  text-decoration: none;

  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.social-links a:hover {
  background: #087f5b;
  color: #f5fff9;
}


/* =================================
   TABLET
================================= */

@media (max-width: 900px) {
  .contact-content {
    grid-template-columns:
      minmax(0, 1fr)
      minmax(270px, 0.8fr);

    gap: 32px;
  }

  .details-card {
    padding-right: 22px;
    padding-left: 22px;
  }

  .studio-hours {
    margin-right: -22px;
    margin-left: -22px;

    padding-right: 22px;
    padding-left: 22px;
  }
}


/* =================================
   MOBILE
================================= */

@media (max-width: 760px) {
  .contact-hero {
    min-height: 290px;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: 38px;

    padding: 55px 0 70px;
  }

  .details-column {
    padding-top: 0;
  }
}


/* =================================
   SMALL MOBILE
================================= */

@media (max-width: 520px) {
  .contact-hero-content,
  .contact-content {
    width: 88%;
  }

  .contact-hero h1 {
    font-size: 3rem;
  }

  .field-row {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .contact-form {
    gap: 18px;
  }

  .details-card {
    padding-right: 20px;
    padding-left: 20px;
  }

  .studio-hours {
    flex-wrap: wrap;

    margin-right: -20px;
    margin-left: -20px;

    padding-right: 20px;
    padding-left: 20px;

    font-size: 0.52rem;
  }

  .hours-time {
    font-size: 0.5rem;
  }
}

</style>