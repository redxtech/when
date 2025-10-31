<template>
	<v-modal @close="$emit('close')">
		<template #header>
			{{ title }} - <span class="remove" @click="remove">remove</span>
		</template>
		<div class="show-info">
			<p class="overview" v-text="overview" />
			<div class="poster">
				<!--suppress HtmlUnknownTarget -->
				<img v-if="poster" :src="poster" :alt="title" />
				<img v-else src="../../assets/img/trakt.png" alt="trakt icon" />
			</div>
		</div>
		<div class="links">
			<a :href="homepage" target="_blank">Homepage</a>
			<a :href="`http://www.imdb.com/title/${ids.imdb}`" target="_blank">
				IMDb
			</a>
			<a :href="`https://www.themoviedb.org/tv/${ids.tmdb}`" target="_blank">
				TMDb
			</a>
			<a :href="`https://trakt.tv/shows/${ids.trakt}`" target="_blank">
				Trakt
			</a>
		</div>
		<div class="next-episode">
			<element-title size="lg">next episode:</element-title>
			<p>
				S{{ season.toString().padStart(2, '0') }}E{{
					episode.toString().padStart(2, '0')
				}}: {{ episodeTitle }}
			</p>
			<p>
				episode airs in:
				<countdown :aired="aired" :airing="airing" />
			</p>
			<element-title v-if="episodeOverview">description:</element-title>
			<div v-if="episodeOverview" class="overview" v-text="episodeOverview" />
		</div>
	</v-modal>
</template>

<script>
	import { mapActions } from 'vuex'

	import ElementTitle from '../../lib/titles/ElementTitle.vue'
	import Countdown from './countdown.vue'
	import VModal from './v-modal.vue'

	export default {
		name: 'ShowModal',
		components: { VModal, Countdown, ElementTitle },
		props: {
			slug: {
				type: String,
				required: true
			},
			title: {
				type: String,
				required: true
			},
			poster: {
				type: String,
				required: true
			},
			status: {
				type: String,
				required: true
			},
			episodeTitle: {
				type: String,
				required: true
			},
			overview: {
				type: String,
				required: true
			},
			ids: {
				type: Object,
				required: true
			},
			homepage: {
				type: String,
				required: true
			},
			airing: {
				type: String,
				required: true
			},
			season: {
				type: Number,
				required: true
			},
			episode: {
				type: Number,
				required: true
			},
			episodeOverview: {
				type: String,
				required: true
			},
			aired: {
				type: Boolean,
				required: true
			}
		},
		emits: ['close'],
		methods: {
			remove() {
				this.removeShow(this.slug)
				this.$emit('close')
			},
			...mapActions(['removeShow'])
		}
	}
</script>

<style>
	@reference "../../assets/css/tailwind.css";

	.remove {
		@apply text-red-500 cursor-pointer;

		&:hover {
			@apply text-red-700;
		}

		&:focus {
			@apply text-red-900;
		}
	}

	.show-info {
		@apply grid gap-4;

		grid-template-columns: auto auto;

		.poster {
			@apply flex-shrink-0;

			img {
				@apply h-48 object-cover rounded;
			}
		}
	}

	.links {
		@apply my-5 flex flex-row items-center content-center justify-between;

		a {
			@apply font-medium text-xl text-gray-900;

			&:hover {
				@apply underline;
			}
		}
	}

	.next-episode {
		p {
			@apply leading-none;

			&:first-child {
				@apply mt-2;
			}
		}

		.overview {
			/*@apply prose;*/
		}
	}
</style>
