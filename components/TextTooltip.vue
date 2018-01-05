<template lang="pug">
  span(:data-tooltip="tooltip") {{ text }}
</template>

<script>
export default {
  props: {
    text: { type: String, default: '' },
    tooltip: { type: String, default: '' }
  }
}
</script>


<style lang="scss" scoped>
span {
  padding-bottom: 4px;
  border-bottom: 1px dotted #959da5;
}

[data-tooltip] {
  position: relative;
  z-index: 2;

  &:before,
  &:after {
    visibility: hidden;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    opacity: 0;
    pointer-events: none;
  }

  &:before {
    position: absolute;
    bottom: 150%;
    left: 50%;
    margin-bottom: 5px;
    margin-left: -80px;
    padding: 7px;
    width: 160px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    background-color: #000;
    background-color: hsla(0, 0%, 20%, 0.9);
    color: #fff;
    content: attr(data-tooltip);
    text-align: center;
    font-size: 12px;
    line-height: 1.2;
  }

  &:after {
    position: absolute;
    bottom: 150%;
    left: 50%;
    margin-left: -5px;
    width: 0;
    border-top: 5px solid #000;
    border-top: 5px solid hsla(0, 0%, 20%, 0.9);
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    content: " ";
    font-size: 0;
    line-height: 0;
  }

  &:hover:before,
  &:hover:after {
    visibility: visible;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    opacity: 1;
  }

  &:hover {
    border: none;
  }
}
</style>
