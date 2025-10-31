<template>
	<box class="message">
		<div class="poster">
			<slot name="poster">
				<a v-if="href" :href="href">
					<img src="../../assets/img/trakt.png" alt="trakt icon" />
				</a>
				<img v-else src="../../assets/img/trakt.png" alt="trakt icon" />
			</slot>
		</div>
		<div class="details" :class="clickableStyle">
			<template v-if="href">
				<a v-if="href" :href="href">
					<element-title size="2xl">{{ title }}</element-title>
				</a>
				<a v-if="href" :href="href">
					<span class="message">{{ message }}</span>
				</a>
			</template>
			<template v-else>
				<element-title size="2xl">{{ title }}</element-title>
				<span class="message">{{ message }}</span>
			</template>
		</div>
	</box>
</template>

<script>
	import Box from '../../lib/elements/Box.vue'
	import ElementTitle from '../../lib/titles/ElementTitle.vue'

	export default {
		name: 'Show',
		components: { ElementTitle, Box },
		props: {
			title: {
				type: String,
				required: true
			},
			message: {
				type: String,
				required: true
			},
			href: {
				type: String,
				required: false,
				default: ''
			},
			clickable: {
				type: Boolean,
				required: false,
				default: false
			}
		},
		data() {
			return {
				clickableStyle: {
					clickable: this.clickable
				}
			}
		}
	}
</script>

<style scoped>
	@reference "../../assets/css/tailwind.css";

	.message {
		@apply flex flex-row flex-nowrap items-center content-center justify-start cursor-pointer;

		.poster {
			@apply w-20 flex-none flex flex-col items-center content-center justify-around;

			min-height: 120px;

			img {
				@apply object-cover rounded;
			}
		}

		.details {
			@apply h-full ml-4 flex-1 flex flex-col items-start justify-between;

			.message {
				@apply text-lg;
			}

			a:hover {
				@apply underline;
			}
		}
	}

	.clickable {
		h3,
		span {
			&:hover {
				@apply underline;
			}
		}
	}
</style>
