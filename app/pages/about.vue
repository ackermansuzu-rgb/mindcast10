<template>
  <section class="podcast-page">
    <div class="page-shell">
      <header class="page-heading">
        <div>
          <p class="eyebrow">MIND CAST <span>/</span> THE EPISODE ROOM</p>
          <h1>Ideas worth <em>sharing.</em></h1>
          <p class="page-intro">
            Thoughtful conversations for curious minds. Pick an episode, join
            the conversation, and make room for a new point of view.
          </p>
        </div>
        <v-btn
          class="manage-links"
          color="primary"
          prepend-icon="mdi-link-variant"
          variant="tonal"
          @click="openLinkEditor"
        >
          Add video links
        </v-btn>
      </header>

      <main>
        <section
          :id="`episode-${activeEpisode.id}`"
          class="featured-episode"
          aria-label="Featured episode"
        >
          <div class="episode-copy">
            <v-chip class="new-episode" color="primary" size="small" variant="tonal">
              <v-icon start size="16">mdi-microphone</v-icon>
              EPISODE {{ formatEpisodeNumber(activeEpisode.id) }}
            </v-chip>
            <h2>{{ activeEpisode.title }}</h2>
            <p class="episode-summary">{{ activeEpisode.summary }}</p>
            <div class="episode-meta">
              <span>
                <v-icon size="17">mdi-play-circle-outline</v-icon>
                Mind Cast Studio
              </span>
              <span>
                <v-icon size="17">mdi-playlist-play</v-icon>
                {{ activeEpisode.id }} of {{ episodes.length }}
              </span>
            </div>
          </div>

          <div class="episode-player-column">
            <div class="video-frame">
              <iframe
                v-if="activeEmbedUrl"
                :src="activeEmbedUrl"
                :title="activeEpisode.title"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                referrerpolicy="strict-origin-when-cross-origin"
              ></iframe>
              <div v-else-if="activeEpisodePoster" class="video-preview">
                <img :src="activeEpisodePoster" :alt="`${activeEpisode.title} preview image`" />
                <div class="preview-overlay">
                  <v-icon size="34">mdi-play-circle</v-icon>
                  <span>Preview episode</span>
                </div>
              </div>
              <div v-else class="empty-player">
                <span class="player-icon"><v-icon size="30">mdi-play</v-icon></span>
                <strong>Add this episode's video</strong>
                <span>Paste a YouTube link using “Add video links”.</span>
              </div>
            </div>

            <div class="episode-actions">
              <v-btn
                :aria-pressed="activeEpisode.liked"
                :color="activeEpisode.liked ? 'primary' : undefined"
                :prepend-icon="activeEpisode.liked ? 'mdi-heart' : 'mdi-heart-outline'"
                rounded="pill"
                variant="tonal"
                @click="toggleLike"
              >
                {{ formatCount(activeEpisode.likes) }}
              </v-btn>
              <v-btn
                :aria-expanded="showComments"
                prepend-icon="mdi-comment-outline"
                rounded="pill"
                variant="tonal"
                @click="showComments = !showComments"
              >
                {{ activeEpisode.comments.length }} comments
              </v-btn>
              <v-btn
                :aria-pressed="activeEpisode.saved"
                :icon="activeEpisode.saved ? 'mdi-bookmark' : 'mdi-bookmark-outline'"
                :aria-label="activeEpisode.saved ? 'Remove bookmark' : 'Save episode'"
                rounded="circle"
                variant="text"
                @click="toggleSave"
              />
            </div>

            <section v-if="showComments" class="comments-panel" aria-label="Episode comments">
              <h3>Join the conversation</h3>
              <form class="comment-form" @submit.prevent="addComment">
                <v-text-field
                  v-model="commentDraft"
                  aria-label="Write a comment"
                  class="comment-input"
                  hide-details
                  maxlength="300"
                  placeholder="Share a thoughtful comment..."
                  variant="outlined"
                />
                <v-btn
                  aria-label="Post comment"
                  color="primary"
                  icon="mdi-send"
                  type="submit"
                  variant="flat"
                />
              </form>
              <p v-if="!activeEpisode.comments.length" class="empty-comments">
                No comments yet. Start the conversation.
              </p>
              <ul v-else class="comment-list">
                <li v-for="(comment, index) in activeEpisode.comments" :key="index">
                  <v-icon color="primary" size="18">mdi-account-circle-outline</v-icon>
                  <span>{{ comment }}</span>
                </li>
              </ul>
            </section>
          </div>
        </section>

        <section class="episode-library" aria-labelledby="episodes-title">
          <div class="library-heading">
            <div>
              <p class="eyebrow">FIND YOUR NEXT LISTEN</p>
              <h2 id="episodes-title">More episodes</h2>
            </div>
            <span class="episode-total">{{ episodes.length }} CONVERSATIONS</span>
          </div>
          <div class="episode-grid">
            <button
              v-for="episode in episodes"
              :key="episode.id"
              class="episode-card"
              :class="{ 'episode-card--active': activeEpisodeId === episode.id }"
              type="button"
              :aria-current="activeEpisodeId === episode.id ? 'true' : undefined"
              @click="selectEpisode(episode.id)"
            >
              <span class="episode-art">
                <img
                  v-if="getYouTubeThumbnail(episode.url)"
                  :src="getYouTubeThumbnail(episode.url) ?? undefined"
                  alt=""
                  loading="lazy"
                />
                <v-icon v-else size="27">mdi-waveform</v-icon>
                <span class="art-number">{{ formatEpisodeNumber(episode.id) }}</span>
                <span class="play-indicator"><v-icon size="17">mdi-play</v-icon></span>
              </span>
              <span class="episode-card-copy">
                <strong>{{ episode.title }}</strong>
                <span>{{ episode.url ? "VIDEO READY" : "ADD VIDEO LINK" }}</span>
              </span>
            </button>
          </div>
        </section>

        <p v-if="storageMessage" class="storage-message" role="status">
          <v-icon size="17">mdi-information-outline</v-icon>{{ storageMessage }}
        </p>
      </main>
    </div>

    <v-dialog v-model="linkDialog" max-width="720">
      <v-card class="link-dialog" rounded="xl">
        <v-card-title class="dialog-title">
          <div>
            <span class="eyebrow">YOUR EPISODE LIBRARY</span>
            <h2>Add your video links</h2>
          </div>
          <v-btn
            aria-label="Close video link editor"
            icon="mdi-close"
            variant="text"
            @click="linkDialog = false"
          />
        </v-card-title>
        <v-card-text>
          <p class="dialog-intro">
            Paste a YouTube video link into each episode. Your links are saved
            in this browser and can be changed anytime.
          </p>
          <div class="link-fields">
            <v-text-field
              v-for="(episode, index) in episodes"
              :key="episode.id"
              v-model="draftUrls[index]"
              :label="getEpisodeLabel(episode)"
              placeholder="https://www.youtube.com/watch?v=..."
              prepend-inner-icon="mdi-youtube"
              variant="outlined"
              density="comfortable"
              hide-details
            />
          </div>
          <p v-if="linkError" class="link-error" role="alert">
            {{ linkError }}
          </p>
        </v-card-text>
        <v-card-actions class="dialog-actions">
          <v-btn variant="text" @click="linkDialog = false">Cancel</v-btn>
          <v-btn color="primary" prepend-icon="mdi-content-save" variant="flat" @click="saveVideoLinks">
            Save links
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

interface Episode {
  id: number;
  title: string;
  summary: string;
  url: string;
  liked: boolean;
  likes: number;
  saved: boolean;
  comments: string[];
}

interface SavedEpisodes {
  urls: string[];
  liked: boolean[];
  likes: number[];
  saved: boolean[];
  comments: string[][];
}

// Change the version number (v4 -> v5, etc.) whenever you edit the default
// video links below, so old saved data in the browser does not override them.
const storageKey = "mind-cast-episodes-v4";

const episodes = ref<Episode[]>([
  {
    id: 1,
    title: "The Power of Small Habits",
    summary:
      "Discover how small, consistent habits can create a big impact. We talk mindset, productivity, and simple steps toward a better version of yourself.",
    url: "https://www.youtube.com/watch?v=AdKUJxjn-R8",
    liked: false,
    likes: 1200,
    saved: false,
    comments: [],
  },
  {
    id: 2,
    title: "Finding Your Point of View",
    summary:
      "A thoughtful conversation about making space for fresh ideas, meaningful stories, and the perspectives that bring us closer.",
    url: "https://www.youtube.com/watch?v=ufQEqi4LUZ4",
    liked: false,
    likes: 856,
    saved: false,
    comments: [],
  },
  {
    id: 3,
    title: "Building a Positive Mindset",
    summary:
      "Small ways to meet everyday challenges with a little more curiosity and care.",
    url: "https://www.youtube.com/watch?v=h49_KhclgCs",
    liked: false,
    likes: 214,
    saved: false,
    comments: [],
  },
  {
    id: 4,
    title: "How to Stay Productive",
    summary:
      "Ideas for finding focus and doing meaningful work without losing your balance.",
    url: "https://www.youtube.com/watch?v=hSGt_rhu49U",
    liked: false,
    likes: 98,
    saved: false,
    comments: [],
  },
  {
    id: 5,
    title: "Overcoming Life's Challenges",
    summary:
      "Honest stories about resilience, change, and taking the next small step.",
    url: "https://www.youtube.com/watch?v=pg9FYEYQNW4",
    liked: false,
    likes: 45,
    saved: false,
    comments: [],
  },
  {
    id: 6,
    title: "Finding Balance in a Busy World",
    summary: "A gentle reminder to make room for what matters most.",
    url: "https://www.youtube.com/watch?v=XhEMI8CLz4s",
    liked: false,
    likes: 100,
    saved: false,
    comments: [],
  },
  {
    id: 7,
    title: "The Quiet Power of Listening",
    summary: "What changes when we give each other our full attention?",
    url: "https://www.youtube.com/watch?v=saXfavo1OQo",
    liked: false,
    likes: 602,
    saved: false,
    comments: [],
  },
  {
    id: 8,
    title: "Small Moments, Big Meaning",
    summary: "Noticing the everyday moments that make a life feel full.",
    url: "https://www.youtube.com/watch?v=ojlwfaIYNsc",
    liked: false,
    likes: 920,
    saved: false,
    comments: [],
  },
  {
    id: 9,
    title: "A Question Worth Sitting With",
    summary: "An open-ended conversation about the questions that stay with us.",
    url: "https://www.youtube.com/watch?v=mBOQUwFkibg",
    liked: false,
    likes: 720,
    saved: false,
    comments: [],
  },
  {
    id: 10,
    title: "The Best Stories Start with Hello",
    summary: "How a simple introduction can open the door to a great story.",
    url: "https://www.youtube.com/watch?v=joNAzJLBO1A",
    liked: false,
    likes: 20,
    saved: false,
    comments: [],
  },
]);

const activeEpisodeId = ref(1);
const activeEpisode = computed(
  () => episodes.value.find((e) => e.id === activeEpisodeId.value) ?? episodes.value[0]!,
);
const activeEmbedUrl = computed(() => getYouTubeEmbedUrl(activeEpisode.value.url));
const activeEpisodePoster = computed(() => getYouTubeThumbnail(activeEpisode.value.url));

const showComments = ref(false);
const commentDraft = ref("");
const linkDialog = ref(false);
const draftUrls = ref<string[]>([]);
const linkError = ref("");
const storageMessage = ref("");

function formatEpisodeNumber(id: number): string {
  return String(id).padStart(2, "0");
}

function getEpisodeLabel(episode: Episode): string {
  return `Episode ${formatEpisodeNumber(episode.id)} - ${episode.title}`;
}

function getYouTubeId(value: string): string | null {
  if (!value || !value.trim()) return null;
  try {
    const url = new URL(value.trim());
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    let id: string | null = null;

    if (host === "youtu.be") {
      id = url.pathname.split("/").filter(Boolean)[0] ?? null;
    } else if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtube-nocookie.com"
    ) {
      id =
        url.searchParams.get("v") ??
        url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1] ??
        null;
    }

    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

function getYouTubeEmbedUrl(value: string): string | null {
  const id = getYouTubeId(value);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}

function getYouTubeThumbnail(value: string): string | null {
  const id = getYouTubeId(value);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

function formatCount(count: number): string {
  return new Intl.NumberFormat("en", {
    notation: count >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(count);
}

function selectEpisode(id: number) {
  activeEpisodeId.value = id;
  showComments.value = false;
  commentDraft.value = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleLike() {
  const episode = activeEpisode.value;
  episode.liked = !episode.liked;
  episode.likes += episode.liked ? 1 : -1;
  persistEpisodes();
}

function toggleSave() {
  activeEpisode.value.saved = !activeEpisode.value.saved;
  persistEpisodes();
}

function addComment() {
  const comment = commentDraft.value.trim();
  if (!comment) return;
  activeEpisode.value.comments.push(comment);
  commentDraft.value = "";
  persistEpisodes();
}

function openLinkEditor() {
  draftUrls.value = episodes.value.map((episode) => episode.url);
  linkError.value = "";
  linkDialog.value = true;
}

function saveVideoLinks() {
  const invalidIndex = draftUrls.value.findIndex(
    (url) => url && url.trim() && !getYouTubeId(url),
  );
  if (invalidIndex !== -1) {
    linkError.value = `Episode ${invalidIndex + 1} needs a valid YouTube video link.`;
    return;
  }
  episodes.value.forEach((episode, index) => {
    episode.url = draftUrls.value[index]?.trim() ?? "";
  });
  persistEpisodes();
  linkDialog.value = false;
}

function isSavedEpisodes(value: unknown): value is SavedEpisodes {
  if (typeof value !== "object" || value === null) return false;
  const saved = value as Partial<SavedEpisodes>;
  return (
    Array.isArray(saved.urls) &&
    Array.isArray(saved.liked) &&
    Array.isArray(saved.likes) &&
    Array.isArray(saved.saved) &&
    Array.isArray(saved.comments)
  );
}

function persistEpisodes() {
  try {
    const data: SavedEpisodes = {
      urls: episodes.value.map((episode) => episode.url),
      liked: episodes.value.map((episode) => episode.liked),
      likes: episodes.value.map((episode) => episode.likes),
      saved: episodes.value.map((episode) => episode.saved),
      comments: episodes.value.map((episode) => episode.comments),
    };
    localStorage.setItem(storageKey, JSON.stringify(data));
    storageMessage.value = "";
  } catch {
    storageMessage.value =
      "Changes could not be saved in this browser. They will be lost when you leave this page.";
  }
}

onMounted(() => {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return;
    const parsed: unknown = JSON.parse(raw);
    if (!isSavedEpisodes(parsed)) {
      throw new Error("Saved episode data has an invalid format.");
    }
    episodes.value.forEach((episode, index) => {
      const url = parsed.urls[index];
      const liked = parsed.liked[index];
      const likes = parsed.likes[index];
      const saved = parsed.saved[index];
      const comments = parsed.comments[index];

      // Only use a saved link if it is a real YouTube link, so the
      // default links in the code are never wiped out by blank saved values.
      if (typeof url === "string" && url && getYouTubeId(url)) {
        episode.url = url;
      }
      if (typeof liked === "boolean") episode.liked = liked;
      if (typeof likes === "number" && Number.isFinite(likes) && likes >= 0) {
        episode.likes = likes;
      }
      if (typeof saved === "boolean") episode.saved = saved;
      if (
        Array.isArray(comments) &&
        comments.every((comment) => typeof comment === "string")
      ) {
        episode.comments = comments;
      }
    });
  } catch {
    storageMessage.value =
      "Saved episode data could not be loaded. You can still add links and interact with episodes.";
  }
});
</script>

<style scoped src="../assets/css/about.css"></style>