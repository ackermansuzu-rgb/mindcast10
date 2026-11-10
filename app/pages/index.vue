<template>
  <section class="hero">
    <div class="hero-content">
      <p class="eyebrow"><span></span> WEB DEVELOPEMENT</p>
      <h1>Make room<br />for a <em>New</em> Point<br />of View.</h1>
      <p class="hero-copy">
        Thoughtful conversations on creativity, culture, and the little things
        that make us human.
      </p>
      <div class="hero-actions">
        <v-btn class="listen-button" to="/about" rounded="pill" size="large">
          <v-icon start>mdi-play</v-icon> Explore episodes
        </v-btn>
        <span class="listen-note"><v-icon size="18">mdi-headphones</v-icon> A little perspective, every
          week.</span>
      </div>
      <div class="hero-stats">
        <div>
          <strong>120<span>+</span></strong><small>Conversations</small>
        </div>
        <div>
          <strong>67<span>k</span></strong><small>Listeners &amp; counting</small>
        </div>
        <div>
          <strong>4.999<span>/5</span></strong><small>Listener rating</small>
        </div>
      </div>
    </div>
    <div class="hero-art">
      <img class="hero-image" src="/images/hero-mic.png" alt="Studio microphone ready for a conversation" />
      <div class="image-label">
        <span class="pulse-dot"></span> ON AIR <span>·</span> EPISODE 10
      </div>
      <div class="hero-caption">
        <span>THE ART
          OF</span><strong>LISTENING</strong>
      </div>
      <div class="round-stamp">
        <span>GOOD STORIES<br />OPEN
          MINDS</span><v-icon>mdi-waveform</v-icon>
      </div>
    </div>
    <div class="hero-bottom-note">
      <span>01</span> / 02
      <div></div>
      SCROLL TO MEET THE TEAM
    </div>
  </section>
  <section id="profiles" class="profiles">
    <header class="profiles-heading">
      <p class="eyebrow"><span></span> THE PEOPLE BEHIND THE WORK</p>
      <h2>Meet the <em>team.</em></h2>
    </header>
    <div class="profile-list">
      <article v-for="(person, index) in profiles" :key="person.name" class="profile-row"
        :class="{ 'profile-row--reverse': index === 1 }">
        <button class="profile-photo" type="button" :aria-expanded="activeProfile === person.name"
          :aria-label="`Show ${person.name}'s portfolio description`" @click="toggleProfile(person.name)">
          <img :src="person.image" :alt="`${person.name} portrait`" />
        </button>
        <div class="profile-copy">
          <p class="profile-number">
            0{{ index + 1 }} <span>— SELECTED WORK</span>
          </p>
          <h3>{{ person.name }}</h3>
          <p class="profile-prompt">
            Portraits, ideas, and work from our team.
          </p>
          <p v-if="activeProfile === person.name" class="profile-description">
            Explore {{ person.name }}'s selected work and portfolio highlights.
          </p>
        </div>
      </article>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
const profiles = [
  { name: "Russell", image: "/images/russell.jpg" },
  { name: "Kristel", image: "/images/kristel.jpg" },
  { name: "Tommy", image: "/images/tommy.jpg" },];
const activeProfile = ref<string | null>(null);
function toggleProfile(name: string) {
  activeProfile.value = activeProfile.value === name ? null : name;
} 
</script>
<style scoped>
.hero {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 5%;
  align-items: center;
  min-height: calc(100vh - 82px);
  padding: 66px max(calc((100vw - 1200px) / 2), 7vw) 90px;
  overflow: hidden;
  background: #061310;
  color: #f5fff9;
}

.hero-content {
  position: relative;
  z-index: 1;
  padding-bottom: 20px;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 20px;
  color: #72b9a2;
  font-size: 0.69rem;
  font-weight: 700;
  letter-spacing: 0.17em;
}

.eyebrow span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #00d6a0;
}

h1 {
  margin: 0;
  color: #f5fff9;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(4rem, 6.7vw, 6.6rem);
  font-weight: 400;
  letter-spacing: -0.07em;
  line-height: 0.94;
}

h1 em {
  color: #34e6b5;
  font-weight: 400;
}

.hero-copy {
  max-width: 430px;
  margin: 28px 0;
  color: #a4b9b0;
  font-size: 1.03rem;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 19px;
}

.listen-button {
  min-height: 50px;
  padding-inline: 23px;
  background: #087f5b;
  color: #f5fff9;
  font-size: 0.83rem;
  font-weight: 600;
  letter-spacing: 0;
}

.listen-note {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #a4b9b0;
  font-size: 0.75rem;
}

.hero-stats {
  display: flex;
  gap: clamp(24px, 4vw, 52px);
  margin-top: 54px;
}

.hero-stats div {
  display: grid;
  gap: 5px;
}

.hero-stats strong {
  font-family: Georgia, serif;
  font-size: 1.65rem;
  font-weight: 400;
}

.hero-stats strong span {
  color: #34e6b5;
  font-size: 1rem;
}

.hero-stats small {
  color: #8eaaa0;
  font-size: 0.66rem;
}

.hero-art {
  position: relative;
  min-height: 460px;
  max-width: 500px;
  width: 100%;
  justify-self: end;
}

.hero-image {
  position: absolute;
  inset: 12px 25px 20px 20px;
  width: calc(100% - 45px);
  height: calc(100% - 32px);
  border-radius: 210px 210px 8px 8px;
  object-fit: cover;
  object-position: center 48%;
}

.image-label {
  position: absolute;
  top: 37px;
  left: 47px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 13px;
  border-radius: 3px;
  background: rgba(13, 33, 27, 0.94);
  color: #f5fff9;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.image-label span:not(.pulse-dot) {
  color: #72b9a2;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #00d6a0;
  box-shadow: 0 0 0 4px rgba(0, 214, 160, 0.16);
}

.hero-caption {
  position: absolute;
  bottom: 39px;
  left: 47px;
  display: grid;
  color: #f5fff9;
  text-shadow: 0 1px 14px rgba(0, 0, 0, 0.2);
}

.hero-caption span {
  font-size: 0.68rem;
  letter-spacing: 0.23em;
}

.hero-caption strong {
  font-family: Georgia, serif;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 0.08em;
}

.round-stamp {
  position: absolute;
  right: 0;
  bottom: 61px;
  display: flex;
  width: 116px;
  height: 116px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 50%;
  background: #087f5b;
  color: #f5fff9;
  text-align: center;
  transform: rotate(9deg);
}

.round-stamp span {
  font-size: 0.52rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  line-height: 1.55;
}

.round-stamp :deep(.v-icon) {
  font-size: 21px;
}

.profiles {
  padding: 85px max(calc((100vw - 1060px) / 2), 8vw) 100px;
  background: #061310;
  color: #f5fff9;
}

.profiles-heading {
  margin-bottom: 42px;
}

.profiles-heading .eyebrow {
  margin-bottom: 12px;
}

.profiles h2 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.6rem, 5vw, 4.2rem);
  font-weight: 400;
  letter-spacing: -0.05em;
}

.profiles h2 em {
  color: #34e6b5;
}

.profile-row {
  display: grid;
  grid-template-columns: 280px 1fr;
  align-items: center;
  gap: clamp(30px, 8vw, 110px);
  padding: 30px 0;
  border-top: 1px solid rgba(52, 230, 181, 0.16);
}

.profile-row--reverse {
  grid-template-columns: 1fr 280px;
}

.profile-row--reverse .profile-photo {
  grid-column: 2;
  grid-row: 1;
}

.profile-row--reverse .profile-copy {
  grid-column: 1;
  grid-row: 1;
}

.profile-photo {
  padding: 7px;
  border: 2px solid #087f5b;
  outline: 1px solid rgba(52, 230, 181, 0.2);
  outline-offset: 3px;
  background: #0d211b;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  transform: rotate(-2deg);
  transition: transform 180ms ease;
}

.profile-row--reverse .profile-photo {
  transform: rotate(2deg);
}

.profile-photo:hover,
.profile-photo:focus-visible,
.profile-photo[aria-expanded="true"] {
  transform: translateY(-4px) rotate(0);
}

.profile-photo:focus-visible {
  outline: 2px solid #34e6b5;
  outline-offset: 4px;
}

.profile-photo img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.profile-number {
  margin: 0 0 12px;
  color: #34e6b5;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.13em;
}

.profile-number span {
  color: #8eaaa0;
}

.profile-copy h3 {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.8rem, 3vw, 2.7rem);
  font-weight: 400;
}

.profile-prompt,
.profile-description {
  max-width: 430px;
  color: #a4b9b0;
  font-size: 0.92rem;
  line-height: 1.75;
}

.profile-prompt {
  margin: 12px 0 0;
}

.profile-description {
  margin: 8px 0 0;
}

.hero-bottom-note {
  position: absolute;
  bottom: 27px;
  left: max(calc((100vw - 1200px) / 2), 7vw);
  display: flex;
  align-items: center;
  gap: 11px;
  color: #8eaaa0;
  font-size: 0.57rem;
  letter-spacing: 0.13em;
}

.hero-bottom-note span {
  color: #f5fff9;
}

.hero-bottom-note div {
  width: 36px;
  height: 1px;
  margin-left: 8px;
  background: #087f5b;
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1.05fr 0.85fr;
    gap: 2%;
    padding-right: 6vw;
    padding-left: 6vw;
  }

  .hero-art {
    min-height: 400px;
  }

  .hero-stats {
    gap: 23px;
  }

  .hero-stats small {
    font-size: 0.6rem;
  }

  .hero-bottom-note {
    left: 6vw;
  }
}

@media (max-width: 650px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 26px;
    padding: 57px 7vw 70px;
  }

  h1 {
    font-size: clamp(4rem, 16vw, 5.7rem);
  }

  .hero-copy {
    margin-top: 21px;
    font-size: 0.94rem;
  }

  .hero-stats {
    gap: 0;
    justify-content: space-between;
    margin-top: 34px;
  }

  .hero-stats strong {
    font-size: 1.45rem;
  }

  .hero-stats small {
    max-width: 95px;
    font-size: 0.58rem;
  }

  .hero-art {
    width: min(100%, 430px);
    min-height: 360px;
    justify-self: center;
  }

  .hero-image {
    inset: 0 15px 7px;
    width: calc(100% - 30px);
    height: calc(100% - 7px);
    border-radius: 180px 180px 5px 5px;
  }

  .image-label {
    top: 23px;
    left: 28px;
  }

  .hero-caption {
    bottom: 25px;
    left: 31px;
  }

  .hero-caption strong {
    font-size: 1.6rem;
  }

  .round-stamp {
    right: 0;
    bottom: 32px;
    width: 94px;
    height: 94px;
  }

  .profiles {
    padding: 58px 7vw 70px;
  }

  .profiles-heading {
    margin-bottom: 24px;
  }

  .profile-row,
  .profile-row--reverse {
    grid-template-columns: minmax(140px, 42%) 1fr;
    gap: 20px;
    padding: 22px 0;
  }

  .profile-row--reverse .profile-photo {
    grid-column: 1;
  }

  .profile-row--reverse .profile-copy {
    grid-column: 2;
  }

  .profile-photo {
    padding: 5px;
  }

  .profile-prompt,
  .profile-description {
    font-size: 0.82rem;
  }

  .hero-bottom-note {
    bottom: 20px;
    left: 7vw;
  }
}
</style>
