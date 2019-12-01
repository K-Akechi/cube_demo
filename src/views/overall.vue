<template>
    <div>
      <Camera></Camera>
    </div>
</template>

<script>
  import Camera from "../components/Camera";
    export default {
        name: 'overall',
        components: {Camera},
        data(){
            return{
                content:"this is the overall representation page"
            }
        }
    }
</script>

<style scoped>

</style>
