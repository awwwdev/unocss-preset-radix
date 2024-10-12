<script setup>
import { ref } from 'vue'
import { RADIX_HUES } from "../../src/consts";
</script>

# Colors

<div class="bg-gray1">
  <div v-for="scale in RADIX_HUES" >
	<div :class="`text-${scale}9 `">
		<h2 class="block mt-10 ">{{ scale }}</h2>
    <div class="flex gap-0.5">
			<span class="swatch p-4 min-w-15 "></span>
		<div class="grid grid-cols-12 gap-0.5 w-full">
			<div v-for="i in 12">
				<div class="swatch text-center text-sage11">{{ i }}</div>
			</div>
		</div>
    </div>
		<div class="flex flex-col gap-0.5">
      <div v-for="theme in ['dark', 'light']">
        <div class="flex flex-col gap-0.5">
          <div class="flex flex-row gap-0.5">
            <span class="swatch p-4 text-sage11 min-w-15">{{ theme }}</span>
            <div class="grid  gap-0.5 w-full" :class="`${theme}`" style="grid-template-columns: repeat(12, 1fr);">
              <div v-for="i in 12">
                <div
                  class="swatch"
                  :class="`bg-${scale}${i} ${ i < 9 ? `text-${scale}12` : i < 11 ? `text-${scale}-fg` : `text-${scale}1` }`"
                >
                  <!-- fg -->
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-row gap-0.5">
            <span class="swatch p-4 text-sage11 min-w-15">alpha</span>
            <div class="grid  gap-0.5 w-full" :class="`${theme}`" style="grid-template-columns: repeat(12, 1fr);">
              <div v-for="i in 12">
                <div class="swatch" :class="`bg-${scale}${i}A`"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>
</div>
</div>

<style>
	.swatch {
		height: 2rem;
		padding: 5px;
	}
</style>
