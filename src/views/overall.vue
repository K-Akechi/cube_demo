<template>
    <div>
      <Dialog></Dialog>
    </div>
</template>

<script>
  import Dialog from "../components/Dialog";
    export default {
        name: 'overall',
        components: {Dialog},
        data(){
            return{
                content:"this is the overall representation page"
            }
        }
    }
</script>

<style scoped>

</style>
