<template>
  <video-player
    class="video-player vjs-custom-skin"
    ref="videoPlayer"
    :playsinline="true"
    :options="playerOptions"
  ></video-player>
</template>

<script>
export default {
  data: function() {
    return {
      playerOptions: {
        autoplay: false,
        muted: false,
        loop: false,
        preload: "auto",
        language: "zh-CN",
        aspectRatio: "16:9",
        fluid: true,
        sources: [
          {
            type: "",
            src: ""
          }
        ],
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: true
        }
      }
    };
  },
  mounted() {
    this.playerOptions.sources[0].src = this.$route.params.url;
  }
};
</script>

<style></style>
