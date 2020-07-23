<template>
  <span class="button">
    <button type="button" :class="style" @click="$emit('click')">
      <span v-if="$slots.leading" class="button-leading-icon">
        <slot name="leading" />
      </span>
      <slot />
      <span v-if="$slots.tailing" class="button-tailing-icon">
        <slot name="tailing" />
      </span>
    </button>
  </span>
</template>

<script>
  export default {
    name: 'Btn',
    props: {
      size: {
        type: Number,
        required: false,
        default: 3,
        validator: value => value >= 1 && value <= 5
      },
      colour: {
        type: String,
        required: false,
        default: 'indigo'
      },
      type: {
        type: String,
        required: false,
        default: 'primary',
        validator: value =>
          ['primary', 'secondary', 'white'].some(v => v === value)
      }
    },
    emits: ['click'],
    data() {
      return {
        padding: {
          x: ['2.5', '3', '4', '4', '6'],
          y: ['1.5', '2', '2', '2', '3']
        },
        text: {
          size: ['xs', 'sm', 'sm', 'base', 'base'],
          leading: ['4', '4', '5', '6', '6'],
          colour: {
            hover: {
              primary: 'white',
              secondary: this.colour,
              white: 'gray'
            },
            standard: {
              primary: 'white',
              secondary: this.colour,
              white: 'gray'
            },
            active: {
              primary: 'white',
              secondary: this.colour,
              white: 'gray'
            }
          },
          weight: {
            hover: {
              primary: '400',
              secondary: '700',
              white: '500'
            },
            standard: {
              primary: '400',
              secondary: '700',
              white: '700'
            },
            active: {
              primary: '400',
              secondary: '700',
              white: '800'
            }
          }
        },
        border: {
          standard: {
            primary: 'transparent',
            secondary: 'transparent',
            white: 'gray-300'
          },
          focus: {
            primary: `${this.colour}-700`,
            secondary: `${this.colour}-300`,
            white: 'blue-300'
          }
        },
        bg: {
          colour: {
            hover: {
              primary: this.colour,
              secondary: this.colour,
              white: 'white'
            },
            standard: {
              primary: this.colour,
              secondary: this.colour,
              white: 'white'
            },
            active: {
              primary: this.colour,
              secondary: this.colour,
              white: 'gray'
            }
          },
          weight: {
            hover: {
              primary: '500',
              secondary: '50',
              white: '400'
            },
            standard: {
              primary: '600',
              secondary: '100',
              white: '400'
            },
            active: {
              primary: '700',
              secondary: '200',
              white: '50'
            }
          }
        },
        rounded: ['', '-md', '-md', '-md', '-md'],
        shadow: {
          colour: {
            primary: this.colour,
            secondary: this.colour,
            white: 'blue'
          }
        }
      }
    },
    computed: {
      index() {
        return this.size - 1
      },
      style() {
        return [
          `px-${this.padding.x[this.index]}`,
          `py-${this.padding.y[this.index]}`,
          `border-${this.border.standard[this.type]}`,
          `focus:border-${this.border.focus[this.type]}`,
          `text-${this.text.colour.standard[this.type]}-${
            this.text.weight.standard[this.type]
          }`,
          `hover:text-${this.text.colour.hover[this.type]}-${
            this.text.weight.hover[this.type]
          }`,
          `active:text-${this.text.colour.active[this.type]}-${
            this.text.weight.active[this.type]
          }`,
          `text-${this.text.size[this.index]}`,
          `leading-${this.text.leading[this.index]}`,
          `rounded${this.rounded[this.index]}`,
          `bg-${this.bg.colour.standard[this.type]}-${
            this.bg.weight.standard[this.type]
          }`,
          `hover:bg-${this.bg.colour.hover[this.type]}-${
            this.bg.weight.hover[this.type]
          }`,
          `active:bg-${this.bg.colour.active[this.type]}-${
            this.bg.weight.active[this.type]
          }`,
          `focus:shadow-outline-${this.shadow.colour[this.type]}`
        ]
      }
    }
  }
</script>

<style scoped>
  .button {
    @apply inline-flex rounded-md shadow-sm;

    button {
      @apply inline-flex items-center border font-medium transition ease-in-out duration-150;

      &:focus {
        @apply outline-none;
      }
    }
  }

  .button-leading-icon svg,
  .button-tailing-icon svg {
    @apply h-5 w-5;
  }

  .button-leading-icon svg {
    @apply -ml-1 mr-2;
  }

  .button-tailing-icon svg {
    @apply ml-2 -mr-1;
  }
</style>
