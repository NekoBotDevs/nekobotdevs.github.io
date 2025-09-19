<template>
  <div class="VPHome">
    <div class="container">
      <div class="hero">
        <h1 class="name">
          <span class="clip">{{ hero.name }}</span>
        </h1>
        <p class="text">{{ hero.text }}</p>
        <p class="tagline">{{ hero.tagline }}</p>
        <div class="actions">
          <a
            v-for="action in hero.actions"
            :key="action.text"
            :href="action.link"
            :class="['action', action.theme]"
          >
            {{ action.text }}
          </a>
        </div>
      </div>
      
      <div class="features">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="feature"
        >
          <div class="icon">
            {{ feature.icon }}
          </div>
          <h3 class="title">{{ feature.title }}</h3>
          <p class="details">{{ feature.details }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const hero = computed(() => frontmatter.value.hero || {})
const features = computed(() => frontmatter.value.features || [])
</script>

<style scoped>
.VPHome {
  padding: 2rem 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
}

.name {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  background: linear-gradient(120deg, var(--vp-c-brand-1) 30%, var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem 0;
}

.tagline {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  margin: 0 0 2rem 0;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.action.brand {
  background: var(--vp-c-brand-1);
  color: white;
}

.action.brand:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
}

.action.alt {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.action.alt:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.feature {
  text-align: center;
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
}

.feature:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px var(--vp-c-brand-soft);
  transform: translateY(-2px);
}

.icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 1rem 0;
}

.details {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .name {
    font-size: 2.5rem;
  }
  
  .text {
    font-size: 1.25rem;
  }
  
  .tagline {
    font-size: 1rem;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .action {
    width: 200px;
  }
  
  .features {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature {
    padding: 1.5rem;
  }
}
</style>

