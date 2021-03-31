<template>
  <!-- Modal -->
  <div class="modal" style="display: block">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">
            Success!
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          You have successfully registered your account.
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            @click="closeModal"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showModal"],

  methods: {
    closeModal() {
      this.$store.state.openModal = false;
    },
  },
};
</script>
