<script setup lang="ts">
    import BrandMark from '~/components/BrandMark.vue'
</script>

<template>
    <div class="min-h-screen flex items-center justify-center px-6">
        <div
            class="max-w-xl w-full rounded-3xl border border-white/10 bg-white/[0.06] p-8 md:p-10 text-center shadow-2xl shadow-black/20"
        >
            <div class="flex justify-center">
                <BrandMark size="sm" />
            </div>
            <h1 class="mt-8 text-3xl md:text-4xl tracking-tight">Access denied</h1>
            <p class="mt-4 text-sm md:text-base text-gray-300">
                You don't have permission to access this page.
            </p>
            <div class="mt-8 grid gap-3 sm:grid-cols-2">
                <div
                    class="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm text-gray-300"
                >
                    Check your access rights.
                </div>
                <div
                    class="rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm text-gray-300"
                >
                    Contact an administrator.
                </div>
            </div>
            <div class="mt-8">
                <a
                    href="/"
                    class="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium text-white transition-colors"
                    style="
                        background: linear-gradient(
                            135deg,
                            var(--brand-primary),
                            var(--brand-accent)
                        );
                    "
                >
                    Return to dashboard
                </a>
            </div>
        </div>
    </div>
</template>
