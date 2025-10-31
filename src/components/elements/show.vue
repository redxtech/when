<template>
	<box class="show" :data-slug="slug" @click="openModal">
		<div class="poster">
			<!--suppress HtmlUnknownTarget -->
			<img v-if="poster" :src="poster" :alt="title" />
			<img v-else src="../../assets/img/trakt.png" alt="trakt icon" />
		</div>
		<div class="details">
			<element-title size="2xl">{{ title }}</element-title>
			<span class="countdown">
				<countdown
					v-if="airing"
					:airing="airing"
					:aired="aired"
					@aired="onAired"
				/>
				<template v-else-if="status === 'returning series'">
					next episode to be announced.
				</template>
				<template v-else>{{ status }}.</template>
			</span>
		</div>
	</box>
</template>

<script>
	import { mapActions } from 'vuex'

	import Box from '../../lib/elements/Box.vue'
	import ElementTitle from '../../lib/titles/ElementTitle.vue'
	import Countdown from './countdown.vue'

	export default {
		name: 'Show',
		components: { Countdown, ElementTitle, Box },
		props: {
			slug: {
				type: String,
				required: true
			}
		},
		emits: ['open-modal'],
		data() {
			return {
				title: 'loading...',
				poster: '',
				status: 'loading..',
				episodeTitle: 'tba',
				overview: '',
				ids: {},
				airing: '',
				season: 0,
				episode: 0,
				episodeOverview: '',
				aired: false,
				currentDate: new Date()
			}
		},
		computed: {
			order() {
				const difference = +new Date(this.airing) - +this.currentDate

				if (this.airing && difference > 0) {
					return difference
				} else {
					return (
						{
							'returning series': -1,
							'in production': -2,
							planned: -3,
							'not found': -4,
							canceled: -5,
							ended: -6
						}[this.status] || -2
					)
				}
			}
		},
		watch: {
			order(curr) {
				this.setOrder({ slug: this.slug, order: curr })
			}
		},
		async mounted() {
			try {
				const { title, status, overview, ids, homepage } =
					await this.trakt.getShow(this.slug, true)
				const poster = await this.tmdb.getPosterPath(ids.tmdb)

				// assign the show information to the state
				this.title = title
				this.poster = poster
				this.status = status
				this.overview = overview
				this.ids = ids
				this.homepage = homepage

				try {
					// fetch the next episode
					await this.getNextEpisode()
				} catch {}
			} catch (err) {
				console.error(err)

				// account for the error
				this.title = 'not found.'
				this.status = 'not found'
			}
		},
		methods: {
			onAired() {
				this.aired = true
				this.getNextEpisode()
			},
			async getNextEpisode() {
				try {
					// attempt to get the next episode
					const {
						title: episodeTitle,
						first_aired,
						season,
						number,
						overview
					} = await this.trakt.getNextEpisode(this.slug)

					// if a new episode has aired switch the aired property
					if (this.airing !== first_aired) {
						this.aired = false
					}

					// assign the show information to the state after checking if it's valid
					if (episodeTitle) this.episodeTitle = episodeTitle
					if (overview) this.episodeOverview = overview
					this.airing = first_aired
					this.season = season
					this.episode = number

					if (!this.aired) {
						// refresh the date to update order
						this.refreshDate()
					}
				} catch {}
			},
			refreshDate() {
				this.currentDate = new Date()
			},
			openModal() {
				this.$emit('open-modal', {
					slug: this.slug,
					title: this.title,
					poster: this.poster,
					status: this.status,
					episodeTitle: this.episodeTitle,
					overview: this.overview,
					ids: this.ids,
					homepage: this.homepage,
					airing: this.airing,
					season: this.season,
					episode: this.episode,
					episodeOverview: this.episodeOverview,
					aired: this.aired
				})
			},
			...mapActions(['setOrder'])
		}
	}
</script>

<style scoped>
	@reference "../../assets/css/tailwind.css";

	.show {
		@apply flex flex-row flex-nowrap items-center content-center justify-start cursor-pointer;

		.poster {
			@apply w-20 flex-none;

			img {
				@apply object-cover rounded;
			}
		}

		.details {
			@apply h-full ml-4 flex-1 flex flex-col items-start justify-between;

			.countdown {
				@apply text-lg;
			}
		}
	}
</style>
