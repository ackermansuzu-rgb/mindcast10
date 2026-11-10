AppFooter.vue
<template>
  <v-footer class="site-footer">
    <v-container class="footer-container">
      <div class="footer-main">
        <div class="footer-brand">
          <NuxtLink class="brand" to="/" aria-label="Mind Cast home">
            <span class="brand-mark"><v-icon>mdi-waveform</v-icon></span>
              <span class="brand-name">mind<span>cast</span><small>FINAL EXAMINATION IN WEB DEVELOPEMENT</small></span>
          </NuxtLink>
          <p>Thoughtful conversations for<br />a more curious kind of life.</p>
        </div>
        <div class="footer-nav">
          <span>EXPLORE</span>
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/about">About the show</NuxtLink>
          <NuxtLink to="/contact">Contact</NuxtLink>
        </div>
        <div class="footer-social">
          <span>FOLLOW THE CONVERSATION</span>
          <div>
            <a href="https://www.instagram.com/" aria-label="Mind Cast on Instagram" target="_blank"
              rel="noopener noreferrer"><v-icon>mdi-instagram</v-icon></a>
            <a href="https://www.youtube.com/" aria-label="Mind Cast on YouTube" target="_blank"
              rel="noopener noreferrer"><v-icon>mdi-youtube</v-icon></a>
            <a href="https://www.spotify.com/" aria-label="Mind Cast on Spotify" target="_blank"
              rel="noopener noreferrer"><v-icon>mdi-spotify</v-icon></a>
          </div>
          <a class="footer-email" href="mailto:WebDevelopment@mindcast.fm">WebDevelopment@mindcast.fm</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© {{ currentYear }} Mind Cast Studio. All rights reserved.</span>
        <span>MADE FOR THE MOMENTS THAT MATTER <v-icon size="14">mdi-heart</v-icon></span>
      </div>
    </v-container>
  </v-footer>
</template>
<script setup lang="ts">
const currentYear = new Date().getFullYear(); </script>
<style scoped>
.site-footer {
  display: block;
  padding: 0;
  background: #0d211b;
  color: #f5fff9;
}

.footer-container {
  max-width: 1150px;
  padding: 55px 24px 20px;
}

.footer-main {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr 1fr;
  gap: 48px;
  padding-bottom: 43px;
}

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

.brand-name>span {
  margin-left: 3px;
  color: #34e6b5;
}

.brand-name small {
  margin-top: 5px;
  color: #a4b9b0;
  font-family: Arial, sans-serif;
  font-size: 0.43rem;
  font-weight: 700;
  letter-spacing: 0.13em;
}

.footer-brand p {
  margin: 18px 0 0;
  color: #c1cbd0;
  font-family: Georgia, serif;
  font-size: 1.02rem;
  line-height: 1.6;
}

.footer-nav,
.footer-social {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.footer-nav>span,
.footer-social>span {
  margin-bottom: 3px;
  color: #34e6b5;
  font-size: 0.57rem;
  font-weight: 700;
  letter-spacing: 0.15em;
}

.footer-nav a,
.footer-email {
  color: #d0e2da;
  font-size: 0.75rem;
  text-decoration: none;
}

.footer-nav a:hover,
.footer-email:hover {
  color: #34e6b5;
}

.footer-social>div {
  display: flex;
  gap: 9px;
}

.footer-social>div a {
  display: grid;
  width: 35px;
  height: 35px;
  place-items: center;
  border: 1px solid rgba(52, 230, 181, 0.4);
  border-radius: 50%;
  color: #f5fff9;
  text-decoration: none;
}

.footer-social>div a:hover {
  background: #087f5b;
  color: #f5fff9;
}

.footer-email {
  margin-top: 1px;
  color: #a4b9b0;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 17px 0 4px;
  border-top: 1px solid rgba(52, 230, 181, 0.18);
  color: #8eaaa0;
  font-size: 0.58rem;
  letter-spacing: 0.04em;
}

.footer-bottom span:last-child {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #34e6b5;
  font-size: 0.52rem;
  letter-spacing: 0.12em;
}

.footer-bottom :deep(.v-icon) {
  color: #00d6a0;
}

@media (max-width: 650px) {
  .footer-container {
    padding: 42px 23px 18px;
  }

  .footer-main {
    grid-template-columns: 1fr 1fr;
    gap: 36px 20px;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }

  .footer-bottom {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
