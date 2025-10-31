<template>
	<article class="card">
		<div :class="style">
			<a v-if="image && href" :href="href" target="_blank">
				<!--suppress HtmlUnknownTarget -->
				<img
					:class="{ 'cursor-pointer': imageCursorPointer }"
					:src="image"
					:alt="alt"
					@click="$emit('img-click')"
				/>
			</a>
			<!--suppress HtmlUnknownTarget -->
			<img
				v-else-if="image"
				:class="{ 'cursor-pointer': imageCursorPointer }"
				:src="image"
				:alt="alt"
				@click="$emit('img-click')"
			/>
			<div
				:class="{
					'px-6': !noShadow,
					'mt-4': image,
					'flex-1': even
				}"
			>
				<slot name="title" />
				<div class="content">
					<slot />
				</div>
			</div>
			<div v-if="$slots.footer" class="my-4" :class="{ 'px-6': !noShadow }">
				<slot name="footer" />
			</div>
		</div>
	</article>
</template>

<script>
	export default {
		name: 'Card',
		props: {
			image: {
				type: String,
				required: false,
				default: ''
			},
			alt: {
				type: String,
				required: false,
				default: ''
			},
			href: {
				type: String,
				required: false,
				default: ''
			},
			size: {
				type: String,
				required: false,
				default: 'xs',
				validator: val =>
					[
						'xs',
						'sm',
						'md',
						'lg',
						'xl',
						'2xl',
						'3xl',
						'4xl',
						'5xl',
						'6xl'
					].some(v => v === val)
			},
			noShadow: {
				type: Boolean,
				required: false,
				default: false
			},
			even: {
				type: Boolean,
				required: false,
				default: false
			},
			imageCursorPointer: {
				type: Boolean,
				required: false,
				default: false
			}
		},
		emits: ['img-click'],
		computed: {
			style() {
				const styles = {
					'shadow-md': !this.noShadow,
					'hover:shadow-xl': !this.noShadow,
					flex: this.even,
					'flex-col': this.even,
					'h-full': this.even
				}

				styles[`max-w-${this.size}`] = true

				return styles
			}
		}
	}
</script>

<style scoped>
	@reference "../../assets/css/tailwind.css";

	.card {
		@apply mx-auto;

		& > div {
			@apply rounded overflow-hidden transition duration-150 ease-in-out;

			img {
				@apply w-full;
			}

			.content {
				@apply mt-1 prose;
			}
		}
	}
</style>
