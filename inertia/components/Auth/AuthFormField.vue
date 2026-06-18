<script setup lang="ts">
  defineProps<{
    label: string
    name: string
    type?: string
    placeholder?: string
    autocomplete?: string
    error?: string
  }>()
</script>

<template>
  <div class="auth-field">
    <label :for="name" class="auth-field-label">{{ label }}</label>
    <div class="auth-field-wrap" :class="{ 'auth-field-wrap--error': error }">
      <input
        :type="type ?? 'text'"
        :name="name"
        :id="name"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :data-invalid="error ? 'true' : undefined"
        class="auth-field-input"
      />
    </div>
    <p v-if="error" class="auth-field-error">{{ error }}</p>
  </div>
</template>

<style scoped>
.auth-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.auth-field-label {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--yellow);
}

.auth-field-wrap {
  background: rgba(20, 42, 82, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 13px 16px;
  transition: border-color 0.2s;
}

.auth-field-wrap:focus-within {
  border-color: rgba(252, 229, 0, 0.45);
}

.auth-field-wrap--error {
  border-color: rgba(248, 113, 113, 0.5);
}

.auth-field-input {
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 0.94rem;
  font-family: var(--font);
}

.auth-field-input::placeholder {
  color: #ffffff;
}

.auth-field-error {
  font-size: 0.75rem;
  color: #fca5a5;
  font-weight: 500;
}
</style>
