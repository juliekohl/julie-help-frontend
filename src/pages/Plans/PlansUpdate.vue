<template>
  <div class="plans-update">
    <Form
        class="plans-update__form"
        @submit="onSubmit"
        :validation-schema="schema"
        :initial-values="plan"
    >
      <div class="plans-update__header">
        <h1 class="plans-update__heading">{{plan.name}}</h1>
        <div class="plans-update__button">
          <button-unit
              class="plans-update__button-delete"
              color="red"
              @click="handleDelete"
          >
            Delete
          </button-unit>
          <button-unit
              class="plans-update__button-edit"
              color="purple"
              type="submit"
          >
            Edit
          </button-unit>
        </div>
      </div>
      <label
          class="plans-update__label"
          for="name"
      >
        Name
      </label>
      <Field
          class="plans-update__input"
          type="text"
          id="name"
          name="name"
      />
      <ErrorMessage
          class="plans-update__span"
          name="name"
      />
      <label
          class="plans-update__label"
          for="value"
      >
        Value
      </label>
      <Field
          class="plans-update__input"
          type="text"
          id="value"
          name="value"
      />
      <ErrorMessage
          class="plans-update__span"
          name="value"
      />
    </Form>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import ButtonUnit from "@/components/atoms/ButtonUnit/ButtonUnit.vue";
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default  defineComponent({
  name: 'PlansUpdate',
  components: {
    ButtonUnit,
    Field,
    Form,
    ErrorMessage
  },
  setup() {
    const router = useRouter();
    const id: number = Number(router.currentRoute.value.params.id);
    const plan: any = ref({id: null, name: '', value: 0});

    axios.get(`${process.env.VUE_APP_BACKEND_URL}/plans/${id}`)
        .then(response => {
          plan.value = response.data;
        });

    return {
      id,
      plan,
    }
  },
  data() {
    const schema = yup.object({
      name: yup.string().required().label('Name'),
      value: yup.string().required().label('Value'),
    });
    return {
      schema,
    };
  },
  methods: {
    onSubmit(values: any): void {
      axios.post(`${process.env.VUE_APP_BACKEND_URL}/plans/${this.id}`, values);
      this.$router.push({ name: 'PlansShowAll' });
    },
    handleDelete(): void {
      if (confirm("Do you want to delete?")) {
        axios.delete(`${process.env.VUE_APP_BACKEND_URL}/plans/${this.id}`);
        this.$router.push({ name: 'PlansShowAll' });
      }
    },
  },
})
</script>

<style lang="scss">
.plans-update {
  @include page-update();
}
</style>
