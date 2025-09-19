<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1>404</h1>
      <p>页面未找到</p>
      <p class="description">
        抱歉，您访问的页面不存在。
      </p>
      <div class="actions">
        <a href="/" class="action-button">
          返回首页
        </a>
        <a href="/zh/guide/" class="action-button secondary">
          查看文档
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'

const { localeIndex } = useData()
</script>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
}

.not-found-content {
  max-width: 500px;
}

.not-found h1 {
  font-size: 4rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 0 0 1rem 0;
}

.not-found p {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  margin: 0 0 0.5rem 0;
}

.description {
  font-size: 1rem;
  color: var(--vp-c-text-3);
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand-1);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.action-button:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-1px);
}

.action-button.secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.action-button.secondary:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

@media (max-width: 768px) {
  .not-found h1 {
    font-size: 3rem;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .action-button {
    width: 200px;
  }
}
</style>

