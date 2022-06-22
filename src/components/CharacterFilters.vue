<script setup>
const emit = defineEmits(["reset", "change"]);
const reset = () => emit("reset");
const change = (key, value) => emit("change", { [key]: value, page: "" });

const props = defineProps({
  clearable: {
    type: Boolean,
    default: false,
  },
});

const fields = [
  {
    key: "gender",
    placeholder: "Gender",
    options: [
      { value: "female", label: "Female" },
      { value: "male", label: "Male" },
      { value: "genderless", label: "Genderless" },
      { value: "unknown", label: "Unknown" },
    ],
  },
  {
    key: "status",
    placeholder: "Status",
    options: [
      { value: "alive", label: "Alive" },
      { value: "dead", label: "Dead" },
      { value: "unknown", label: "Unknown" },
    ],
  },
  {
    key: "species",
    placeholder: "Species",
    options: [
      { value: "human", label: "Human" },
      { value: "humanoid", label: "Humanoid" },
      { value: "alien", label: "Alien" },
      { value: "animal", label: "Animal" },
      { value: "robot", label: "Robot" },
      { value: "mythological", label: "Mythological" },
      { value: "disease", label: "Disease" },
      { value: "cronenberg", label: "Cronenberg" },
      { value: "poopybutthole", label: "Poopybutthole" },
      { value: "unknown", label: "Unknown" },
    ],
  },
];
</script>

<template>
  <div class="flex gap-4">
    <div class="flex gap-4">
      <a-select
        v-for="field in fields"
        :key="field.key"
        :value="$route.query[field.key]"
        :placeholder="field.placeholder"
        :options="field.options"
        allow-clear
        class="w-32"
        @change="change(field.key, $event)"
      />
    </div>
    <a-button v-if="props.clearable" type="dashed" @click="reset">
      Clear
    </a-button>
  </div>
</template>
