
<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted } from "vue";

useHead({
  title: "Mind Cast — Thoughtful conversations for curious minds",
  meta: [
    {
      name: "description",
      content:
        "Mind Cast is a little corner of the world for open minds, honest stories, and thoughtful conversations.",
    },
  ],
});

let revealObserver: IntersectionObserver | null = null;

function setupRevealAnimations() {
  const revealTargets = Array.from(
    document.querySelectorAll(
      "section, article, header, footer, .page-shell, .profile-row, .episode-card, .feature-card, .story-card, .contact-card"
    )
  ).filter((element) => {
    const node = element as HTMLElement;

    return (
      !node.classList.contains("reveal-item") &&
      !node.closest("[data-no-reveal]")
    );
  });

  revealTargets.forEach((element, index) => {
    const node = element as HTMLElement;

    node.classList.add("reveal-item");
    node.style.transitionDelay = `${Math.min(index * 80, 360)}ms`;
  });

  if (revealObserver) {
    revealObserver.disconnect();
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver?.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  document.querySelectorAll(".reveal-item").forEach((element) => {
    revealObserver?.observe(element);
  });
}

onMounted(() => {
  nextTick(() => {
    setupRevealAnimations();
  });

  window.addEventListener("load", setupRevealAnimations);
  window.addEventListener("resize", setupRevealAnimations);
});

onBeforeUnmount(() => {
  if (revealObserver) {
    revealObserver.disconnect();
  }

  window.removeEventListener("load", setupRevealAnimations);
  window.removeEventListener("resize", setupRevealAnimations);
});
</script>

<style>
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: #061310;
  color: #f5fff9;
  font-family: Arial, Helvetica, sans-serif;
}

:root {
  --soft-glow: rgba(52, 230, 181, 0.2);
}

@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(32px) scale(0.98);
    filter: blur(6px);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

.reveal-item {
  opacity: 0;
  transform: translateY(32px) scale(0.98);
  filter: blur(6px);
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.5s ease;
  will-change: opacity, transform, filter;
}

.reveal-item.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.page-main {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
}

::selection {
  background: #087f5b;
  color: #f5fff9;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .reveal-item {
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
  }
}
</style>
