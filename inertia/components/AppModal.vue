<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Icon from '~/components/Icon.vue'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl'
type ActionTone = 'primary' | 'danger' | 'ghost'
type CloseSource = 'overlay' | 'esc' | 'action' | 'close'

type ModalProps = {
  modelValue: boolean
  title?: string
  description?: string
  size?: ModalSize
  confirmLabel?: string
  cancelLabel?: string
  confirmTone?: ActionTone
  showCancel?: boolean
  showConfirm?: boolean
  showFooter?: boolean
  showClose?: boolean
  closeOnOverlay?: boolean
  closeOnEsc?: boolean
  closeOnConfirm?: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  size: 'md',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  confirmTone: 'primary',
  showCancel: true,
  showConfirm: true,
  showFooter: true,
  showClose: true,
  closeOnOverlay: true,
  closeOnEsc: true,
  closeOnConfirm: true,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'confirm'): void
  (event: 'cancel'): void
  (event: 'close', source: CloseSource): void
}>()

const dialogRef = ref<HTMLDivElement | null>(null)
const lastActiveElement = ref<HTMLElement | null>(null)
const previousBodyOverflow = ref<string | null>(null)

const uid = `modal-${Math.random().toString(36).slice(2, 10)}`
const titleId = `${uid}-title`
const descriptionId = `${uid}-description`

const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

const overlayClasses = 'absolute inset-0 bg-[#06070b]/85 backdrop-blur-md'
const panelClasses =
  'relative max-h-[calc(100vh-2rem)] overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d14] shadow-[0_24px_80px_rgba(0,0,0,0.55)]'

const textToneClasses = computed(() => 'text-slate-900')
const darkTextToneClasses = computed(() => 'text-white')

const headerClasses = 'flex items-start justify-between gap-4 border-b border-white/10 p-5 md:p-6'

const titleClasses = 'text-xl font-medium tracking-tight text-white md:text-2xl'

const descriptionClasses = 'mt-2 max-w-2xl text-sm leading-6 text-gray-400'

const footerClasses =
  'flex flex-wrap items-center justify-end gap-3 border-t border-white/10 bg-black/10 p-5 md:p-6'

const closeButtonClasses =
  'flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/[0.08] hover:text-white'

const cancelButtonClasses =
  'inline-flex min-h-[42px] cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-5 text-sm text-white transition-colors hover:bg-white/[0.07]'

const confirmClasses = computed(() => {
  const base =
    'inline-flex min-h-[42px] cursor-pointer items-center justify-center rounded-xl px-5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60'

  if (props.confirmTone === 'danger') {
    return `${base} border border-rose-400/20 bg-rose-500/90 text-white hover:bg-rose-500`
  }

  if (props.confirmTone === 'ghost') {
    return `${base} border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.07]`
  }

  return `${base} border border-blue-500 bg-blue-500 text-white hover:bg-blue-600`
})

const close = (source: CloseSource) => {
  if (!props.modelValue) return
  emit('update:modelValue', false)
  emit('close', source)
}

const onConfirm = () => {
  emit('confirm')
  if (props.closeOnConfirm) {
    close('action')
  }
}

const onCancel = () => {
  emit('cancel')
  close('action')
}

const onOverlayClick = () => {
  if (!props.closeOnOverlay) return
  close('overlay')
}

const onKeydown = (event: KeyboardEvent) => {
  if (!props.modelValue || !props.closeOnEsc) return
  if (event.key !== 'Escape') return
  event.preventDefault()
  close('esc')
}

watch(
  () => props.modelValue,
  async (open) => {
    if (open) {
      lastActiveElement.value =
        document.activeElement instanceof HTMLElement ? document.activeElement : null

      if (previousBodyOverflow.value === null) {
        previousBodyOverflow.value = document.body.style.overflow
      }

      document.body.style.overflow = 'hidden'
      await nextTick()
      dialogRef.value?.focus()
      return
    }

    if (previousBodyOverflow.value !== null) {
      document.body.style.overflow = previousBodyOverflow.value
      previousBodyOverflow.value = null
    }

    lastActiveElement.value?.focus()
  }
)

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  if (previousBodyOverflow.value !== null) {
    document.body.style.overflow = previousBodyOverflow.value
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[70] flex items-center justify-center p-4"
        :class="{ 'app-modal-dark': true }"
      >
        <div :class="overlayClasses" role="presentation" @click.self="onOverlayClick"></div>

        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-4 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-4 scale-95"
        >
          <div
            v-if="isOpen"
            ref="dialogRef"
            class="relative max-h-[calc(100vh-2rem)] w-full outline-none"
            :class="sizeClasses[props.size]"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="props.title ? titleId : undefined"
            :aria-describedby="props.description ? descriptionId : undefined"
            tabindex="-1"
          >
            <div :class="panelClasses">
              <div
                class="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_45%)]"
              ></div>

              <div class="relative flex max-h-[calc(100vh-2rem)] flex-col">
                <slot name="header">
                  <div :class="headerClasses">
                    <div class="min-w-0">
                      <h2 v-if="props.title" :id="titleId" :class="[titleClasses, textToneClasses]">
                        {{ props.title }}
                      </h2>
                      <p
                        v-if="props.description"
                        :id="descriptionId"
                        :class="[descriptionClasses, textToneClasses]"
                      >
                        {{ props.description }}
                      </p>
                    </div>
                    <button
                      v-if="props.showClose"
                      type="button"
                      :class="closeButtonClasses"
                      aria-label="Close"
                      @click="close('close')"
                    >
                      <Icon name="X" class="h-4 w-4" />
                    </button>
                  </div>
                </slot>

                <div class="min-h-0 overflow-y-auto p-5 md:p-6">
                  <div :class="textToneClasses">
                    <slot />
                  </div>
                </div>

                <div v-if="props.showFooter" :class="footerClasses">
                  <slot name="footer">
                    <button
                      v-if="props.showCancel"
                      type="button"
                      :class="cancelButtonClasses"
                      @click="onCancel"
                    >
                      {{ props.cancelLabel }}
                    </button>
                    <button
                      v-if="props.showConfirm"
                      type="button"
                      :class="confirmClasses"
                      @click="onConfirm"
                    >
                      {{ props.confirmLabel }}
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.app-modal-light :deep(input),
.app-modal-light :deep(select),
.app-modal-light :deep(textarea) {
  color: #111827 !important;
  -webkit-text-fill-color: #111827;
}

.app-modal-dark :deep(input),
.app-modal-dark :deep(select),
.app-modal-dark :deep(textarea) {
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff;
}

.app-modal-light :deep(option) {
  color: #111827 !important;
  background-color: #ffffff !important;
}

.app-modal-dark :deep(option) {
  color: #ffffff !important;
  background-color: #0d0d14 !important;
}

.app-modal-light :deep(input::placeholder),
.app-modal-light :deep(textarea::placeholder) {
  color: #64748b !important;
  opacity: 1;
}

.app-modal-dark :deep(input::placeholder),
.app-modal-dark :deep(textarea::placeholder) {
  color: #cbd5e1 !important;
  opacity: 1;
}
</style>
