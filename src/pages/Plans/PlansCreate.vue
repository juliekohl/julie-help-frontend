<template>
  <div class="plans-create">
    <Form
        class="plans-create__form"
        @submit="onSubmit"
        :validation-schema="schema"
    >
      <div class="plans-create__header">
        <h1 class="plans-create__heading">Create Plan</h1>
        <button-unit
            type="submit"
            class="plans-create__button"
            color="purple"
        >
          Add New Plan
        </button-unit>
      </div>
      <Field
          class="plans-create__input"
          name="office_id"
          :value="currentUser.coworking_id"
          type="hidden"
      />

      <label
          class="plans-create__label"
          for="name"
      >
        Name
      </label>
      <Field
          class="plans-create__input"
          type="text"
          id="name"
          name="name"
      />
      <ErrorMessage
          class="plans-create__span"
          name="name" />
      <label
          class="plans-create__label"
          for="value"
      >
        Value
      </label>
      <Field
          class="plans-create__input"
          type="number"
          id="value"
          name="value"
      />
      <ErrorMessage
          class="plans-create__span"
          name="value" />
    </Form>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import ButtonUnit from "@/components/atoms/ButtonUnit/ButtonUnit.vue";
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import axios from "axios";
import {useStore} from "vuex";

export default defineComponent({
  name: 'PlansCreate',
  components: {
    ButtonUnit,
    Field,
    Form,
    ErrorMessage
  },
  data() {
    const store = useStore();

    const currentUser: {} = computed((): void => {
      return store.state.auth.user;
    });

    const schema = yup.object({
      name: yup.string().required().label('Name'),
      value: yup.number().required().label('Value'),
    });

    return {
      currentUser,
      schema,
    };
  },
  methods: {
    onSubmit(values: any) {
      axios.post(`${process.env.VUE_APP_BACKEND_URL}/plans`, values);
      this.$router.push({ name: 'PlansShowAll' });
    },
  },
})
</script>

<style lang="scss">
.plans-create {
  @include page-create();
}
</style>
