<template>
  <div class="coworkers-create">
    <Form
        class="coworkers-create__form"
        @submit="onSubmit"
        :validation-schema="schema"
    >
      <div class="coworkers-create__header">
        <h1 class="coworkers-create__heading">Create Coworker</h1>
        <button-unit
            type="submit"
            class="coworkers-create__button"
            color="purple"
        >
          Add New Coworker
        </button-unit>
      </div>

      <Field
          class="coworkers-create__input"
          name="coworking_id"
          :value="currentUser.coworking_id"
          type="hidden"
      />

      <label
          class="coworkers-create__label"
          for="name"
      >
        Name
      </label>
      <Field
          class="coworkers-create__input"
          type="text"
          id="name"
          name="name"
      />
      <ErrorMessage
          class="coworkers-create__span"
          name="name"
      />

      <label
          class="coworkers-create__label"
          for="email"
      >
        Email
      </label>
      <Field
          class="coworkers-create__input"
          type="email"
          id="email"
          name="email"
      />
      <ErrorMessage
          class="coworkers-create__span"
          name="email"
      />

      <label
          class="coworkers-create__label"
          for="password"
      >
        Password
      </label>
      <Field
          class="coworkers-create__input"
          type="password"
          id="password"
          name="password"
      />
      <ErrorMessage
          class="coworkers-create__span"
          name="password"
      />
    </Form>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import axios from "axios";
import ButtonUnit from "@/components/atoms/ButtonUnit/ButtonUnit.vue";
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import {useStore} from "vuex";

export default defineComponent({
  name: 'CoworkersCreate',
  components: {ButtonUnit, Field, Form, ErrorMessage},
  data() {
    const store = useStore();

    const currentUser: {} = computed((): void => {
      return store.state.auth.user;
    });

    const schema = yup.object({
      name: yup.string().required().label('Name'),
      email: yup.string().required().email().label('Email'),
      password: yup.string().required().min(8).label('Password'),
    });

    return {
      currentUser,
      schema,
    };
  },
  methods: {
    onSubmit(values: any) {
      axios.post(`${process.env.VUE_APP_BACKEND_URL}/coworkers`, values);
      this.$router.push({ name: 'CoworkersShowAll' });
    },
  },
})
</script>

<style lang="scss">
.coworkers-create {
  @include page-create();
}
</style>
