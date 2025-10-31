<template>
	<transition name="modal-fade">
		<div ref="backdrop" class="modal-backdrop" @click="closeBackdrop">
			<div class="modal">
				<header class="modal-header">
					<element-title size="xl">
						<slot name="header">Header</slot>
					</element-title>
					<span @click="close">
						<svg
							class="h-4 w-4 inline text-gray-400 hover:text-gray-500 transition duration-150 ease-in-out"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 96 320 320"
						>
							<path
								fill="currentColor"
								d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
							></path>
						</svg>
					</span>
				</header>
				<section class="modal-body">
					<slot />
				</section>
				<footer class="modal-footer">
					<btn type="white" @click="close">close</btn>
				</footer>
			</div>
		</div>
	</transition>
</template>

<script>
	import Btn from '../../lib/elements/Btn.vue'
	import ElementTitle from '../../lib/titles/ElementTitle.vue'

	export default {
		name: 'VModal',
		components: { ElementTitle, Btn },
		emits: ['close'],
		methods: {
			close() {
				this.$emit('close')
			},
			closeBackdrop(event) {
				// noinspection JSUnresolvedVariable
				if (event.target === this.$refs.backdrop) {
					this.$emit('close')
				}
			}
		}
	}
</script>

<style>
	@reference "../../assets/css/tailwind.css";

	.modal-backdrop {
		@apply fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center transition-opacity duration-200 ease-in-out;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.modal {
		@apply w-144 bg-white m-4 p-4 rounded flex flex-col;

		.modal-header {
			@apply flex items-center content-center justify-between;
		}

		.modal-body {
			@apply my-4;
		}

		.modal-footer {
			@apply flex items-center content-center justify-end;
		}
	}

	.modal-fade-enter,
	.modal-fade-leave-active {
		opacity: 0;
	}

	.modal-fade-enter-active,
	.modal-fade-leave-active {
		opacity: 0;
	}
</style>
