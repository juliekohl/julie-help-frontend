<template>
  <Show
      title="Teams Info"
      update-to-name="TeamsUpdate"
      :entity="teamUser"
  />
</template>

<script lang="ts">
import Show from "@/components/templates/Show/Show.vue";
import {useRouter} from "vue-router";
import {ref} from "vue";
import axios from "axios";

export default {
  name: 'TeamsShow',
  components: {
    Show
  },
  setup() {
    const router = useRouter();
    const teamUserId: number = Number(router.currentRoute.value.params.id);
    const teamUser: any = ref({id: teamUserId, name: '', email: ''});

    axios.get(`${process.env.VUE_APP_BACKEND_URL}/teams/${teamUserId}`)
        .then(response => {
          teamUser.value.name = (response.data as any).name;
          teamUser.value.email = (response.data as any).email;
        })
        .catch(error => {
          console.log(error.response);
        });

    return {
      teamUser,
    }
  },
}
</script>
